
import {TID} from '@atproto/common'
import { InvalidRequestError, UpstreamFailureError } from '@atproto/xrpc-server'
import { XyzNoshdeliveryV0CatalogCatalog, XyzNoshdeliveryV0CatalogCollection, XyzNoshdeliveryV0CatalogItem, XyzNoshdeliveryV0CatalogModifier, XyzNoshdeliveryV0CatalogModifierGroup } from '@nosh/lexicon'
import { AppContext } from '#/context'
import { Server } from '#/lexicon'
import { getSessionAgent } from '#/session'
import { getCatalogObject, upsertCatalogObjectRecord } from '#/db'
import { tidFromUri } from '#/utils/uri'
import { typeToLexiconType } from '#/types'

const typeToValidator = {
  catalog: XyzNoshdeliveryV0CatalogCatalog.validateRecord,
  collection: XyzNoshdeliveryV0CatalogCollection.validateRecord,
  item: XyzNoshdeliveryV0CatalogItem.validateRecord,
  modifierGroup: XyzNoshdeliveryV0CatalogModifierGroup.validateRecord,
  modifier: XyzNoshdeliveryV0CatalogModifier.validateRecord,
}

export default function (server: Server, ctx: AppContext) {
  server.xyz.noshdelivery.v0.catalog.putCatalogObject({
    handler: async ({ input }) => {
      const agent = await getSessionAgent()
      agent.assertDid

      const rkey = TID.nextStr()

      const lexiconType = typeToLexiconType[input.body.type]
      const record = {
        ...input.body.data,
        $type: lexiconType,
      }

      const validator = typeToValidator[input.body.type]
      const validation = validator(record)
      if (!validation.success) {
        throw new InvalidRequestError('Invalid catalog record')
      }

      try {
        const response = await agent.com.atproto.repo.putRecord({
          repo: agent.assertDid,
          collection: lexiconType,
          rkey,
          record: validation.value,
          validate: false,
        })

        await upsertCatalogObjectRecord(ctx.db, response.data.uri, validation.value)

        const catalogObject = await getCatalogObject(ctx.db, tidFromUri(response.data.uri))

        return {
          encoding: 'application/json',
          body: {
            catalogObject: catalogObject.data
          },
        }
      } catch (err) {
        throw new UpstreamFailureError(`Failed to write record: ${err}`)
      }
    },
  })
}
