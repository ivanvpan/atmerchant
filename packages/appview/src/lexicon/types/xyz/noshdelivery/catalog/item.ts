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
import type * as XyzNoshdeliveryCatalogDefs from './defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.catalog.item'

export interface Record {
  $type: 'xyz.noshdelivery.catalog.item'
  sku?: string
  name: string
  /** References to all categories this item is included in. */
  categories: CategoryRefWithOrdinal[]
  price: XyzNoshdeliveryCatalogDefs.Price
  [k: string]: unknown
}

const hashRecord = 'main'

export function isRecord<V>(v: V) {
  return is$typed(v, id, hashRecord)
}

export function validateRecord<V>(v: V) {
  return validate<Record & V>(v, id, hashRecord, true)
}

export interface CategoryRefWithOrdinal {
  $type?: 'xyz.noshdelivery.catalog.item#categoryRefWithOrdinal'
  category: string
  /** The order in which this item should appear in the category. */
  ordinal: number
}

const hashCategoryRefWithOrdinal = 'categoryRefWithOrdinal'

export function isCategoryRefWithOrdinal<V>(v: V) {
  return is$typed(v, id, hashCategoryRefWithOrdinal)
}

export function validateCategoryRefWithOrdinal<V>(v: V) {
  return validate<CategoryRefWithOrdinal & V>(v, id, hashCategoryRefWithOrdinal)
}
