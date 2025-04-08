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
}

export interface MerchantGroup {
  uri: string
  externalId?: string
  name: string
  logo?: string
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
  media?: MediaJson
  groupUri: string
}

// Migrations

const migrations: Record<string, Migration> = {}

const migrationProvider: MigrationProvider = {
  async getMigrations() {
    return migrations
  },
}

migrations['001'] = {
  async up(db: Kysely<unknown>) {
    await db.schema
      .createTable('merchant_group')
      .addColumn('uri', 'varchar', (col) => col.primaryKey())
      .addColumn('externalId', 'varchar')
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('logo', 'varchar')
      .execute()
    await db.schema
      .createTable('merchant_location')
      .addColumn('uri', 'varchar', (col) => col.primaryKey())
      .addColumn('externalId', 'varchar', (col) => col.notNull())
      .addColumn('name', 'varchar', (col) => col.notNull())
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
