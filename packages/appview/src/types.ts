import {
  XyzNoshdeliveryV0CatalogCatalog,
  XyzNoshdeliveryV0CatalogCollection,
  XyzNoshdeliveryV0CatalogItem,
  XyzNoshdeliveryV0CatalogModifierGroup,
  XyzNoshdeliveryV0CatalogModifier,
} from '@nosh/lexicon'

type CatalogObjectType =
  | 'catalog'
  | 'collection'
  | 'item'
  | 'modifierGroup'
  | 'modifier'

export type CatalogObject = {
  type: CatalogObjectType
  tid: string
  uri: string
  data:
    | XyzNoshdeliveryV0CatalogCatalog.Record
    | XyzNoshdeliveryV0CatalogCollection.Record
    | XyzNoshdeliveryV0CatalogItem.Record
    | XyzNoshdeliveryV0CatalogModifierGroup.Record
    | XyzNoshdeliveryV0CatalogModifier.Record
}

// Is this sane?
const typeToLexiconType: Record<CatalogObjectType, string> = {
  catalog: 'xyz.noshdelivery.v0.catalog.catalog',
  collection: 'xyz.noshdelivery.v0.catalog.collection',
  item: 'xyz.noshdelivery.v0.catalog.item',
  modifierGroup: 'xyz.noshdelivery.v0.catalog.modifierGroup',
  modifier: 'xyz.noshdelivery.v0.catalog.modifier',
}
