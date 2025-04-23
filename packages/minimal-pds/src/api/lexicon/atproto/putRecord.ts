import { AppContext } from '#/context'
import { CID } from 'multiformats/cid'
import * as Block from 'multiformats/block'
import { sha256 } from 'multiformats/hashes/sha2'
import { Server } from '#/lexicon'
import { AtUri } from '@atproto/uri'
import { WriteOpAction, cborToLex } from '@atproto/repo'
import { TID } from '@atproto/common'
import { InvalidRequestError } from '@atproto/xrpc-server'
import {
  RepoRecord,
  lexToIpld,
} from '@atproto/lexicon'



type ValidationStatus = 'valid' | 'unknown'

export class InvalidRecordError extends Error {}

export class BadCommitSwapError extends Error {
  constructor(public cid: CID) {
    super(`Commit was at ${cid.toString()}`)
  }
}

export class BadRecordSwapError extends Error {
  constructor(public cid: CID | null) {
    super(`Record was at ${cid?.toString() ?? 'null'}`)
  }
}

export type PreparedCreate = {
  action: WriteOpAction.Create
  uri: AtUri
  cid: CID
  swapCid?: CID | null
  record: RepoRecord
  blobs: []
  validationStatus: ValidationStatus
}

export type PreparedUpdate = {
  action: WriteOpAction.Update
  uri: AtUri
  cid: CID
  swapCid?: CID | null
  record: RepoRecord
  blobs: []
  validationStatus: ValidationStatus
}

export const dataToCborBlock = async (data: unknown) => {
  const cborCodec = await import('@ipld/dag-cbor')
  return Block.encode({
    value: data,
    codec: cborCodec,
    hasher: sha256,
  })
}

async function cidForSafeRecord(record: RepoRecord) {
  try {
    const block = await dataToCborBlock(lexToIpld(record))
    cborToLex(block.bytes)
    return block.cid
  } catch (err) {
    // Block does not properly transform between lex and cbor
    throw new InvalidRecordError('Bad record')
  }
}

export const setCollectionName = (
  collection: string,
  record: RepoRecord,
  validate: boolean,
) => {
  if (!record.$type) {
    record.$type = collection
  }
  if (validate && record.$type !== collection) {
    throw new InvalidRecordError(
      `Invalid $type: expected ${collection}, got ${record.$type}`,
    )
  }
  return record
}

export const prepareCreate = async (opts: {
  did: string
  collection: string
  rkey?: string
  swapCid?: CID | null
  record: RepoRecord
  validate?: boolean
}): Promise<PreparedCreate> => {
  const { did, collection, swapCid, validate } = opts
  const maybeValidate = validate !== false
  const record = setCollectionName(collection, opts.record, maybeValidate)
  // let validationStatus: ValidationStatus
  // if (maybeValidate) {
  //   validationStatus = assertValidRecordWithStatus(record, {
  //     requireLexicon: validate === true,
  //   })
  // }
  const nextRkey = TID.next()
  const rkey = opts.rkey || nextRkey.toString()
  // @TODO: validate against Lexicon record 'key' type, not just overall recordkey syntax
  // ensureValidRecordKey(rkey)
  // assertNoExplicitSlurs(rkey, record)
  return {
    action: WriteOpAction.Create,
    uri: AtUri.make(did, collection, rkey),
    cid: await cidForSafeRecord(record),
    swapCid,
    record,
    blobs: [],
    validationStatus: 'valid',
  }
}

export const prepareUpdate = async (opts: {
  did: string
  collection: string
  rkey: string
  swapCid?: CID | null
  record: RepoRecord
  validate?: boolean
}): Promise<PreparedUpdate> => {
  const { did, collection, rkey, swapCid, validate } = opts
  const maybeValidate = validate !== false
  const record = setCollectionName(collection, opts.record, maybeValidate)
  let validationStatus: ValidationStatus
  // if (maybeValidate) {
  //   validationStatus = assertValidRecordWithStatus(record, {
  //     requireLexicon: validate === true,
  //   })
  // }
  // assertNoExplicitSlurs(rkey, record)
  return {
    action: WriteOpAction.Update,
    uri: AtUri.make(did, collection, rkey),
    cid: await cidForSafeRecord(record),
    swapCid,
    record,
    blobs: [],
    validationStatus: 'valid',
  }
}

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.repo.putRecord({
    handler: async ({ input, req, res }) => {
      const {
        repo,
        collection,
        rkey,
        record,
        validate,
        swapCommit,
        swapRecord,
      } = input.body

      const did = 'did:plc:ufa7rl6agtfdqje6bant3wsb'

      const uri = AtUri.make(did, collection, rkey)
      const swapCommitCid = swapCommit ? CID.parse(swapCommit) : undefined
      const swapRecordCid =
        typeof swapRecord === 'string' ? CID.parse(swapRecord) : swapRecord

      const { commit, write } = await ctx.actorStore.transact(
        did,
        async (actorTxn) => {
          const current = await actorTxn.record.getRecord(uri, null, true)
          const isUpdate = current !== null

          const writeInfo = {
            did,
            collection,
            rkey,
            record,
            swapCid: swapRecordCid,
            validate,
          }

          let write: PreparedCreate | PreparedUpdate
          try {
            write = isUpdate
              ? await prepareUpdate(writeInfo)
              : await prepareCreate(writeInfo)
          } catch (err) {
            if (err instanceof InvalidRecordError) {
              throw new InvalidRequestError(err.message)
            }
            throw err
          }

          // no-op
          if (current && current.cid === write.cid.toString()) {
            return {
              commit: null,
              write,
            }
          }

          const commit = await actorTxn.repo
            .processWrites([write], swapCommitCid)
            .catch((err: BadCommitSwapError | BadRecordSwapError) => {
              if (
                err instanceof BadCommitSwapError ||
                err instanceof BadRecordSwapError
              ) {
                throw new InvalidRequestError(err.message, 'InvalidSwap')
              } else {
                throw err
              }
            })

          await ctx.sequencer.sequenceCommit(did, commit)

          return { commit, write }
        },
      )

      if (commit !== null) {
        await ctx.accountManager
          .updateRepoRoot(did, commit.cid, commit.rev)
          .catch((err: any) => {
            ctx.logger.error(
              { err, did, cid: commit.cid, rev: commit.rev },
              'failed to update account root',
            )
          })
      }

      return {
        encoding: 'application/json',
        body: {
          uri: write.uri.toString(),
          cid: write.cid.toString(),
          commit: commit
            ? {
                cid: commit.cid.toString(),
                rev: commit.rev,
              }
            : undefined,
          validationStatus: write.validationStatus,
        },
      }
    },
  })
}
