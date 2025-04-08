import { AppContext } from '#/context'
import { getSessionAgent } from '#/session'
import { UpstreamFailureError } from '@atproto/xrpc-server'
import { Server } from '#/lexicon'
import { XyzNoshdeliveryV0MerchantGroup, XyzNoshdeliveryV0MerchantListGroups } from '@nosh/lexicon'
import { schemaDict } from '@nosh/lexicon/src/lexicons'

export interface Record {
  $type?: 'com.atproto.repo.listRecords#record'
  uri: string
  cid: string
  value: XyzNoshdeliveryV0MerchantGroup.Record
}

export default function (server: Server, ctx: AppContext) {
  server.xyz.noshdelivery.v0.merchant.listGroups({
    handler: async ({ req, res }) => {
      const agent = await getSessionAgent(req, res)

      try {
        const {data} = await agent.com.atproto.repo.listRecords({
          repo: 'ivan.shored.boats',
          collection: schemaDict.XyzNoshdeliveryV0MerchantGroup.id,
        })
        console.log('listRecords', JSON.stringify(data.records))
        const groupRecords = data.records.map((rec) => {
          const record = rec as Record
          return {
            uri: record.uri,
            externalId: record.value.externalId,
            name: record.value.name,
            // logo: record.value.logo, // This needs to be thumbnailed, etc.
          }
        })

        return {
          encoding: 'application/json',
          body: {
            // groups: data.records.map((record) => record.value),
            groups: groupRecords,
          },
        }
      } catch (err) {
        throw new UpstreamFailureError(`Failed to list records: ${err}`)
      }
    },
  })
}
