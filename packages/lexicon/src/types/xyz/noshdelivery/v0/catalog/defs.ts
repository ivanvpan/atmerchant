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

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.v0.catalog.defs'

export interface PriceMoney {
  $type?: 'xyz.noshdelivery.v0.catalog.defs#priceMoney'
  currency: string
  /** The amount in the smallest unit of the currency. For example cents. */
  amount: number
}

const hashPriceMoney = 'priceMoney'

export function isPriceMoney<V>(v: V) {
  return is$typed(v, id, hashPriceMoney)
}

export function validatePriceMoney<V>(v: V) {
  return validate<PriceMoney & V>(v, id, hashPriceMoney)
}
