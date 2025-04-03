/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../../lexicons'
import {
  type $Typed,
  is$typed as _is$typed,
  type OmitKey,
} from '../../../../util'

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.catalog.defs'

export interface Price {
  $type?: 'xyz.noshdelivery.catalog.defs#price'
  currency: string
  /** The amount in the smallest unit of the currency. For example cents */
  amount: number
}

const hashPrice = 'price'

export function isPrice<V>(v: V) {
  return is$typed(v, id, hashPrice)
}

export function validatePrice<V>(v: V) {
  return validate<Price & V>(v, id, hashPrice)
}
