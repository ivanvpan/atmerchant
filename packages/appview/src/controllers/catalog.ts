import {
  Catalog,
  CatalogCollection,
  CatalogItem,
  CatalogModifierGroup,
  CatalogModifier,
} from '#/db'
import { CatalogAvailabilityPeriod, isActiveCatalog } from '#/utils/time'

export function dbCatalogToCatalogView(dbCatalog: Catalog) {
  return {
    tid: dbCatalog.tid,
    uri: dbCatalog.uri,
    name: dbCatalog.name,
    externalId: dbCatalog.externalId || undefined,
    merchantLocation: dbCatalog.merchantLocation,
    availabilityPeriods: JSON.parse(
      dbCatalog.availabilityPeriods,
    ) as CatalogAvailabilityPeriod[],
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

export function dbItemToItemView(
  dbItem: CatalogItem,
  availabilityPeriods: CatalogAvailabilityPeriod[],
  timezone: string,
) {
  return {
    tid: dbItem.tid,
    uri: dbItem.uri,
    name: dbItem.name,
    externalId: dbItem.externalId || undefined,
    description: dbItem.description || undefined,
    availableForSale: isActiveCatalog(availabilityPeriods, timezone),
    suspended: dbItem.suspended,
    media: JSON.parse(dbItem.media || 'undefined'),
    priceMoney: JSON.parse(dbItem.priceMoney),
    modifierGroups: JSON.parse(dbItem.modifierGroups || '[]'),
  }
}

export function dbModifierGroupToModifierGroupView(
  dbModifierGroup: CatalogModifierGroup,
) {
  return {
    tid: dbModifierGroup.tid,
    uri: dbModifierGroup.uri,
    name: dbModifierGroup.name,
    description: dbModifierGroup.description || undefined,
    media: JSON.parse(dbModifierGroup.media || 'undefined'),
    minimumSelection: dbModifierGroup.minimumSelection,
    maximumSelection: dbModifierGroup.maximumSelection,
    maximumOfEachModifier: dbModifierGroup.maximumOfEachModifier,
    modifiers: JSON.parse(dbModifierGroup.modifiers || '[]') as string[],
  }
}

export function dbModifierToModifierView(dbModifier: CatalogModifier) {
  return {
    tid: dbModifier.tid,
    uri: dbModifier.uri,
    name: dbModifier.name,
    suspended: dbModifier.suspended,
    priceMoney: JSON.parse(dbModifier.priceMoney),
    childModifierGroups: JSON.parse(
      dbModifier.childModifierGroups || '[]',
    ) as string[],
  }
}
