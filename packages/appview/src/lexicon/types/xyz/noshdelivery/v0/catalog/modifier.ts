/**
 * GENERATED CODE - DO NOT MODIFY
 */
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
const id = 'xyz.noshdelivery.v0.catalog.modifier'

export interface Record {
  $type: 'xyz.noshdelivery.v0.catalog.modifier'
  externalId?: string
  name: string
  priceMoney: XyzNoshdeliveryV0CatalogDefs.PriceMoney
  /** Pkeys of xyz.noshdelivery.v0.catalog.modifierGroup records that are children of this modifier. Ordered in the way they will be presented. */
  childModifierGroups?: string[]
  [k: string]: unknown
}

const hashRecord = 'main'

export function isRecord<V>(v: V) {
  return is$typed(v, id, hashRecord)
}

export function validateRecord<V>(v: V) {
  return validate<Record & V>(v, id, hashRecord, true)
}
