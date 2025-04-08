import type { pino } from 'pino'
import { Database } from './db'

export type AppContext = {
  db: Database
  // ingester: Firehose | Jetstream<any>
  logger: pino.Logger
  // oauthClient: OAuthClient
  // resolver: BidirectionalResolver
}
