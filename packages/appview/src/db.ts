import {
  XyzNoshdeliveryV0CatalogCatalog,
  XyzNoshdeliveryV0CatalogCollection,
  XyzNoshdeliveryV0CatalogItem,
  XyzNoshdeliveryV0MerchantGroup,
  XyzNoshdeliveryV0MerchantLocation,
} from '@nosh/lexicon'
import SqliteDb from 'better-sqlite3'
import {
  Kysely,
  Migration,
  MigrationProvider,
  Migrator,
  SqliteDialect,
  // ParseJSONResultsPlugin
} from 'kysely'
import { tidFromUri } from '#/utils/uri'
import { InvalidRequestError } from '@atproto/xrpc-server'
import { AvailabilityTimeOfDay } from './utils/time'

export type DatabaseSchema = {
  adjacency_list: AdjacencyList
  merchant_group: MerchantGroup
  merchant_location: MerchantLocation
  catalog: Catalog
  catalog_collection: CatalogCollection
  catalog_item: CatalogItem
  catalog_modifier_group: CatalogModifierGroup
  catalog_modifier: CatalogModifier
  cursor: Cursor
}

export type Cursor = {
  id: number
  seq: number
}

type NodeType = 'catalog' | 'collection' | 'item'
export type AdjacencyList = {
  parentTid: string
  parentType: string
  childTid: string
  childType: string
}

export interface MerchantGroup {
  tid: string
  uri: string
  externalId?: string | null
  name: string
  logo?: string | null
}

type AddressJson = string
type MediaJson = string
export type MerchantLocation = {
  tid: string
  uri: string
  externalId?: string | null
  name: string
  address: AddressJson
  timezone: string
  coordinates: string
  media?: MediaJson | null
  parentGroup: string
}

export type Catalog = {
  tid: string
  uri: string
  externalId?: string | null
  name: string
  merchantLocation: string
  availabilityPeriods: string
  childCollections: string | null
}

export type CatalogCollection = {
  tid: string
  uri: string
  externalId?: string | null
  name: string
  items: string
  media: string | null
  childCollections: string | null
}

export type CatalogItem = {
  tid: string
  uri: string
  externalId?: string | null
  name: string
  description: string | null
  media: string | null
  priceMoney: string
  suspended: boolean
  modifierGroups: string
}

export type CatalogModifierGroup = {
  tid: string
  uri: string
  externalId?: string | null
  name: string
  description: string | null
  media: string | null
  minimumSelection: number
  maximumSelection: number
  maximumOfEachModifier: number
  modifiers: string
}

export type CatalogModifier = {
  tid: string
  uri: string
  externalId?: string | null
  name: string
  suspended: boolean
  description: string | null
  priceMoney: string
  childModifierGroups: string
}

// Migrations

const migrations: Record<string, Migration> = {}

const migrationProvider: MigrationProvider = {
  async getMigrations() {
    return migrations
  },
}

migrations['002'] = {
  async up(db: Kysely<unknown>) {
    await db.schema
      .createTable('cursor')
      .addColumn('id', 'integer', (col) => col.primaryKey())
      .addColumn('seq', 'integer', (col) => col.notNull())
      .execute()

    // Insert initial cursor values:
    // id=1 is for firehose, id=2 is for jetstream
    await db
      .insertInto('cursor' as never)
      .values([{ id: 1, seq: 53 }])
      .execute()
  },
  async down(db: Kysely<unknown>) {
    await db.schema.dropTable('cursor').execute()
  },
}

