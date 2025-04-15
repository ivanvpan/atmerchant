import {
  XyzNoshdeliveryV0CatalogCatalog,
  XyzNoshdeliveryV0CatalogCollection,
  XyzNoshdeliveryV0CatalogItem,
  XyzNoshdeliveryV0CatalogModifierGroup,
  XyzNoshdeliveryV0CatalogModifier,
} from '@nosh/lexicon'
import { schemaDict } from './lexicon/lexicons'

export type CatalogObjectType =
  | 'catalog'
  | 'collection'
  | 'item'
  | 'modifierGroup'
  | 'modifier'

export type CatalogObject = {
  type: CatalogObjectType
  tid: string
  uri: string
  name: string
  externalId?: string
  data:
    | XyzNoshdeliveryV0CatalogCatalog.Record
    | XyzNoshdeliveryV0CatalogCollection.Record
    | XyzNoshdeliveryV0CatalogItem.Record
  // | XyzNoshdeliveryV0CatalogModifierGroup.Record
  // | XyzNoshdeliveryV0CatalogModifier.Record
}

export type CatalogObjectData =
  | XyzNoshdeliveryV0CatalogCatalog.Record
  | XyzNoshdeliveryV0CatalogCollection.Record
  | XyzNoshdeliveryV0CatalogItem.Record
// | XyzNoshdeliveryV0CatalogModifierGroup.Record
// | XyzNoshdeliveryV0CatalogModifier.Record

export type LexiconType =
  | XyzNoshdeliveryV0CatalogCatalog.Record['$type']
  | XyzNoshdeliveryV0CatalogCollection.Record['$type']
  | XyzNoshdeliveryV0CatalogItem.Record['$type']
// | XyzNoshdeliveryV0CatalogModifierGroup.Record['$type']
// | XyzNoshdeliveryV0CatalogModifier.Record['$type']

// Is this sane?
export const typeToLexiconType: Record<CatalogObjectType, LexiconType> = {
  catalog: schemaDict.XyzNoshdeliveryV0CatalogCatalog.id,
  collection: schemaDict.XyzNoshdeliveryV0CatalogCollection.id,
  item: schemaDict.XyzNoshdeliveryV0CatalogItem.id,
  // modifierGroup: schemaDict.XyzNoshdeliveryV0CatalogModifierGroup.id,
  // modifier: schemaDict.XyzNoshdeliveryV0CatalogModifier.id,
}

// TODO this a many-to-one mapping
export const lexiconTypeToCatalogObjectType: Record<
  LexiconType,
  CatalogObjectType
> = {
  [schemaDict.XyzNoshdeliveryV0CatalogCatalog.id]: 'catalog',
  [schemaDict.XyzNoshdeliveryV0CatalogCollection.id]: 'collection',
  [schemaDict.XyzNoshdeliveryV0CatalogItem.id]: 'item',
  // modifierGroup: schemaDict.XyzNoshdeliveryV0CatalogModifierGroup.id,
  // modifier: schemaDict.XyzNoshdeliveryV0CatalogModifier.id,
}
