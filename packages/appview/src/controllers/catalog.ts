import { Catalog, CatalogCollection, CatalogItem } from '#/db'

export function dbCatalogToCatalogView(dbCatalog: Catalog) {
  return {
    tid: dbCatalog.tid,
    uri: dbCatalog.uri,
    name: dbCatalog.name,
    externalId: dbCatalog.externalId || undefined,
    merchantLocation: dbCatalog.merchantLocation,
    availabilityPeriods: JSON.parse(dbCatalog.availabilityPeriods),
    childCollections: JSON.parse(dbCatalog.childCollections || '[]'),
  }
}

export function dbCollectionToCollectionView(dbCollection: CatalogCollection) {
  return {
    tid: dbCollection.tid,
    uri: dbCollection.uri,
    name: dbCollection.name,
    items: JSON.parse(dbCollection.items || '[]'),
    media: JSON.parse(dbCollection.media || 'null'),
    childCollections: JSON.parse(dbCollection.childCollections || '[]'),
  }
}

export function dbItemToItemView(dbItem: CatalogItem) {
  return {
    tid: dbItem.tid,
    uri: dbItem.uri,
    name: dbItem.name,
    externalId: dbItem.externalId || undefined,
    availableForSale: dbItem.availableForSale,
    description: dbItem.description || undefined,
    media: JSON.parse(dbItem.media || 'undefined'),
    priceMoney: JSON.parse(dbItem.priceMoney),
    modifierGroups: JSON.parse(dbItem.modifierGroups || '[]'),
  }
}
