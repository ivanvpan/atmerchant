import { AppContext } from '#/context'
import { CID } from 'multiformats/cid'
import * as Block from 'multiformats/block'
import { sha256 } from 'multiformats/hashes/sha2'
import { Server } from '#/lexicon'
import { AtUri } from '@atproto/uri'
import {
  BlockMap,
  Commit,
  CommitData,
  RecordWriteOp,
  WriteOpAction,
  cborToLex,
  formatDataKey,
  signCommit,
  Repo,
} from '@atproto/repo'
import { TID, util } from '@atproto/common'
import { InvalidRequestError } from '@atproto/xrpc-server'
import { RepoRecord, lexToIpld } from '@atproto/lexicon'

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

export type PreparedDelete = {
  action: WriteOpAction.Delete
  uri: AtUri
  swapCid?: CID | null
}

export type PreparedWrite = PreparedCreate | PreparedUpdate | PreparedDelete

export interface Signer {
  jwtAlg: string
  sign(msg: Uint8Array): Promise<Uint8Array>
}

export interface Didable {
  did(): string
}

export interface Keypair extends Signer, Didable {}

export type CommitOp = {
  action: 'create' | 'update' | 'delete'
  path: string
  cid: CID | null
  prev?: CID
}

export type CommitDataWithOps = CommitData & {
  ops: CommitOp[]
  prevData: CID | null
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

export const setCollectionName = (collection: string, record: RepoRecord, validate: boolean) => {
  if (!record.$type) {
    record.$type = collection
  }
  if (validate && record.$type !== collection) {
    throw new InvalidRecordError(`Invalid $type: expected ${collection}, got ${record.$type}`)
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

// async function formatCommit(toWrite: RecordWriteOp | RecordWriteOp[], keypair: crypto.Keypair): Promise<CommitData> {
//   const writes = Array.isArray(toWrite) ? toWrite : [toWrite]
//   const leaves = new BlockMap()

//   let data = this.data
//   for (const write of writes) {
//     if (write.action === WriteOpAction.Create) {
//       const cid = await leaves.add(write.record)
//       const dataKey = write.collection + '/' + write.rkey
//       data = await data.add(dataKey, cid)
//     } else if (write.action === WriteOpAction.Update) {
//       const cid = await leaves.add(write.record)
//       const dataKey = write.collection + '/' + write.rkey
//       data = await data.update(dataKey, cid)
//     } else if (write.action === WriteOpAction.Delete) {
//       const dataKey = write.collection + '/' + write.rkey
//       data = await data.delete(dataKey)
//     }
//   }

//   const dataCid = await data.getPointer()
//   const diff = await DataDiff.of(data, this.data)
//   const newBlocks = diff.newMstBlocks
//   const removedCids = diff.removedCids

//   const proofs = await Promise.all(writes.map((op) => data.getCoveringProof(formatDataKey(op.collection, op.rkey))))
//   const relevantBlocks = proofs.reduce((acc, cur) => {
//     return acc.addMap(cur)
//   }, new BlockMap())

//   const addedLeaves = leaves.getMany(diff.newLeafCids.toList())
//   if (addedLeaves.missing.length > 0) {
//     throw new Error(`Missing leaf blocks: ${addedLeaves.missing}`)
//   }
//   newBlocks.addMap(addedLeaves.blocks)
//   relevantBlocks.addMap(addedLeaves.blocks)

//   const rev = TID.nextStr(this.commit.rev)
//   const commit = await signCommit(
//     {
//       did: this.did,
//       version: 3,
//       rev,
//       prev: null, // added for backwards compatibility with v2
//       data: dataCid,
//     },
//     keypair,
//   )
//   const commitBlock = await dataToCborBlock(lexToIpld(commit))
//   if (!commitBlock.cid.equals(this.cid)) {
//     newBlocks.set(commitBlock.cid, commitBlock.bytes)
//     relevantBlocks.set(commitBlock.cid, commitBlock.bytes)
//     removedCids.add(this.cid)
//   }

//   return {
//     cid: commitBlock.cid,
//     rev,
//     since: this.commit.rev,
//     prev: this.cid,
//     newBlocks,
//     relevantBlocks,
//     removedCids,
//   }
// }

async function processWrites(writes: PreparedWrite[], swapCommitCid?: CID, ctx: AppContext): Promise<CommitDataWithOps> {
  ctx.db.assertTransaction()
  if (writes.length > 200) {
    throw new InvalidRequestError('Too many writes. Max: 200')
  }

  const commit = await formatCommit(writes, swapCommitCid)
  // Do not allow commits > 2MB
  if (commit.relevantBlocks.byteSize > 2000000) {
    throw new InvalidRequestError('Too many writes. Max event size: 2MB')
  }

  await Promise.all([
    // persist the commit to repo storage
    ctx.storage.applyCommit(commit),
    // & send to indexing
    ctx.indexWrites(writes, commit.rev),
    // process blobs
    // ctx.blob.processWriteBlobs(commit.rev, writes),
  ])
  return commit
}

  async function formatCommit(
    writes: PreparedWrite[],
    swapCommit?: CID,
  ): Promise<CommitDataWithOps> {
    // this is not in a txn, so this won't actually hold the lock,
    // we just check if it is currently held by another txn
    const currRoot = await this.storage.getRootDetailed()
    if (!currRoot) {
      throw new InvalidRequestError(`No repo root found for ${this.did}`)
    }
    if (swapCommit && !currRoot.cid.equals(swapCommit)) {
      throw new BadCommitSwapError(currRoot.cid)
    }
    // cache last commit since there's likely overlap
    await this.storage.cacheRev(currRoot.rev)
    const newRecordCids: CID[] = []
    const delAndUpdateUris: AtUri[] = []
    const commitOps: CommitOp[] = []
    for (const write of writes) {
      const { action, uri, swapCid } = write
      if (action !== WriteOpAction.Delete) {
        newRecordCids.push(write.cid)
      }
      if (action !== WriteOpAction.Create) {
        delAndUpdateUris.push(uri)
      }
      const record = await this.record.getRecord(uri, null, true)
      const currRecord = record ? CID.parse(record.cid) : null

      const op: CommitOp = {
        action,
        path: formatDataKey(uri.collection, uri.rkey),
        cid: write.action === WriteOpAction.Delete ? null : write.cid,
      }
      if (currRecord) {
        op.prev = currRecord
      }
      commitOps.push(op)
      if (swapCid !== undefined) {
        if (action === WriteOpAction.Create && swapCid !== null) {
          throw new BadRecordSwapError(currRecord) // There should be no current record for a create
        }
        if (action === WriteOpAction.Update && swapCid === null) {
          throw new BadRecordSwapError(currRecord) // There should be a current record for an update
        }
        if (action === WriteOpAction.Delete && swapCid === null) {
          throw new BadRecordSwapError(currRecord) // There should be a current record for a delete
        }
        if ((currRecord || swapCid) && !currRecord?.equals(swapCid)) {
          throw new BadRecordSwapError(currRecord)
        }
      }
    }

    const repo = await Repo.load(this.storage, currRoot.cid)
    const prevData = repo.commit.data
    const writeOps = writes.map(writeToOp)
    const commit = await repo.formatCommit(writeOps, this.signingKey)

    // find blocks that would be deleted but are referenced by another record
    const dupeRecordCids = await this.getDuplicateRecordCids(
      commit.removedCids.toList(),
      delAndUpdateUris,
    )
    for (const cid of dupeRecordCids) {
      commit.removedCids.delete(cid)
    }

    // find blocks that are relevant to ops but not included in diff
    // (for instance a record that was moved but cid stayed the same)
    const newRecordBlocks = commit.relevantBlocks.getMany(newRecordCids)
    if (newRecordBlocks.missing.length > 0) {
      const missingBlocks = await this.storage.getBlocks(
        newRecordBlocks.missing,
      )
      commit.relevantBlocks.addMap(missingBlocks.blocks)
    }
    return {
      ...commit,
      ops: commitOps,
      prevData,
    }
  }

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.repo.putRecord({
    handler: async ({ input, req, res }) => {
      const { repo, collection, rkey, record, validate, swapCommit, swapRecord } = input.body

      const did = 'did:plc:ufa7rl6agtfdqje6bant3wsb'

      const uri = AtUri.make(did, collection, rkey)
      const swapCommitCid = swapCommit ? CID.parse(swapCommit) : undefined
      const swapRecordCid = typeof swapRecord === 'string' ? CID.parse(swapRecord) : swapRecord

      const { commit, write } = await ctx.actorStore.transact(did, async (actorTxn) => {
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
          write = isUpdate ? await prepareUpdate(writeInfo) : await prepareCreate(writeInfo)
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
            if (err instanceof BadCommitSwapError || err instanceof BadRecordSwapError) {
              throw new InvalidRequestError(err.message, 'InvalidSwap')
            } else {
              throw err
            }
          })

        // await ctx.sequencer.sequenceCommit(did, commit)

        return { commit, write }
      })

      if (commit !== null) {
        await ctx.accountManager.updateRepoRoot(did, commit.cid, commit.rev).catch((err: any) => {
          ctx.logger.error({ err, did, cid: commit.cid, rev: commit.rev }, 'failed to update account root')
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
