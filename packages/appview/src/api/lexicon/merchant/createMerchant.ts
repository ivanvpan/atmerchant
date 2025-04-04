import {TID} from '@atproto/common'
import { InvalidRequestError, UpstreamFailureError } from '@atproto/xrpc-server'
import { XyzNoshdeliveryMerchantMerchant } from '@nosh/lexicon'
import { AppContext } from '#/context'
import { Server } from '#/lexicon'
import { getSessionAgent } from '#/session'


export default function (server: Server, ctx: AppContext) {
  ctx.logger.info('Hello!')
  server.xyz.noshdelivery.merchant.createMerchant({
    handler: async ({ req, res }) => {
      ctx.logger.info('inside handler!')

      const agent = await getSessionAgent()
      agent.assertDid

      const newName = String(Math.random())

      const rkey = TID.nextStr()
      const record = {
        $type: 'xyz.noshdelivery.merchant.merchant',
        name: newName,
        createdAt: new Date().toISOString(),
      }

      const validation = XyzNoshdeliveryMerchantMerchant.validateRecord(record)

      if (!validation.success) {
        throw new InvalidRequestError('Invalid status')
      }

      try {
        const response = await agent.com.atproto.repo.putRecord({
          repo: agent.assertDid,
          collection: 'xyz.noshdelivery.merchant.merchant',
          rkey,
          record: validation.value,
          validate: false,
        })
        console.log('uri', response.data.uri)
      } catch (err) {
        throw new UpstreamFailureError('Failed to write record')
      }

      return {
        encoding: 'application/json',
        body: {
          name: "Test",
        },
      }
    },
  })
}
