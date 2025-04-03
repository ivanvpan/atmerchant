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
const id = 'xyz.noshdelivery.catalog.category'

export interface Record {
  $type: 'xyz.noshdelivery.catalog.category'
  name: string
  parentCatalogOrCategory: CatalogOrCategoryRefWithOrdinal
  [k: string]: unknown
}

const hashRecord = 'main'

export function isRecord<V>(v: V) {
  return is$typed(v, id, hashRecord)
}

export function validateRecord<V>(v: V) {
  return validate<Record & V>(v, id, hashRecord, true)
}

export interface CatalogOrCategoryRefWithOrdinal {
  $type?: 'xyz.noshdelivery.catalog.category#catalogOrCategoryRefWithOrdinal'
  categoryOrCatalog: string
  /** The order in which this item should appear in the category. */
  ordinal: number
}

const hashCatalogOrCategoryRefWithOrdinal = 'catalogOrCategoryRefWithOrdinal'

export function isCatalogOrCategoryRefWithOrdinal<V>(v: V) {
  return is$typed(v, id, hashCatalogOrCategoryRefWithOrdinal)
}

export function validateCatalogOrCategoryRefWithOrdinal<V>(v: V) {
  return validate<CatalogOrCategoryRefWithOrdinal & V>(
    v,
    id,
    hashCatalogOrCategoryRefWithOrdinal,
  )
}
