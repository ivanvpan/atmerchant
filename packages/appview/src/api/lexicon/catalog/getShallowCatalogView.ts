import { AppContext } from '#/context'
import { Server } from '#/lexicon'
import { dbMerchantGroupToMerchantGroupView } from '#/controllers/merchant'
import { findAllMerchantGroups, getShallowCatalogsForLocationUri } from '#/db'
import { dbItemToItemView } from '#/controllers/catalog'
import { dbCollectionToCollectionView } from '#/controllers/catalog'
import { dbCatalogToCatalogView } from '#/controllers/catalog'
import { InvalidRequestError } from '@atproto/xrpc-server'

export default function (server: Server, ctx: AppContext) {
  server.xyz.noshdelivery.v0.catalog.getShallowCatalogView({
    handler: async ({ params }) => {
      const { locationUri } = params
      if (!locationUri) {
        throw new InvalidRequestError('locationUri is required')
      }
      const { catalogs, collections, items } = await getShallowCatalogsForLocationUri(ctx.db, locationUri)
      return {
        encoding: 'application/json',
        body: {
          merchantLocation: locationUri,
          shallowCatalogView: {
            catalogs: catalogs.map(dbCatalogToCatalogView),
            collections: collections.map(dbCollectionToCollectionView),
            items: items.map(dbItemToItemView),
          },
        },
        }
      }
    })
  }