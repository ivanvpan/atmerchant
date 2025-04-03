import type { pino } from 'pino'

export type AppContext = {
  // db: Database
  // ingester: Firehose | Jetstream<any>
  logger: pino.Logger
  // oauthClient: OAuthClient
  // resolver: BidirectionalResolver
}
