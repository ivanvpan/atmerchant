import { AppContext } from '#/context'
import { Server } from '#/lexicon'
import { findAllCatalogsContainingItems, getItems, getModifierGroups, getModifiers, getCatalogs, getMerchantLocation } from '#/db'
import { dbItemToItemView, dbModifierGroupToModifierGroupView, dbModifierToModifierView } from '#/controllers/catalog'
import { dbCatalogToCatalogView } from '#/controllers/catalog'
import { InvalidRequestError } from '@atproto/xrpc-server'

export default function (server: Server, ctx: AppContext) {
  server.xyz.noshdelivery.v0.catalog.getItemsDetails({
    handler: async ({ params }) => {
      const { itemIds } = params
      if (!itemIds) {
        throw new InvalidRequestError('itemIds is required')
      }
      const items = await getItems(ctx.db, itemIds)
      const merchantLocation = await getMerchantLocation(ctx.db, params.merchantLocation)
      if (!merchantLocation) {
        throw new InvalidRequestError('merchantLocation not found')
      }
      const modifierGroups = await getModifierGroups(ctx.db, items.flatMap(item => item.modifierGroups))
      const modifiers = await getModifiers(ctx.db, modifierGroups.flatMap(group => group.modifiers))
      const itemCatalogIds = await findAllCatalogsContainingItems(ctx.db, items.map(item => item.tid))
      const catalogs = (await getCatalogs(ctx.db, params.merchantLocation)).map(dbCatalogToCatalogView)
      const itemsToAvailabilityPeriods = new Map(Object.entries(itemCatalogIds).map((
        [itemId, itemCatalogIds]) => [
          itemId, itemCatalogIds
                    .map(catalogId => catalogs.find(catalog => catalog.tid === catalogId))
                    .filter(catalog => !!catalog)
                    .map(catalog => catalog.availabilityPeriods)
                    .flat()
        ]
      ))

      return {
        encoding: 'application/json',
        body: {
          items: items.map(item => dbItemToItemView(item, itemsToAvailabilityPeriods.get(item.tid) || [], merchantLocation.timezone)),
          modifierGroups: modifierGroups.map(dbModifierGroupToModifierGroupView),
          modifiers: modifiers.map(dbModifierToModifierView),
        },
        }
      }
    })
  }