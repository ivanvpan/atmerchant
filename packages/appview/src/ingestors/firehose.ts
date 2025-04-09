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

      // {
      //   seq: 16,
      //   time: '2025-04-09T01:01:31.153Z',
      //   commit: CID(bafyreicbf5hymwzoopcjtai5zz5bhmg22qmmb2guauq3p2nvvdafm7muku),
      //   blocks: BlockMap {
      //     map: Map(7) {
      //       'bafyreib3hfuonzvtrhkokuf7cnnit3la5cc4itiwhtfnvz6h5awpion4iy' => [Uint8Array],
      //       'bafyreiasjiamki77xotymbrsxg6eav2sbnt53v23376pq4e3ejt3bj2zbu' => [Uint8Array],
      //       'bafyreiglx2wup3wign5fha6uf5qgm7mf6z42eskd6umdcxqtufj737krom' => [Uint8Array],
      //       'bafyreici4uad7hm7oud3ubejg7h6deasyr3qzn7m7wck56eav55tyvwy2e' => [Uint8Array],
      //       'bafyreidn2usyunuiowvyyznha3xr7gqnbpes7rfvbgtjljboforwrd6iji' => [Uint8Array],
      //       'bafyreigca22e4mu3kzzj5ud5bqyijmq323nbpnefbveywnzhtepwpiikee' => [Uint8Array],
      //       'bafyreicbf5hymwzoopcjtai5zz5bhmg22qmmb2guauq3p2nvvdafm7muku' => [Uint8Array]
      //     }
      //   },
      //   rev: '3lmds3c53tc2y',
      //   uri: AtUri {
      //     hash: '',
      //     host: 'did:plc:ufa7rl6agtfdqje6bant3wsb',
      //     pathname: '/xyz.noshdelivery.v0.merchant.group/3lmds3bomws2e',
      //     searchParams: URLSearchParams {}
      //   },
      //   did: 'did:plc:ufa7rl6agtfdqje6bant3wsb',
      //   collection: 'xyz.noshdelivery.v0.merchant.group',
      //   rkey: '3lmds3bomws2e',
      //   event: 'create',
      //   cid: CID(bafyreigca22e4mu3kzzj5ud5bqyijmq323nbpnefbveywnzhtepwpiikee),
      //   record: {
      //     name: 'More stuff ',
      //     '$type': 'xyz.noshdelivery.v0.merchant.group'
      //   }
      // }

      // Watch for write events
      //   if (evt.event === 'create' || evt.event === 'update') {
      //     const now = new Date()
      //     const record = evt.record

      //     // If the write is a valid status update
      //     if (
      //       evt.collection === 'xyz.statusphere.status' &&
      //       XyzStatusphereStatus.isRecord(record)
      //     ) {
      //       const validatedRecord = XyzStatusphereStatus.validateRecord(record)
      //       if (!validatedRecord.success) return
      //       // Store the status in our SQLite
      //       await db
      //         .insertInto('status')
      //         .values({
      //           uri: evt.uri.toString(),
      //           authorDid: evt.did,
      //           status: validatedRecord.value.status,
      //           createdAt: validatedRecord.value.createdAt,
      //           indexedAt: now.toISOString(),
      //         })
      //         .onConflict((oc) =>
      //           oc.column('uri').doUpdateSet({
      //             status: validatedRecord.value.status,
      //             indexedAt: now.toISOString(),
      //           }),
      //         )
      //         .execute()
      //     }
      //   } else if (
      //     evt.event === 'delete' &&
      //     evt.collection === 'xyz.statusphere.status'
      //   )
      //     // Remove the status from our SQLite
      //     await db
      //       .deleteFrom('status')
      //       .where('uri', '=', evt.uri.toString())
      //       .execute()
    },
    onError: (err: Error) => {
      logger.error({ err }, 'error on firehose ingestion')
    },
    filterCollections: ['xyz.noshdelivery.v0.merchant.group'],
    excludeIdentity: true,
    excludeAccount: true,
  })
}