migrations['001'] = {
  async up(db: Kysely<unknown>) {
    await db.schema
      .createTable('adjacency_list')
      .addColumn('parentTid', 'varchar')
      .addColumn('parentType', 'varchar')
      .addColumn('childTid', 'varchar')
      .addColumn('childType', 'varchar')
      .execute()
    await db.schema
      .createIndex('adjacency_list_parent_tid_idx')
      .on('adjacency_list')
      .column('parentTid')
      .execute()
    await db.schema
      .createIndex('adjacency_list_child_tid_idx')
      .on('adjacency_list')
      .column('childTid')
      .execute()

    await db.schema
      .createTable('catalog_modifier')
      .addColumn('tid', 'varchar', (col) => col.primaryKey())
      .addColumn('uri', 'varchar', (col) => col.unique())
      .addColumn('externalId', 'varchar')
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('description', 'varchar')
      .addColumn('suspended', 'boolean', (col) =>
        col.defaultTo(false).notNull(),
      )
      .addColumn('priceMoney', 'jsonb', (col) => col.notNull())
      .addColumn('childModifierGroups', 'jsonb')
      .execute()
    await db.schema
      .createTable('catalog_modifier_group')
      .addColumn('tid', 'varchar', (col) => col.primaryKey())
      .addColumn('uri', 'varchar', (col) => col.unique())
      .addColumn('externalId', 'varchar')
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('description', 'varchar')
      .addColumn('media', 'jsonb')
      .addColumn('minimumSelection', 'integer', (col) => col.notNull())
      .addColumn('maximumSelection', 'integer', (col) => col.notNull())
      .addColumn('maximumOfEachModifier', 'integer', (col) => col.notNull())
      .addColumn('modifiers', 'jsonb')
      .execute()
    await db.schema
      .createTable('catalog_item')
      .addColumn('tid', 'varchar', (col) => col.primaryKey())
      .addColumn('uri', 'varchar', (col) => col.unique())
      .addColumn('externalId', 'varchar')
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('description', 'varchar')
      .addColumn('media', 'jsonb')
      .addColumn('priceMoney', 'jsonb', (col) => col.notNull())
      .addColumn('suspended', 'boolean', (col) =>
        col.defaultTo(false).notNull(),
      )
      .addColumn('modifierGroups', 'jsonb')
      .execute()
    await db.schema
      .createTable('catalog_collection')
      .addColumn('tid', 'varchar', (col) => col.primaryKey())
      .addColumn('uri', 'varchar', (col) => col.unique())
      .addColumn('externalId', 'varchar')
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('items', 'jsonb')
      .addColumn('media', 'jsonb')
      .addColumn('childCollections', 'jsonb')
      .execute()
    await db.schema
      .createTable('catalog')
      .addColumn('tid', 'varchar', (col) => col.primaryKey())
      .addColumn('uri', 'varchar', (col) => col.unique())
      .addColumn('externalId', 'varchar')
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('merchantLocation', 'varchar', (col) =>
        col.references('merchant_location.uri').notNull(),
      )
      .addColumn('availabilityPeriods', 'jsonb', (col) => col.notNull())
      .addColumn('childCollections', 'jsonb')
      .execute()

    await db.schema
      .createTable('merchant_group')
      .addColumn('tid', 'varchar', (col) => col.primaryKey())
      .addColumn('uri', 'varchar', (col) => col.unique())
      .addColumn('externalId', 'varchar')
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('logo', 'varchar')
      .execute()
    await db.schema
      .createTable('merchant_location')
      .addColumn('tid', 'varchar', (col) => col.primaryKey())
      .addColumn('uri', 'varchar', (col) => col.unique())
      .addColumn('externalId', 'varchar')
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('address', 'jsonb', (col) => col.notNull())
      .addColumn('timezone', 'varchar', (col) => col.notNull())
      .addColumn('coordinates', 'jsonb', (col) => col.notNull())
      .addColumn('media', 'jsonb')
      .addColumn('parentGroup', 'varchar', (col) =>
        col.references('merchant_group.uri').notNull(),
      )
      .execute()
  },
  async down(db: Kysely<unknown>) {
    await db.schema.dropTable('merchant_location').execute()
    await db.schema.dropTable('merchant_group').execute()
  },
}

// APIs

export const createDb = (location: string): Database => {
  return new Kysely<DatabaseSchema>({
    dialect: new SqliteDialect({
      database: new SqliteDb(location),
    }),
    // plugins: [new ParseJSONResultsPlugin()],
  })
}

export const migrateToLatest = async (db: Database) => {
  const migrator = new Migrator({ db, provider: migrationProvider })
  const { error } = await migrator.migrateToLatest()
  if (error) throw error
}

export type Database = Kysely<DatabaseSchema>

export const updateAdjacencyList = async (
  db: Database,
  parentTid: string,
  parentType: NodeType,
  childTids: string[],
  childType: NodeType,
) => {
  try {
    // TODO this is not very efficient but whatevs
    await db.transaction().execute(async (tx) => {
      await tx
        .deleteFrom('adjacency_list')
        .where('parentTid', '=', parentTid)
        .execute()
      await tx
        .insertInto('adjacency_list')
        .values(
          childTids.map((childTid) => ({
            parentTid,
            parentType,
            childTid,
            childType,
          })),
        )
        .onConflict((oc) => oc.doNothing())
        .execute()
    })
  } catch (error) {
    console.error('error updating adjacency list', error)
    throw error
  }
}

