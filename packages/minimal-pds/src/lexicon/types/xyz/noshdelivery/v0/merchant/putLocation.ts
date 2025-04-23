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
import type * as CommunityLexiconLocationAddress from '../../../../community/lexicon/location/address.js'
import type * as CommunityLexiconLocationGeo from '../../../../community/lexicon/location/geo.js'
import type * as XyzNoshdeliveryV0MerchantDefs from './defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.v0.merchant.putLocation'

export interface QueryParams {}

export interface InputSchema {
  /** The tid of the merchant group. */
  groupTid: string
  /** The external id of the merchant location. */
  externalId?: string
  /** The name of the merchant location. */
  name: string
  address: CommunityLexiconLocationAddress.Main
  coordinates: CommunityLexiconLocationGeo.Main
  /** The timezone of the merchant location. */
  timezone: string
  /** The uri of the merchant group. */
  parentGroup: string
}

export interface OutputSchema {
  locations: XyzNoshdeliveryV0MerchantDefs.LocationView[]
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
