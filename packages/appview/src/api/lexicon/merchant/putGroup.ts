import {TID} from '@atproto/common'
import { InvalidRequestError, UpstreamFailureError } from '@atproto/xrpc-server'
import { XyzNoshdeliveryV0MerchantGroup } from '@nosh/lexicon'
import { AppContext } from '#/context'
import { Server } from '#/lexicon'
import { getSessionAgent } from '#/session'


export default function (server: Server, ctx: AppContext) {
  ctx.logger.info('Hello!')
  server.xyz.noshdelivery.v0.merchant.putGroup({
    handler: async ({ input }) => {
      ctx.logger.info('inside handler!')

      const agent = await getSessionAgent()
      agent.assertDid


      const rkey = TID.nextStr()
      const record = {
        $type: 'xyz.noshdelivery.merchant.group',
        ...input.body,
        createdAt: new Date().toISOString(),
      }

      const validation = XyzNoshdeliveryV0MerchantGroup.validateRecord(record)

      if (!validation.success) {
        throw new InvalidRequestError('Invalid status')
      }

      try {
        const response = await agent.com.atproto.repo.putRecord({
          repo: agent.assertDid,
          collection: 'xyz.noshdelivery.merchant.group',
          rkey,
          record: validation.value,
          validate: false,
        })
        console.log('uri', response.data.uri)

        // TODO check for existing group with name/externalId and throw if found
        await ctx.db.insertInto('merchant_group').values({
          uri: response.data.uri,
          externalId: input.body.externalId,
          name: input.body.name
        }).execute()

        return {
          encoding: 'application/json',
          body: {
            group: {
              uri: response.data.uri,
              externalId: input.body.externalId,
              logo: undefined,
              name: input.body.name,
            },
          },
        }
      } catch (err) {
        throw new UpstreamFailureError('Failed to write record')
      }
    },
  })
}
