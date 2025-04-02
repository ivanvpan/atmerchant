/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../../lexicons'
import { $Typed, is$typed as _is$typed, OmitKey } from '../../../../util'
import type * as XyzNoshdeliveryCatalogCategory from './category.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.catalog.item'

export interface Record {
  $type: 'xyz.noshdelivery.catalog.item'
  name: string
  /** References to all categories this item belongs to */
  category?: XyzNoshdeliveryCatalogCategory.Main[]
  [k: string]: unknown
}

const hashRecord = 'main'

export function isRecord<V>(v: V) {
  return is$typed(v, id, hashRecord)
}

export function validateRecord<V>(v: V) {
  return validate<Record & V>(v, id, hashRecord, true)
}
