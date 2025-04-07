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
const id = 'xyz.noshdelivery.v0.catalog.getFullCatalog'

export interface QueryParams {
  /** The URI of the item to get. */
  uri?: string
}

export type InputSchema = undefined

export interface OutputSchema {
  merchant: string
  itemDetails?: XyzNoshdeliveryV0CatalogDefs.ItemView
  modifierGroups?: XyzNoshdeliveryV0CatalogDefs.ModifierGroupView[]
  modifiers?: XyzNoshdeliveryV0CatalogDefs.ModifierView[]
}

export interface CallOptions {
  signal?: AbortSignal
  headers?: HeadersMap
}

export interface Response {
  success: boolean
  headers: HeadersMap
  data: OutputSchema
}

export function toKnownErr(e: any) {
  return e
}
