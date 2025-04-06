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

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.v0.catalog.getFullCatalog'

export interface QueryParams {}

export type InputSchema = undefined

export interface OutputSchema {
  merchant: string
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

export interface CatalogView {
  $type?: 'xyz.noshdelivery.v0.catalog.getFullCatalog#catalogView'
  uri: string
  externalId?: string
  name: string
  availabilityPeriods?: AvailabilityPeriod[]
  /** Pkeys of xyz.noshdelivery.v0.catalog.collection records that belong in this catalog. Ordered in the way they will be presented. */
  childCollections?: string[]
}

const hashCatalogView = 'catalogView'

export function isCatalogView<V>(v: V) {
  return is$typed(v, id, hashCatalogView)
}

export function validateCatalogView<V>(v: V) {
  return validate<CatalogView & V>(v, id, hashCatalogView)
}

export interface CollectionView {
  $type?: 'xyz.noshdelivery.v0.catalog.getFullCatalog#collectionView'
  uri: string
  externalId?: string
  name: string
  childCollections?: CollectionView[]
}

const hashCollectionView = 'collectionView'

export function isCollectionView<V>(v: V) {
  return is$typed(v, id, hashCollectionView)
}

export function validateCollectionView<V>(v: V) {
  return validate<CollectionView & V>(v, id, hashCollectionView)
}
