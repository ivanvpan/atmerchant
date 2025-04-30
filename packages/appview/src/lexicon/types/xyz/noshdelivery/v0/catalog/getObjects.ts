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
const id = 'xyz.noshdelivery.v0.catalog.getObjects'

export interface QueryParams {
  objectIds?: string[]
  includeRelationTypes?:
    | 'catalog'
    | 'collection'
    | 'item'
    | 'modifierGroup'
    | 'modifier'
}

export type InputSchema = undefined

export interface OutputSchema {
  catalogs: XyzNoshdeliveryV0CatalogDefs.CatalogView[]
  collections: XyzNoshdeliveryV0CatalogDefs.CollectionView[]
  items: XyzNoshdeliveryV0CatalogDefs.ItemView[]
  modifierGroups?: XyzNoshdeliveryV0CatalogDefs.ModifierGroupView[]
  modifiers?: XyzNoshdeliveryV0CatalogDefs.ModifierView[]
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
