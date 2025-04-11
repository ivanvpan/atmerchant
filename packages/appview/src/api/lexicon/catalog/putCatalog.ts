import {TID} from '@atproto/common'
import { InternalServerError, InvalidRequestError, UpstreamFailureError } from '@atproto/xrpc-server'
import { XyzNoshdeliveryV0CatalogCatalog, XyzNoshdeliveryV0MerchantLocation } from '@nosh/lexicon'
import { AppContext } from '#/context'
import { Server } from '#/lexicon'
import { getSessionAgent } from '#/session'
import { schemaDict } from '#/lexicon/lexicons'
import { findCatalogByTid, upsertCatalogRecord } from '#/db'
import { dbCatalogToCatalogView } from '#/controllers/catalog'
import { tidFromUri } from '#/utils/uri'

export default function (server: Server, ctx: AppContext) {
  server.xyz.noshdelivery.v0.catalog.putCatalog({
    handler: async ({ input }) => {
      const agent = await getSessionAgent()
      agent.assertDid

      const rkey = TID.nextStr()

      const record = {
        $type: schemaDict.XyzNoshdeliveryV0CatalogCatalog.id,
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

        await upsertCatalogRecord(ctx.db, response.data.uri, {
          $type: schemaDict.XyzNoshdeliveryV0CatalogCatalog.id,
          ...input.body,
        })

        const dbCatalog = await findCatalogByTid(ctx.db, tidFromUri(response.data.uri)) 
        if (!dbCatalog) {
          throw new InternalServerError('Failed to find catalog')
        }

        return {
          encoding: 'application/json',
          body: {
            catalog: dbCatalogToCatalogView(dbCatalog),
          },
        }
      } catch (err) {
        throw new UpstreamFailureError(`Failed to write record: ${err}`)
      }
    },
  })
}
