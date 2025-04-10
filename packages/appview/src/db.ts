import {
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

export type DatabaseSchema = {
  merchant_group: MerchantGroup
  merchant_location: MerchantLocation
  cursor: Cursor
}

export type Cursor = {
  id: number
  seq: number
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
      .values([
        { id: 1, seq: 0 },
        { id: 2, seq: 0 },
      ])
      .execute()
  },
  async down(db: Kysely<unknown>) {
    await db.schema.dropTable('cursor').execute()
  },
}

migrations['001'] = {
  async up(db: Kysely<unknown>) {
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
