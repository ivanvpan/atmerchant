import {TID} from '@atproto/common'
import { InvalidRequestError, UpstreamFailureError } from '@atproto/xrpc-server'
import { XyzNoshdeliveryV0MerchantLocation } from '@nosh/lexicon'
import { AppContext } from '#/context'
import { Server } from '#/lexicon'
import { getSessionAgent } from '#/session'
import { schemaDict } from '#/lexicon/lexicons'
import { findMerchantLocationsByGroupUri, upsertMerchantLocationRecord } from '#/db'
import { dbMerchantLocationToMerchantLocationView } from '#/controllers/merchant'


export default function (server: Server, ctx: AppContext) {
  server.xyz.noshdelivery.v0.merchant.putLocation({
    handler: async ({ input }) => {
      ctx.logger.info('inside handler!')

      const agent = await getSessionAgent()
      agent.assertDid

      const rkey = TID.nextStr()
      const record = {
        $type: schemaDict.XyzNoshdeliveryV0MerchantLocation.id,
        ...input.body,
      }

      console.log('validating record', record)
      const validation = XyzNoshdeliveryV0MerchantLocation.validateRecord(record)

      if (!validation.success) {
        throw new InvalidRequestError('Invalid group record')
      }

      // TODO ensure uniqueness constraints first
      try {
        const response = await agent.com.atproto.repo.putRecord({
          repo: agent.assertDid,
          collection: schemaDict.XyzNoshdeliveryV0MerchantGroup.id,
          rkey,
          record: validation.value,
          validate: false,
        })
        console.log('uri', response.data.uri)

        await upsertMerchantLocationRecord(ctx.db, response.data.uri, {
          $type: schemaDict.XyzNoshdeliveryV0MerchantLocation.id,
          ...input.body,
        })

        return {
          encoding: 'application/json',
          body: {
            locations: (await findMerchantLocationsByGroupUri(ctx.db, input.body.parentGroup)).map(dbMerchantLocationToMerchantLocationView),
          },
        }
      } catch (err) {
        throw err
        throw new UpstreamFailureError(`Failed to write record: ${err}`)
      }
    },
  })
}
