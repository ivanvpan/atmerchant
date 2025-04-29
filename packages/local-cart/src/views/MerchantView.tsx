import { AtpAgent } from '@atproto/api'
import {
  XyzNoshdeliveryV0CatalogCatalog,
  XyzNoshdeliveryV0CatalogCollection,
  XyzNoshdeliveryV0CatalogItem,
  ComAtprotoRepoListRecords,
} from '@nosh/lexicon'
import { useState, useEffect } from 'react'
import { AtUri } from '@atproto/api'

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

function listToMap<T extends { uri: string }>(list: T[]) {
  return list.reduce((acc: Record<string, T>, item) => {
    const uri = new AtUri(item.uri)
    acc[uri.rkey] = item
    return acc
  }, {})
}

type CatalogRecord = ComAtprotoRepoListRecords.Record & { value: XyzNoshdeliveryV0CatalogCatalog.Record }
type CollectionRecord = ComAtprotoRepoListRecords.Record & { value: XyzNoshdeliveryV0CatalogCollection.Record }
type ItemRecord = ComAtprotoRepoListRecords.Record & { value: XyzNoshdeliveryV0CatalogItem.Record }

async function fetchCatalog() {
  const catalogResponse = await listRecords<XyzNoshdeliveryV0CatalogCatalog.Record>(
    'xyz.noshdelivery.v0.catalog.catalog',
  )
  const collectionResponse = await listRecords<XyzNoshdeliveryV0CatalogCollection.Record>(
    'xyz.noshdelivery.v0.catalog.collection',
  )
  const itemResponse = await listRecords<XyzNoshdeliveryV0CatalogItem.Record>('xyz.noshdelivery.v0.catalog.item')
  return {
    catalog: listToMap(catalogResponse),
    collections: listToMap(collectionResponse),
    items: listToMap(itemResponse),
  }
}

function useCatalog() {
  const [catalog, setCatalog] = useState<Record<string, CatalogRecord>>({})
  const [collections, setCollections] = useState<Record<string, CollectionRecord>>({})
  const [items, setItems] = useState<Record<string, ItemRecord>>({})
  useEffect(() => {
    fetchCatalog().then(({ catalog, collections, items }) => {
      setCatalog(catalog)
      setCollections(collections)
      setItems(items)
    })
  }, [])
  return { catalog, collections, items }
}

function Collection({ collection, items }: { collection: CollectionRecord; items: Record<string, ItemRecord> }) {
  return (
    <div>
      <h3>{collection.value.name}</h3>
      {collection.value.items?.map((itemId) => {
        const item = items[itemId]
        if (!item) {
          return `Missing item ${itemId}`
        }
        return <Item key={itemId} item={item} />
      })}
    </div>
  )
}

function Item({ item }: { item: ItemRecord }) {
  return (
    <div>
      {item.value.name}: ${item.value.priceMoney.amount}
    </div>
  )
}

function Catalog({
  catalog,
  collections,
  items,
}: {
  catalog: CatalogRecord
  collections: Record<string, CollectionRecord>
  items: Record<string, ItemRecord>
}) {
  return (
    <div>
      <h2>{catalog.value.name}</h2>
      {catalog.value.collections?.map((collectionId) => (
        <Collection key={collectionId} collection={collections[collectionId]} items={items} />
      ))}
    </div>
  )
}

function MerchantView() {
  const { catalog, collections, items } = useCatalog()
  return (
    <>
      <h3>Catalogs</h3>
      {Object.values(catalog).map((record) => (
        <div key={record.uri}>
          <Catalog key={record.uri} catalog={record} collections={collections} items={items} />
        </div>
      ))}
    </>
  )
}

export default MerchantView
