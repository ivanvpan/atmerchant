
import {TID} from '@atproto/common'
import { InternalServerError, InvalidRequestError, UpstreamFailureError } from '@atproto/xrpc-server'
import { XyzNoshdeliveryV0CatalogCatalog } from '@nosh/lexicon'
import { AppContext } from '#/context'
import { Server } from '#/lexicon'
import { getSessionAgent } from '#/session'
import { schemaDict } from '#/lexicon/lexicons'
import { findCollectionByTid, upsertCollectionRecord } from '#/db'
import { dbCollectionToCollectionView } from '#/controllers/catalog'
import { tidFromUri } from '#/utils/uri'

export default function (server: Server, ctx: AppContext) {
  server.xyz.noshdelivery.v0.catalog.putCollection({
    handler: async ({ input }) => {
      const agent = await getSessionAgent()
      agent.assertDid

      const rkey = TID.nextStr()

      const record = {
        $type: schemaDict.XyzNoshdeliveryV0CatalogCollection.id,
        ...input.body,
      }

      const validation = XyzNoshdeliveryV0CatalogCatalog.validateRecord(record)

      if (!validation.success) {
        throw new InvalidRequestError('Invalid catalog record')
      }

      try {
        const response = await agent.com.atproto.repo.putRecord({
          repo: agent.assertDid,
          collection: schemaDict.XyzNoshdeliveryV0CatalogCatalog.id,
          rkey,
          record: validation.value,
          validate: false,
        })

        await upsertCollectionRecord(ctx.db, response.data.uri, {
          $type: schemaDict.XyzNoshdeliveryV0CatalogCollection.id,
          ...input.body,
        })

        const dbCollection = await findCollectionByTid(ctx.db, tidFromUri(response.data.uri)) 
        if (!dbCollection) {
          throw new InternalServerError('Failed to find collection')
        }

        return {
          encoding: 'application/json',
          body: {
            collection: dbCollectionToCollectionView(dbCollection),
          },
        }
      } catch (err) {
        throw new UpstreamFailureError(`Failed to write record: ${err}`)
      }
    },
  })
}
