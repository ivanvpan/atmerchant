import { IdResolver } from '@atproto/identity'
import { CommitEvt, Firehose, Event, MemoryRunner } from '@atproto/sync'
import pino from 'pino'

import { upsertMerchantGroupRecord, type Database } from '#/db'
import { XyzNoshdeliveryV0MerchantGroup } from '@nosh/lexicon'

function uriFromEvent(evt: CommitEvt) {
  return `at://${evt.uri.host}${evt.uri.pathname}`
}

export async function createFirehoseIngester(
  repoDid: string,
  service: string,
  db: Database,
) {
  const logger = pino({ name: 'firehose ingestion' })

  const cursor = await db
    .selectFrom('cursor')
    .where('id', '=', 1)
    .select('seq')
    .executeTakeFirst()

  logger.info(`start cursor: ${cursor?.seq}`)

  const runner = new MemoryRunner({
    startCursor: cursor?.seq || 0,
    setCursor: async (seq) => {
      await db.updateTable('cursor').set({ seq }).where('id', '=', 1).execute()
    },
  })

  const idResolver = new IdResolver()

  return new Firehose({
    idResolver,
    runner,
    service,
    handleEvent: async (evt: Event) => {
      console.log('evt', evt.seq)
      if (evt.did !== repoDid) {
        return
      }

      if (evt.event === 'create') {
        if (evt.collection === 'xyz.noshdelivery.v0.merchant.group') {
          const record = evt.record as XyzNoshdeliveryV0MerchantGroup.Record
          const validatedRecord =
            XyzNoshdeliveryV0MerchantGroup.validateRecord(record)
          if (!validatedRecord.success) return
          await upsertMerchantGroupRecord(db, uriFromEvent(evt), record)
        }
      }
    },
    onError: (err: Error) => {
      logger.error({ err }, 'error on firehose ingestion')
    },
    filterCollections: ['xyz.noshdelivery.v0.merchant.group'],
    excludeIdentity: true,
    excludeAccount: true,
  })
}
