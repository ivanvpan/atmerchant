import { CID } from 'multiformats/cid'
import { AtUri } from '@atproto/uri'
import { CommitData, WriteOpAction } from '@atproto/repo'
import { RepoRecord } from '@atproto/lexicon'

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
