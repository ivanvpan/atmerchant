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

export interface HandlerInput {
  encoding: 'application/json'
  body: InputSchema
}

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
