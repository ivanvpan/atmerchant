import { isActiveCatalog } from './time'

type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'

export interface Money {
  currency: string
  amount: number
}

export interface AvailabilityTimeOfDay {
  localHour: number
  localMinute: number
}

export interface AvailabilityPeriod {
  dayOfWeek: DayOfWeek
  start: AvailabilityTimeOfDay
  end: AvailabilityTimeOfDay
}

export interface Catalog {
  id: string
  name: string
  description?: string
  merchantLocation: string
  collections: string[]
  availabilityPeriods?: AvailabilityPeriod[]
}

export interface Collection {
  id: string
  name: string
  description?: string
  items: string[]
  childCollections: string[]
}

export interface Item {
  id: string
  name: string
  priceMoney: Money
  description?: string
  suspended: boolean
  modifierGroups: string[]
}

export interface ModifierGroup {
  id: string
  name: string
  minimumSelection: number
  maximumSelection: number
  maximumOfEachModifier: number
  modifiers: string[]
}

export interface Modifier {
  id: string
  name: string
  priceMoney: Money
  suspended: boolean
  childModifierGroups: string[]
}

export interface Catalogs {
  catalogs: Record<string, Catalog>
  collections: Record<string, Collection>
  items: Record<string, Item>
  modifierGroups: Record<string, ModifierGroup>
  modifiers: Record<string, Modifier>
}

function isItemAvailable(itemId: string, catalogs: Catalogs): boolean {
  const item = catalogs.items[itemId]
  if (!item) {
    return false
  }
  // TODO check modifier groups
  return !item.suspended
}

function isCollectionAvailable(collectionId: string, catalogs: Catalogs): boolean {
  const collection = catalogs.collections[collectionId]
  if (!collection) {
    return false
  }
  return collection.items.some((itemId) => isItemAvailable(itemId, catalogs))
}

function isCatalogAvailable(catalogId: string, catalogs: Catalogs): boolean {
  const catalog = catalogs.catalogs[catalogId]
  if (!catalog) {
    return false
  }
  return (
    isActiveCatalog(catalog.availabilityPeriods || [], catalog.merchantLocation) &&
    catalog.collections.some((collectionId) => isCollectionAvailable(collectionId, catalogs))
  )
}

// Return the catalogs but without any items that are suspended or unavailable for some reason
export function pruneCatalogs(catalogs: Catalogs): Catalogs {
  const filterMap = <T>(map: Record<string, T>, filter: (value: T, catalogs: Catalogs) => boolean) =>
    Object.fromEntries(Object.entries(map).filter(([_, value]) => filter(value, catalogs)))

  return {
    catalogs: filterMap(catalogs.catalogs, (catalog) => isCatalogAvailable(catalog.id, catalogs)),
    collections: filterMap(catalogs.collections, (collection) => isCollectionAvailable(collection.id, catalogs)),
    items: filterMap(catalogs.items, (item) => isItemAvailable(item.id, catalogs)),
    modifierGroups: {},
    modifiers: {},
  }
}