export const findAllCatalogsContainingItems = async (
  db: Database,
  itemIds: string[],
): Promise<Record<string, string[]>> => {
  const result = await db
    .withRecursive('item_ancestors', (cte) =>
      cte
        .selectFrom('adjacency_list')
        .select(['childTid', 'parentTid'])
        .where('childTid', 'in', itemIds)
        .unionAll(
          cte
            .selectFrom('item_ancestors')
            .innerJoin(
              'adjacency_list',
              'adjacency_list.childTid',
              'item_ancestors.parentTid',
            )
            .select(['item_ancestors.childTid', 'adjacency_list.parentTid']),
        ),
    )
    .selectFrom('item_ancestors')
    .innerJoin('catalog', 'catalog.tid', 'item_ancestors.parentTid')
    .select([
      'item_ancestors.childTid as itemTid',
      'catalog.tid',
      'catalog.name',
    ])
    .execute()
  return result.reduce(
    (acc, row) => {
      if (!acc[row.itemTid]) {
        acc[row.itemTid] = []
      }
      acc[row.itemTid].push(row.tid)
      return acc
    },
    {} as Record<string, string[]>,
  )
}

export const findMerchantGroupByTid = async (
  db: Database,
  tid: string,
): Promise<MerchantGroup | undefined> => {
  return await db
    .selectFrom('merchant_group')
    .where('tid', '=', tid)
    .selectAll()
    .executeTakeFirst()
}

export const findAllMerchantGroups = async (
  db: Database,
): Promise<MerchantGroup[]> => {
  return await db.selectFrom('merchant_group').selectAll().execute()
}

export const upsertMerchantGroupRecord = async (
  db: Database,
  uri: string,
  record: XyzNoshdeliveryV0MerchantGroup.Record,
) => {
  const group = {
    tid: tidFromUri(uri),
    uri,
    name: record.name,
    externalId: record.externalId,
    // logo: record.logo, // TODO: save logo
  }
  try {
    await db
      .insertInto('merchant_group')
      .values(group)
      .onConflict((oc) => oc.columns(['tid']).doUpdateSet(group))
      .onConflict((oc) => oc.columns(['uri']).doUpdateSet(group))
      .execute()
    // console.log('created merchant group', group.uri)
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('UNIQUE constraint failed')
    ) {
      console.log('merchant group already exists', group.uri)
    } else {
      console.error('error upserting merchant group', error)
      throw error
    }
  }
}

export const findMerchantLocationsByGroupTid = async (
  db: Database,
  tid: string,
): Promise<MerchantLocation[]> => {
  const groupUri = (await findMerchantGroupByTid(db, tid))?.uri
  if (!groupUri) {
    throw new InvalidRequestError('Group not found')
  }
  return await db
    .selectFrom('merchant_location')
    .where('parentGroup', '=', groupUri)
    .selectAll()
    .execute()
}

// TODO the duplication of the above function and this one needs to be dealt with
export const findMerchantLocationsByGroupUri = async (
  db: Database,
  groupUri: string,
): Promise<MerchantLocation[]> => {
  return await db
    .selectFrom('merchant_location')
    .where('parentGroup', '=', groupUri)
    .selectAll()
    .execute()
}

export const getMerchantLocation = async (db: Database, tid: string) => {
  return await db
    .selectFrom('merchant_location')
    .where('tid', '=', tid)
    .selectAll()
    .executeTakeFirst()
}

export const upsertMerchantLocationRecord = async (
  db: Database,
  uri: string,
  record: XyzNoshdeliveryV0MerchantLocation.Record,
) => {
  const location = {
    tid: tidFromUri(uri),
    uri,
    name: record.name,
    address: JSON.stringify(record.address),
    timezone: record.timezone,
    coordinates: JSON.stringify(record.coordinates),
    parentGroup: record.parentGroup,
    externalId: record.externalId || undefined,
  }
  try {
    await db
      .insertInto('merchant_location')
      .values(location)
      .onConflict((oc) => oc.columns(['tid']).doUpdateSet(location))
      .onConflict((oc) => oc.columns(['uri']).doUpdateSet(location))
      .execute()
  } catch (error) {
    // TODO too verbose and shouldn't onConflict handle this?
    console.error('error upserting merchant location', error)
    throw error
  }
}

