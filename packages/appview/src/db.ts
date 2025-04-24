import { XyzNoshdeliveryV0MerchantGroup, XyzNoshdeliveryV0MerchantLocation } from '@nosh/lexicon'
import SqliteDb from 'better-sqlite3'
import {
  Kysely,
  Migration,
  MigrationProvider,
  Migrator,
  SqliteDialect,
  // ParseJSONResultsPlugin
} from 'kysely'
import { tidFromUri, typeFromUri } from '#/utils/uri'
import { InvalidRequestError } from '@atproto/xrpc-server'
import {
  CatalogObject,
  CatalogObjectData,
  CatalogObjectType,
  LexiconType,
  lexiconTypeToCatalogObjectType,
} from './types'

export type DatabaseSchema = {
  adjacency_list: AdjacencyList
  merchant_group: MerchantGroup
  merchant_location: MerchantLocation
  cursor: Cursor
  catalog_object: DBCatalogObject
}

export type DBCatalogObject = Omit<CatalogObject, 'data'> & {
  data: string
}

export type Cursor = {
  id: number
  seq: number
}

export type AdjacencyList = {
  parentTid: string
  parentType: CatalogObjectType
  childTid: string
  childType: CatalogObjectType
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
    await db.schema.createIndex('adjacency_list_parent_tid_idx').on('adjacency_list').column('parentTid').execute()
    await db.schema.createIndex('adjacency_list_child_tid_idx').on('adjacency_list').column('childTid').execute()

    await db.schema
      .createTable('catalog_object')
      .addColumn('tid', 'varchar', (col) => col.primaryKey())
      .addColumn('uri', 'varchar', (col) => col.unique())
      .addColumn('externalId', 'varchar')
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('type', 'varchar', (col) => col.notNull())
      .addColumn('data', 'jsonb', (col) => col.notNull())
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
      .addColumn('parentGroup', 'varchar', (col) => col.references('merchant_group.uri').notNull())
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
  parentType: CatalogObjectType,
  children: { childTid: string; childType: CatalogObjectType }[],
) => {
  try {
    // TODO this is not very efficient but whatevs
    await db.transaction().execute(async (tx) => {
      await tx.deleteFrom('adjacency_list').where('parentTid', '=', parentTid).execute()
      await tx
        .insertInto('adjacency_list')
        .values(
          children.map((child) => ({
            parentTid,
            parentType,
            childTid: child.childTid,
            childType: child.childType,
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

function getCatalogObjectAdjacencyList(
  catalogObjectData: CatalogObjectData,
): Pick<AdjacencyList, 'childTid' | 'childType'>[] {
  let adjacencyList: Pick<AdjacencyList, 'childTid' | 'childType'>[] = []

  // TODO not great to be using the lexicon type here, but maybe it's the right thing? What is consistent?
  switch (catalogObjectData.$type) {
    case 'xyz.noshdelivery.v0.catalog.catalog': {
      adjacencyList =
        catalogObjectData.collections?.map((collection) => ({
          childTid: collection,
          childType: 'collection',
        })) || []
      break
    }
    case 'xyz.noshdelivery.v0.catalog.collection': {
      adjacencyList =
        catalogObjectData.items?.map((item) => ({
          childTid: item,
          childType: 'item',
        })) || []
      break
    }
    case 'xyz.noshdelivery.v0.catalog.item': {
      adjacencyList = []
      break
    }
    case 'xyz.noshdelivery.v0.catalog.modifierGroup': {
      adjacencyList = []
      break
    }
    case 'xyz.noshdelivery.v0.catalog.modifier': {
      adjacencyList = []
      break
    }
  }
  return adjacencyList
}

export const upsertCatalogObjectRecord = async (db: Database, uri: string, record: CatalogObjectData) => {
  const tid = tidFromUri(uri)
  const type = lexiconTypeToCatalogObjectType[typeFromUri(uri) as LexiconType]
  const data = JSON.stringify(record)

  await db
    .insertInto('catalog_object')
    .values({
      tid,
      uri,
      name: record.name,
      type,
      data,
    })
    .execute()
  const adjacencyList = getCatalogObjectAdjacencyList(record)

  await updateAdjacencyList(db, tid, type, adjacencyList)
}

export const getCatalogObject = async (db: Database, tid: string): Promise<CatalogObject> => {
  const object = await db.selectFrom('catalog_object').where('tid', '=', tid).selectAll().executeTakeFirst()
  if (!object) {
    throw new InvalidRequestError('Catalog object not found')
  }
  return {
    ...object,
    data: JSON.parse(object.data),
  }
}

export const findDescendantsOfType = async (
  db: Database,
  objectIds: string[],
  objectTypes: CatalogObjectType[],
): Promise<Record<CatalogObjectType, CatalogObject[]>> => {
  const result = await db
    .withRecursive('descendants', (cte) =>
      cte
        .selectFrom('catalog_object')
        .select(['tid', 'type'])
        .where('tid', 'in', objectIds)
        .unionAll(
          cte
            .selectFrom('descendants')
            .innerJoin('adjacency_list', (join) =>
              join
                .onRef('adjacency_list.parentTid', '=', 'descendants.tid')
                .on('adjacency_list.parentType', '=', 'descendants.type' as CatalogObjectType),
            )
            .innerJoin('catalog_object', (join) =>
              join
                .onRef('catalog_object.tid', '=', 'adjacency_list.childTid')
                .on('catalog_object.type', '=', 'adjacency_list.childType' as CatalogObjectType),
            )
            .select(['catalog_object.tid', 'catalog_object.type']),
        ),
    )
    .selectFrom('descendants')
    .innerJoin('catalog_object', 'catalog_object.tid', 'descendants.tid')
    .selectAll('catalog_object')
    .execute()

  // Group results by type
  const idsByType = result.reduce(
    (acc, { tid, type }) => {
      if (!acc[type as CatalogObjectType]) {
        acc[type as CatalogObjectType] = []
      }
      acc[type as CatalogObjectType].push(tid)
      return acc
    },
    {} as Record<CatalogObjectType, string[]>,
  )

  // Fetch all catalog objects for the found IDs, grouped by type
  const finalResult: Record<CatalogObjectType, CatalogObject[]> = objectTypes.reduce(
    (acc, type) => {
      acc[type] = []
      return acc
    },
    {} as Record<CatalogObjectType, CatalogObject[]>,
  )

  // Fetch objects for each type
  await Promise.all(
    Object.entries(idsByType).map(async ([type, ids]) => {
      if (ids.length > 0) {
        const objects = await db.selectFrom('catalog_object').where('tid', 'in', ids).selectAll().execute()

        finalResult[type as CatalogObjectType] = objects.map((obj) => ({
          ...obj,
          data: JSON.parse(obj.data),
        }))
      }
    }),
  )

  return finalResult
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
            .innerJoin('adjacency_list', (join) =>
              join
                .onRef('adjacency_list.childTid', '=', 'item_ancestors.parentTid')
                .on('adjacency_list.parentType', '=', 'catalog'),
            )
            .select(['item_ancestors.childTid', 'adjacency_list.parentTid']),
        ),
    )
    .selectFrom('item_ancestors')
    .innerJoin('catalog_object', 'catalog_object.tid', 'item_ancestors.parentTid')
    .select(['item_ancestors.childTid as itemTid', 'catalog_object.tid', 'catalog_object.name'])
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

export const findMerchantGroupByTid = async (db: Database, tid: string): Promise<MerchantGroup | undefined> => {
  return await db.selectFrom('merchant_group').where('tid', '=', tid).selectAll().executeTakeFirst()
}

export const findAllMerchantGroups = async (db: Database): Promise<MerchantGroup[]> => {
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
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      console.log('merchant group already exists', group.uri)
    } else {
      console.error('error upserting merchant group', error)
      throw error
    }
  }
}

export const findMerchantLocationsByGroupTid = async (db: Database, tid: string): Promise<MerchantLocation[]> => {
  const groupUri = (await findMerchantGroupByTid(db, tid))?.uri
  if (!groupUri) {
    throw new InvalidRequestError('Group not found')
  }
  return await db.selectFrom('merchant_location').where('parentGroup', '=', groupUri).selectAll().execute()
}

// TODO the duplication of the above function and this one needs to be dealt with
export const findMerchantLocationsByGroupUri = async (db: Database, groupUri: string): Promise<MerchantLocation[]> => {
  return await db.selectFrom('merchant_location').where('parentGroup', '=', groupUri).selectAll().execute()
}

export const getMerchantLocation = async (db: Database, tid: string) => {
  return await db.selectFrom('merchant_location').where('tid', '=', tid).selectAll().executeTakeFirst()
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
  catalogs: CatalogObject[]
  collections: CatalogObject[]
  items: CatalogObject[]
}> => {
  return {
    catalogs: [],
    collections: [],
    items: [],
  }
}
