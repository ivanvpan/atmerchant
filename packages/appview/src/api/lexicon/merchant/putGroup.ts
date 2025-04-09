import {TID} from '@atproto/common'
import { InvalidRequestError, UpstreamFailureError } from '@atproto/xrpc-server'
import { XyzNoshdeliveryV0MerchantGroup } from '@nosh/lexicon'
import { AppContext } from '#/context'
import { Server } from '#/lexicon'
import { getSessionAgent } from '#/session'
import { schemaDict } from '#/lexicon/lexicons'
import { findAllMerchantGroups, upsertMerchantGroupRecord } from '#/db'
import { dbMerchantGroupToMerchantGroupView } from '#/controllers/merchant'


export default function (server: Server, ctx: AppContext) {
  ctx.logger.info('Hello!')
  server.xyz.noshdelivery.v0.merchant.putGroup({
    handler: async ({ input }) => {
      ctx.logger.info('inside handler!')

      const agent = await getSessionAgent()
      agent.assertDid

      const rkey = TID.nextStr()
      const record = {
        $type: schemaDict.XyzNoshdeliveryV0MerchantGroup.id,
        ...input.body,
      }

      console.log('validating record', record)
      const validation = XyzNoshdeliveryV0MerchantGroup.validateRecord(record)

      if (!validation.success) {
        throw new InvalidRequestError('Invalid group record')
      }

      try {
        const response = await agent.com.atproto.repo.putRecord({
          repo: agent.assertDid,
          collection: schemaDict.XyzNoshdeliveryV0MerchantGroup.id,
          rkey,
          record: validation.value,
          validate: false,
        })
        console.log('uri', response.data.uri)

        await upsertMerchantGroupRecord(ctx.db, response.data.uri, {
          $type: schemaDict.XyzNoshdeliveryV0MerchantGroup.id,
          ...input.body,
        })

        return {
          encoding: 'application/json',
          body: {
            groups: (await findAllMerchantGroups(ctx.db)).map(dbMerchantGroupToMerchantGroupView),
          },
        }
      } catch (err) {
        throw new UpstreamFailureError('Failed to write record')
      }
    },
  })
}
