import { InvalidRequestError, UpstreamFailureError } from '@atproto/xrpc-server'
import { XyzNoshdeliveryV0CatalogCatalog, XyzNoshdeliveryV0MerchantLocation } from '@nosh/lexicon'
import { AppContext } from '#/context'
import { Server } from '#/lexicon'
import { getSessionAgent } from '#/session'
import { schemaDict } from '#/lexicon/lexicons'
import { findMerchantLocationsByGroupTid, findMerchantLocationsByGroupUri, upsertMerchantLocationRecord } from '#/db'
import { dbMerchantLocationToMerchantLocationView } from '#/controllers/merchant'


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
      } catch (err) {
        throw err
        throw new UpstreamFailureError(`Failed to write record: ${err}`)
      }
  })