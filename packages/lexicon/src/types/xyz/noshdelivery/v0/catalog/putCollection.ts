/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc'
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../../../lexicons'
import {
  type $Typed,
  is$typed as _is$typed,
  type OmitKey,
} from '../../../../../util'
import type * as XyzNoshdeliveryV0MediaDefs from '../media/defs.js'
import type * as XyzNoshdeliveryV0CatalogDefs from './defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.v0.catalog.putCollection'

export interface QueryParams {}

export interface InputSchema {
  /** An external ID that can be used to identify this object in an external system such as a warehousing system */
  externalId?: string
  name: string
  childCollections?: string[]
  media?: XyzNoshdeliveryV0MediaDefs.MediaView
  /** Pkeys of xyz.noshdelivery.v0.catalog.item records that are in this collection. Ordered in the way they will be presented. */
  items?: string[]
}

export interface OutputSchema {
  collection: XyzNoshdeliveryV0CatalogDefs.CollectionView
}

export interface CallOptions {
  signal?: AbortSignal
  headers?: HeadersMap
  qp?: QueryParams
  encoding?: 'application/json'
}

export interface Response {
  success: boolean
  headers: HeadersMap
  data: OutputSchema
}

export function toKnownErr(e: any) {
  return e
}
