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
import type * as XyzNoshdeliveryV0CatalogDefs from './defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.v0.catalog.putCatalog'

export interface QueryParams {}

export interface InputSchema {
  externalId?: string
  name: string
  merchantLocation: string
  availabilityPeriods: XyzNoshdeliveryV0CatalogDefs.AvailabilityPeriod[]
  /** Pkeys of xyz.noshdelivery.v0.catalog.collection records that belong in this catalog. Ordered in the way they will be presented. */
  childCollections?: string[]
}

export interface OutputSchema {
  catalog: XyzNoshdeliveryV0CatalogDefs.CatalogView
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
