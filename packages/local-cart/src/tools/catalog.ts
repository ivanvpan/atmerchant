import { isActiveCatalog } from './time'
import memoize from 'lodash/memoize'

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

function isModifierAvailable(modifierId: string, catalogs: Catalogs): boolean {
  const modifier = catalogs.modifiers[modifierId]
  if (!modifier) {
    return false
  }
  return !modifier.suspended
}

function isModifierGroupAvailable(modifierGroupId: string, catalogs: Catalogs): boolean {
  const modifierGroup = catalogs.modifierGroups[modifierGroupId]
  if (!modifierGroup) {
    return false
  }
  const availableModifiers = modifierGroup.modifiers.filter((modifierId) => isModifierAvailable(modifierId, catalogs))

  if (
    modifierGroup.maximumOfEachModifier &&
    modifierGroup.minimumSelection &&
    availableModifiers.length * modifierGroup.maximumOfEachModifier < modifierGroup.minimumSelection
  ) {
    return false
  }

  return availableModifiers.length > 0 && availableModifiers.length >= modifierGroup.minimumSelection
}

function isItemAvailable(itemId: string, catalogs: Catalogs): boolean {
  const item = catalogs.items[itemId]
  if (!item || item.suspended) {
    return false
  }
  const requiredGroups = item.modifierGroups.filter(
    (modifierGroupId) =>
      catalogs.modifierGroups[modifierGroupId] && catalogs.modifierGroups[modifierGroupId].minimumSelection > 0,
  )

  const unavailableRequiredGroups = requiredGroups.filter(
    (modifierGroupId) => !isModifierGroupAvailable(modifierGroupId, catalogs),
  )

  if (unavailableRequiredGroups.length > 0) {
    return false
  }

  return true
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
  const partiallyApplyCatalog = (
    availabilityFunction: (id: string, catalogs: Catalogs) => boolean,
    catalogs: Catalogs,
  ) => {
    return (id: string) => availabilityFunction(id, catalogs)
  }

  const catalogAvailable = memoize(partiallyApplyCatalog(isCatalogAvailable, catalogs))
  const collectionAvailable = memoize(partiallyApplyCatalog(isCollectionAvailable, catalogs))
  const itemAvailable = memoize(partiallyApplyCatalog(isItemAvailable, catalogs))
  const modifierGroupAvailable = memoize(partiallyApplyCatalog(isModifierGroupAvailable, catalogs))
  const modifierAvailable = memoize(partiallyApplyCatalog(isModifierAvailable, catalogs))

  return {
    catalogs: filterMap(catalogs.catalogs, (catalog) => isCatalogAvailable(catalog.id, catalogs)),
    collections: filterMap(catalogs.collections, (collection) => isCollectionAvailable(collection.id, catalogs)),
    items: filterMap(catalogs.items, (item) => isItemAvailable(item.id, catalogs)),
    modifierGroups: {},
    modifiers: {},
  }
}
