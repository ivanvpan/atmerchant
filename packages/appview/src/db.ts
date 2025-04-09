import { XyzNoshdeliveryV0MerchantGroup } from '@nosh/lexicon'
import SqliteDb from 'better-sqlite3'
import {
  Kysely,
  Migration,
  MigrationProvider,
  Migrator,
  SqliteDialect,
  // ParseJSONResultsPlugin
} from 'kysely'

// Types

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
  uri: string
  externalId?: string | null
  name: string
  logo?: string | null
}

type AddressJson = string
type MediaJson = string
export type MerchantLocation = {
  uri: string
  externalId: string
  name: string
  address: AddressJson
  timezone: string
  latitude: number
  longitude: number
  media?: MediaJson | null
  groupUri: string
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
      .addColumn('uri', 'varchar', (col) => col.primaryKey())
      .addColumn('externalId', 'varchar', (col) => col.unique())
      .addColumn('name', 'varchar', (col) => col.notNull().unique())
      .addColumn('logo', 'varchar')
      .execute()
    await db.schema
      .createTable('merchant_location')
      .addColumn('uri', 'varchar', (col) => col.primaryKey())
      .addColumn('externalId', 'varchar', (col) => col.unique())
      .addColumn('name', 'varchar', (col) => col.notNull().unique())
      .addColumn('address', 'jsonb', (col) => col.notNull())
      .addColumn('timezone', 'varchar', (col) => col.notNull())
      .addColumn('latitude', 'real', (col) => col.notNull())
      .addColumn('longitude', 'real', (col) => col.notNull())
      .addColumn('media', 'jsonb')
      .addColumn('groupUri', 'varchar', (col) =>
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

export const upsertMerchantGroupRecord = async (
  db: Database,
  uri: string,
  record: XyzNoshdeliveryV0MerchantGroup.Record,
) => {
  const group = {
    uri,
    name: record.name,
    externalId: record.externalId,
    // logo: record.logo, // TODO: save logo
  }
  try {
    await db
      .insertInto('merchant_group')
      .values(group)
      .onConflict((oc) => oc.columns(['uri']).doUpdateSet(group)) // TODO not working!
      .onConflict((oc) => oc.columns(['name']).doUpdateSet(group))
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
    }
  }
}
