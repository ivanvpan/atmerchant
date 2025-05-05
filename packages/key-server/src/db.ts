import { XyzNoshdeliveryV0MerchantGroup, XyzNoshdeliveryV0MerchantLocation } from '@nosh/lexicon'
import SqliteDb from 'better-sqlite3'
import {
  Kysely,
  Migration,
  MigrationProvider,
  Migrator,
  sql,
  SqliteDialect,
  // ParseJSONResultsPlugin
} from 'kysely'

export interface Keypair {
  id: number
  created_at: string
  address: string
  public_key: string
  private_key: string
  role: 'session' | 'admin'
  type: 'p256'
  expiry?: number
}
interface DatabaseSchema {
  keypairs: Keypair
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
      .createTable('keypairs')
      .ifNotExists()
      .addColumn('id', 'integer', (col) => col.autoIncrement())
      .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
      .addColumn('address', 'text', (col) => col.unique().notNull())
      .addColumn('public_key', 'text', (col) => col.notNull())
      .addColumn('private_key', 'text', (col) => col.notNull())
      .addColumn('role', 'text', (col) => col.notNull())
      .addColumn('type', 'text', (col) => col.notNull())
      .addColumn('expiry', 'integer', (col) => col.notNull())
      .execute()
  },
  async down(db: Kysely<unknown>) {},
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

export function getKeypair(db: Database, address: string) {
  return db.selectFrom('keypairs').where('address', '=', address).selectAll().executeTakeFirst()
}
export function createKeypair(db: Database, keypair: Pick<Keypair, 'address' | 'expiry'>): Promise<Keypair> {}
