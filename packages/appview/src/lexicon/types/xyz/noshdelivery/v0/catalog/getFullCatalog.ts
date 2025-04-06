/**
 * GENERATED CODE - DO NOT MODIFY
 */
import express from 'express'
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../../../lexicons'
import {
  type $Typed,
  is$typed as _is$typed,
  type OmitKey,
} from '../../../../../util'
import { HandlerAuth, HandlerPipeThrough } from '@atproto/xrpc-server'

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.v0.catalog.getFullCatalog'

export interface QueryParams {}

export type InputSchema = undefined

export interface OutputSchema {
  merchant: string
}

export type HandlerInput = undefined

export interface HandlerSuccess {
  encoding: 'application/json'
  body: OutputSchema
  headers?: { [key: string]: string }
}

export interface HandlerError {
  status: number
  message?: string
}

export type HandlerOutput = HandlerError | HandlerSuccess | HandlerPipeThrough
export type HandlerReqCtx<HA extends HandlerAuth = never> = {
  auth: HA
  params: QueryParams
  input: HandlerInput
  req: express.Request
  res: express.Response
  resetRouteRateLimits: () => Promise<void>
}
export type Handler<HA extends HandlerAuth = never> = (
  ctx: HandlerReqCtx<HA>,
) => Promise<HandlerOutput> | HandlerOutput

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
