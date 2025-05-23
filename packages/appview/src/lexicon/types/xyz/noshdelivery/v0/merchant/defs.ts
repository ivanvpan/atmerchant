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
import type * as XyzNoshdeliveryV0MediaImage from '../media/image.js'
import type * as CommunityLexiconLocationAddress from '../../../../community/lexicon/location/address.js'
import type * as CommunityLexiconLocationGeo from '../../../../community/lexicon/location/geo.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.v0.merchant.defs'

/** width:height represents an aspect ratio. It may be approximate, and may not correspond to absolute dimensions in any given unit. */
export interface AspectRatio {
  $type?: 'xyz.noshdelivery.v0.merchant.defs#aspectRatio'
  width: number
  height: number
}

const hashAspectRatio = 'aspectRatio'

export function isAspectRatio<V>(v: V) {
  return is$typed(v, id, hashAspectRatio)
}

export function validateAspectRatio<V>(v: V) {
  return validate<AspectRatio & V>(v, id, hashAspectRatio)
}

/** A view of a merchant group */
export interface GroupView {
  $type?: 'xyz.noshdelivery.v0.merchant.defs#groupView'
  tid: string
  uri: string
  externalId?: string
  name: string
  logo?: XyzNoshdeliveryV0MediaImage.ImageView
}

const hashGroupView = 'groupView'

export function isGroupView<V>(v: V) {
  return is$typed(v, id, hashGroupView)
}

export function validateGroupView<V>(v: V) {
  return validate<GroupView & V>(v, id, hashGroupView)
}

/** A view of a merchant location */
export interface LocationView {
  $type?: 'xyz.noshdelivery.v0.merchant.defs#locationView'
  tid?: string
  uri?: string
  externalId?: string
  name?: string
  timezone?: string
  address?: CommunityLexiconLocationAddress.Main
  coordinates?: CommunityLexiconLocationGeo.Main
}

const hashLocationView = 'locationView'

export function isLocationView<V>(v: V) {
  return is$typed(v, id, hashLocationView)
}

export function validateLocationView<V>(v: V) {
  return validate<LocationView & V>(v, id, hashLocationView)
}
