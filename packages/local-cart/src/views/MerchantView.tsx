import { AtpAgent } from '@atproto/api'
import {
  XyzNoshdeliveryV0CatalogCatalog,
  XyzNoshdeliveryV0CatalogCollection,
  XyzNoshdeliveryV0CatalogItem,
  ComAtprotoRepoListRecords,
  XyzNoshdeliveryV0CatalogModifierGroup,
  XyzNoshdeliveryV0CatalogModifier,
} from '@nosh/lexicon'
import { useState, useEffect } from 'react'
import { AtUri } from '@atproto/api'
import { Catalog, Collection, Item, Modifier, ModifierGroup } from '../tools/menu'
const REPO = 'did:plc:ufa7rl6agtfdqje6bant3wsb'
const pdsClient = new AtpAgent({
  service: `http://localhost:3001`,
})

async function listRecords<T>(collection: string) {
  const response = await pdsClient.com.atproto.repo.listRecords({
    repo: REPO,
    collection,
  })
  return response.data.records as (ComAtprotoRepoListRecords.Record & { value: T })[]
}

function extractRkey(uri: string) {
  const uriObj = new AtUri(uri)
  return uriObj.rkey
}

function listToMap<T extends { uri: string; value: any }>(list: T[], recordToObject: (record: T) => any) {
  return list.reduce((acc: Record<string, any>, item) => {
    acc[extractRkey(item.uri)] = recordToObject(item.value)
    return acc
  }, {})
}

type CatalogRecord = ComAtprotoRepoListRecords.Record & { value: XyzNoshdeliveryV0CatalogCatalog.Record }
type CollectionRecord = ComAtprotoRepoListRecords.Record & { value: XyzNoshdeliveryV0CatalogCollection.Record }
type ItemRecord = ComAtprotoRepoListRecords.Record & { value: XyzNoshdeliveryV0CatalogItem.Record }
type ModifierGroupRecord = ComAtprotoRepoListRecords.Record & { value: XyzNoshdeliveryV0CatalogModifierGroup.Record }
type ModifierRecord = ComAtprotoRepoListRecords.Record & { value: XyzNoshdeliveryV0CatalogModifier.Record }

interface Catalogs {
  catalogs: Record<string, Catalog>
  collections: Record<string, Collection>
  items: Record<string, Item>
  modifierGroups: Record<string, ModifierGroup>
  modifiers: Record<string, Modifier>
}

// This should not be done ad-hoc. The best solution to convert records with backward and forward
// compatibility seems to be Cambria, which is meant specifically for this purpose.
function recordToCatalog(record: CatalogRecord): Catalog {
  return {
    id: extractRkey(record.uri),
    name: record.value.name,
    merchantLocation: record.value.merchantLocation,
    // description: record.value.description, // TODO: add description to lexicon
    collections: record.value.collections ?? [],
    availabilityPeriods: record.value.availabilityPeriods,
  }
}

function recordToCollection(record: CollectionRecord): Collection {
  return {
    id: extractRkey(record.uri),
    name: record.value.name,
    // description: record.value.description,
    childCollections: record.value.childCollections ?? [],
    // media: record.value.media,
    items: record.value.items ?? [],
  }
}

function recordToItem(record: ItemRecord): Item {
  return {
    id: extractRkey(record.uri),
    name: record.value.name,
    priceMoney: record.value.priceMoney,
    suspended: record.value.suspended,
    modifierGroups: record.value.modifierGroups ?? [],
  }
}

function recordToModifierGroup(record: ModifierGroupRecord): ModifierGroup {
  return {
    id: extractRkey(record.uri),
    name: record.value.name,
    minimumSelection: record.value.minimumSelection,
    maximumSelection: record.value.maximumSelection,
    maximumOfEachModifier: record.value.maximumOfEachModifier,
    modifiers: record.value.modifiers ?? [],
  }
}

function recordToModifier(record: ModifierRecord): Modifier {
  return {
    id: extractRkey(record.uri),
    name: record.value.name,
    priceMoney: record.value.priceMoney,
    suspended: record.value.suspended,
    childModifierGroups: record.value.childModifierGroups ?? [],
  }
}

async function fetchCatalog(): Promise<Catalogs> {
  const catalogResponse = await listRecords<XyzNoshdeliveryV0CatalogCatalog.Record>(
    'xyz.noshdelivery.v0.catalog.catalog',
  )
  const collectionResponse = await listRecords<XyzNoshdeliveryV0CatalogCollection.Record>(
    'xyz.noshdelivery.v0.catalog.collection',
  )
  const itemResponse = await listRecords<XyzNoshdeliveryV0CatalogItem.Record>('xyz.noshdelivery.v0.catalog.item')
  const modifierGroupResponse = await listRecords<XyzNoshdeliveryV0CatalogModifierGroup.Record>(
    'xyz.noshdelivery.v0.catalog.modifierGroup',
  )
  const modifierResponse = await listRecords<XyzNoshdeliveryV0CatalogModifier.Record>(
    'xyz.noshdelivery.v0.catalog.modifier',
  )
  return {
    catalogs: listToMap(catalogResponse, recordToCatalog),
    collections: listToMap(collectionResponse, recordToCollection),
    items: listToMap(itemResponse, recordToItem),
    modifierGroups: listToMap(modifierGroupResponse, recordToModifierGroup),
    modifiers: listToMap(modifierResponse, recordToModifier),
  }
}

function useCatalog() {
  const [catalogs, setCatalogs] = useState<Record<string, Catalog>>({})
  const [collections, setCollections] = useState<Record<string, Collection>>({})
  const [items, setItems] = useState<Record<string, Item>>({})
  useEffect(() => {
    fetchCatalog().then(({ catalogs, collections, items }) => {
      setCatalogs(catalogs)
      setCollections(collections)
      setItems(items)
    })
  }, [])
  return { catalogs, collections, items }
}

function CollectionView({ collection, items }: { collection: Collection; items: Record<string, Item> }) {
  return (
    <div>
      <h3>{collection.name}</h3>
      {collection.items?.map((itemId) => {
        const item = items[itemId]
        if (!item) {
          return `Missing item ${itemId}`
        }
        return <ItemView key={itemId} item={item} />
      })}
    </div>
  )
}

function ItemView({ item }: { item: Item }) {
  return (
    <div>
      {item.name}: ${item.priceMoney.amount}
    </div>
  )
}

function CatalogView({
  catalog,
  collections,
  items,
}: {
  catalog: Catalog
  collections: Record<string, Collection>
  items: Record<string, Item>
}) {
  return (
    <div>
      <h2>{catalog.name}</h2>
      {catalog.collections?.map((collectionId) => (
        <CollectionView key={collectionId} collection={collections[collectionId]} items={items} />
      ))}
    </div>
  )
}

function MerchantView() {
  const { catalogs, collections, items } = useCatalog()
  return (
    <>
      <h3>Catalogs</h3>
      {Object.values(catalogs).map((catalog) => (
        <div key={catalog.id}>
          <CatalogView key={catalog.id} catalog={catalog} collections={collections} items={items} />
        </div>
      ))}
    </>
  )
}

export default MerchantView