export const getShallowCatalogsForLocationUri = async (
  db: Database,
  uri: string,
): Promise<{
  catalogs: Catalog[]
  collections: CatalogCollection[]
  items: CatalogItem[]
}> => {
  const catalogs = await db
    .selectFrom('catalog')
    .where('merchantLocation', '=', uri)
    .selectAll()
    .execute()

  const collectionsIds = catalogs.flatMap((catalog) => catalog.childCollections)

  const collections = await db
    .selectFrom('catalog_collection')
    .where('tid', 'in', collectionsIds)
    .selectAll()
    .execute()

  const itemsIds = collections.flatMap((collection) => collection.items)

  const items = await db
    .selectFrom('catalog_item')
    .where('tid', 'in', itemsIds)
    .selectAll()
    .execute()

  return { catalogs, collections, items }
}

export const getCatalogs = (db: Database, merchantUri: string) => {
  return db
    .selectFrom('catalog')
    .where('merchantLocation', '=', merchantUri)
    .selectAll()
    .execute()
}

export const findCatalogByTid = async (
  db: Database,
  tid: string,
): Promise<Catalog | undefined> => {
  return await db
    .selectFrom('catalog')
    .where('tid', '=', tid)
    .selectAll()
    .executeTakeFirst()
}

export const upsertCatalogRecord = async (
  db: Database,
  uri: string,
  record: XyzNoshdeliveryV0CatalogCatalog.Record,
) => {
  const catalog = {
    tid: tidFromUri(uri),
    uri,
    name: record.name,
    merchantLocation: record.merchantLocation,
    availabilityPeriods: JSON.stringify(record.availabilityPeriods),
    childCollections: JSON.stringify(record.childCollections),
  }
  try {
    await db
      .insertInto('catalog')
      .values(catalog)
      .onConflict((oc) => oc.columns(['tid']).doUpdateSet(catalog))
      .onConflict((oc) => oc.columns(['uri']).doUpdateSet(catalog))
      .execute()
  } catch (error) {
    console.error('error upserting catalog', error)
    throw error
  }
}

export const findCollectionByTid = async (
  db: Database,
  tid: string,
): Promise<CatalogCollection | undefined> => {
  return await db
    .selectFrom('catalog_collection')
    .where('tid', '=', tid)
    .selectAll()
    .executeTakeFirst()
}

export const upsertCollectionRecord = async (
  db: Database,
  uri: string,
  record: XyzNoshdeliveryV0CatalogCollection.Record,
) => {
  const collection = {
    tid: tidFromUri(uri),
    uri,
    name: record.name,
    items: JSON.stringify(record.items),
    media: JSON.stringify(record.media),
    childCollections: JSON.stringify(record.childCollections),
  }
  try {
    await db
      .insertInto('catalog_collection')
      .values(collection)
      .onConflict((oc) => oc.columns(['tid']).doUpdateSet(collection))
      .onConflict((oc) => oc.columns(['uri']).doUpdateSet(collection))
      .execute()
  } catch (error) {
    console.error('error upserting collection', error)
    throw error
  }
}

export const findItemByTid = async (
  db: Database,
  tid: string,
): Promise<CatalogItem | undefined> => {
  return await db
    .selectFrom('catalog_item')
    .where('tid', '=', tid)
    .selectAll()
    .executeTakeFirst()
}

export const upsertItemRecord = async (
  db: Database,
  uri: string,
  record: XyzNoshdeliveryV0CatalogItem.Record,
) => {
  const item = {
    tid: tidFromUri(uri),
    uri,
    name: record.name,
    description: record.description,
    media: JSON.stringify(record.media),
    priceMoney: JSON.stringify(record.priceMoney),
    suspended: record.suspended,
    modifierGroups: JSON.stringify(record.modifierGroups),
  }
  try {
    await db
      .insertInto('catalog_item')
      .values(item)
      .onConflict((oc) => oc.columns(['tid']).doUpdateSet(item))
      .onConflict((oc) => oc.columns(['uri']).doUpdateSet(item))
      .execute()
  } catch (error) {
    console.error('error upserting item', error)
    throw error
  }
}

export const getItems = async (db: Database, itemIds: string[]) => {
  return await db
    .selectFrom('catalog_item')
    .where('tid', 'in', itemIds)
    .selectAll()
    .execute()
}

export const getModifierGroups = async (
  db: Database,
  modifierGroupIds: string[],
) => {
  return await db
    .selectFrom('catalog_modifier_group')
    .where('tid', 'in', modifierGroupIds)
    .selectAll()
    .execute()
}

export const getModifiers = async (db: Database, modifierIds: string[]) => {
  return await db
    .selectFrom('catalog_modifier')
    .where('tid', 'in', modifierIds)
    .selectAll()
    .execute()
}
