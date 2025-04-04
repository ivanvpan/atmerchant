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
const id = 'xyz.noshdelivery.catalog.catalog'

export interface Record {
  $type: 'xyz.noshdelivery.catalog.catalog'
  name?: string
  merchant: string
  availabilityPeriods?: AvailabilityPeriod[]
  [k: string]: unknown
}

const hashRecord = 'main'

export function isRecord<V>(v: V) {
  return is$typed(v, id, hashRecord)
}

export function validateRecord<V>(v: V) {
  return validate<Record & V>(v, id, hashRecord, true)
}

export interface AvailabilityPeriod {
  $type?: 'xyz.noshdelivery.catalog.catalog#availabilityPeriod'
  start?: AvailabilityTimeOfDay
  end?: AvailabilityTimeOfDay
  daysOfWeek?:
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY'[]
}

const hashAvailabilityPeriod = 'availabilityPeriod'

export function isAvailabilityPeriod<V>(v: V) {
  return is$typed(v, id, hashAvailabilityPeriod)
}

export function validateAvailabilityPeriod<V>(v: V) {
  return validate<AvailabilityPeriod & V>(v, id, hashAvailabilityPeriod)
}

export interface AvailabilityTimeOfDay {
  $type?: 'xyz.noshdelivery.catalog.catalog#availabilityTimeOfDay'
  localHour?: number
  localMinute?: number
}

const hashAvailabilityTimeOfDay = 'availabilityTimeOfDay'

export function isAvailabilityTimeOfDay<V>(v: V) {
  return is$typed(v, id, hashAvailabilityTimeOfDay)
}

export function validateAvailabilityTimeOfDay<V>(v: V) {
  return validate<AvailabilityTimeOfDay & V>(v, id, hashAvailabilityTimeOfDay)
}
