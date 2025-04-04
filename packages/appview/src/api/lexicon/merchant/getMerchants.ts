import { AppContext } from '#/context'
import { getSessionAgent } from '#/session'
import { UpstreamFailureError } from '@atproto/xrpc-server'
import { Server } from '#/lexicon'
import { XyzNoshdeliveryMerchantMerchant } from '@nosh/lexicon'

export default function (server: Server, ctx: AppContext) {
  server.xyz.noshdelivery.merchant.getMerchants({
    handler: async ({ params }) => {
      const agent = await getSessionAgent()

      let names: string[]
      try {
        const {data} = await agent.com.atproto.repo.listRecords({
          repo: 'ivan.shored.boats',
          collection: 'xyz.noshdelivery.merchant.merchant',
        })
        console.log('listRecords', data.records[0].value)
        names = data.records.map((record) => (record.value as XyzNoshdeliveryMerchantMerchant.Record).name)
      } catch (err) {
        throw new UpstreamFailureError('Failed to write record')
      }

      return {
        encoding: 'application/json',
        body: {
          merchants: names || [],
        },
      }
    },
  })
}
