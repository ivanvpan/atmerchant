import { Catalog, Collection, Item, Modifier, ModifierGroup, pruneCatalogs } from './catalog'
import dayjs from 'dayjs'

function listToMap<T extends { id: string }>(objects: T[]) {
  return Object.fromEntries(objects.map((obj) => [obj.id, obj]))
}

function makeCatalogs() {
  const catalog: Catalog = {
    id: '1',
    name: 'Test Catalog',
    description: 'Test Description',
    merchantLocation: '1',
    availabilityPeriods: [
      {
        dayOfWeek: 'MONDAY',
        start: {
          localHour: 10,
          localMinute: 0,
        },
        end: {
          localHour: 18,
          localMinute: 0,
        },
      },
    ],
    collections: ['1'],
  }
  const collection: Collection = {
    id: '1',
    name: 'Test Collection',
    description: 'Test Description',
    items: ['1', '2'],
    childCollections: [],
  }
  const item1: Item = {
    id: '1',
    name: 'Test Item 1',
    description: 'Test Description',
    priceMoney: {
      currency: 'USD',
      amount: 10,
    },
    suspended: false,
    modifierGroups: [],
  }
  const item2: Item = {
    id: '2',
    name: 'Test Item 2',
    description: 'Test Description',
    priceMoney: {
      currency: 'USD',
      amount: 10,
    },
    suspended: false,
    modifierGroups: [],
  }
  const modifierGroup1: ModifierGroup = {
    id: '1',
    name: 'Test Modifier Group 1',
    minimumSelection: 0,
    maximumSelection: 1,
    maximumOfEachModifier: 1,
    modifiers: ['1'],
  }

  const modifierGroup2 = {
    id: '2',
    name: 'Test Modifier Group 2',
    minimumSelection: 0,
    maximumSelection: 1,
    maximumOfEachModifier: 1,
    modifiers: ['2'],
  }
  const modifier1 = {
    id: '1',
    name: 'Test Modifier 1',
    priceMoney: {
      currency: 'USD',
      amount: 10,
    },
    suspended: false,
    childModifierGroups: [],
  }
  const modifier2: Modifier = {
    id: '2',
    name: 'Test Modifier 2',
    priceMoney: {
      currency: 'USD',
      amount: 10,
    },
    suspended: false,
    childModifierGroups: [],
  }

  return {
    catalogs: listToMap([catalog]),
    collections: listToMap([collection]),
    items: listToMap([item1, item2]),
    // modifierGroups: listToMap([modifierGroup1, modifierGroup2]),
    // modifiers: listToMap([modifier1, modifier2]),
    modifierGroups: {},
    modifiers: {},
  }
}

describe('catalogs', () => {
  describe('pruneCatalogs', () => {
    it('should leave catalog unchanged if everything is available', () => {
      const catalogs = makeCatalogs()
      console.log('catalogs', JSON.stringify(catalogs, null, 2))
      const mondayMidDay = dayjs().tz('America/New_York').day(1).hour(13).minute(0).toDate()
      const prunedCatalogs = pruneCatalogs(catalogs, mondayMidDay, 'America/New_York')
      console.log(JSON.stringify(prunedCatalogs, null, 2))
      expect(prunedCatalogs).toEqual(catalogs)
    })
  })
})
