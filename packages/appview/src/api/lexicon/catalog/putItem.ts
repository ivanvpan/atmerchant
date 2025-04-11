
import {TID} from '@atproto/common'
import { InternalServerError, InvalidRequestError, UpstreamFailureError } from '@atproto/xrpc-server'
import { XyzNoshdeliveryV0CatalogItem } from '@nosh/lexicon'
import { AppContext } from '#/context'
import { Server } from '#/lexicon'
import { getSessionAgent } from '#/session'
import { schemaDict } from '#/lexicon/lexicons'
import { findItemByTid, upsertItemRecord } from '#/db'
import { dbItemToItemView } from '#/controllers/catalog'
import { tidFromUri } from '#/utils/uri'

export default function (server: Server, ctx: AppContext) {
  server.xyz.noshdelivery.v0.catalog.putItem({
    handler: async ({ input }) => {
      const agent = await getSessionAgent()
      agent.assertDid

      const rkey = TID.nextStr()

      const record = {
        $type: schemaDict.XyzNoshdeliveryV0CatalogItem.id,
        ...input.body,
      }

      const validation = XyzNoshdeliveryV0CatalogItem.validateRecord(record)

      if (!validation.success) {
        throw new InvalidRequestError('Invalid catalog record')
      }

      try {
        const response = await agent.com.atproto.repo.putRecord({
          repo: agent.assertDid,
          collection: schemaDict.XyzNoshdeliveryV0CatalogItem.id,
          rkey,
          record: validation.value,
          validate: false,
        })

        // TODO Adding the $type is redundant, maybe take that param out in the DB functions
        await upsertItemRecord(ctx.db, response.data.uri, {
          $type: schemaDict.XyzNoshdeliveryV0CatalogItem.id,
          ...input.body,
        })

        const dbItem = await findItemByTid(ctx.db, tidFromUri(response.data.uri)) 
        if (!dbItem) {
          throw new InternalServerError('Failed to find item')
        }

        return {
          encoding: 'application/json',
          body: {
            item: dbItemToItemView(dbItem),
          },
        }
      } catch (err) {
        throw new UpstreamFailureError(`Failed to write record: ${err}`)
      }
    },
  })
}
