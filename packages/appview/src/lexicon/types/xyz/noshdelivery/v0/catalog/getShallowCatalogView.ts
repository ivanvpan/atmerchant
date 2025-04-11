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
import type * as XyzNoshdeliveryV0CatalogDefs from './defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.v0.catalog.getShallowCatalogView'

export interface QueryParams {
  /** The URI of the merchant whose catalogs to get. */
  locationUri?: string
}

export type InputSchema = undefined

export interface OutputSchema {
  merchantLocation: string
  shallowCatalogView: ShallowCatalogView
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

export interface ShallowCatalogView {
  $type?: 'xyz.noshdelivery.v0.catalog.getShallowCatalogView#shallowCatalogView'
  catalogs: XyzNoshdeliveryV0CatalogDefs.CatalogView[]
  collections: XyzNoshdeliveryV0CatalogDefs.CollectionView[]
  items: XyzNoshdeliveryV0CatalogDefs.ItemView[]
}

const hashShallowCatalogView = 'shallowCatalogView'

export function isShallowCatalogView<V>(v: V) {
  return is$typed(v, id, hashShallowCatalogView)
}

export function validateShallowCatalogView<V>(v: V) {
  return validate<ShallowCatalogView & V>(v, id, hashShallowCatalogView)
}
