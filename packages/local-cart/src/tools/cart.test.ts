import { addItemToCart, CartItem, itemsAreEquivalent } from './cart'

describe('cart', () => {
  describe('itemsAreEquivalent', () => {
    it('should return true for basicequivalent items', () => {
      const item1: CartItem = {
        itemCatalogId: '123',
        quantity: 1,
        modifierGroups: [],
      }
      const item2: CartItem = {
        itemCatalogId: '123',
        quantity: 1,
        modifierGroups: [],
      }
      expect(itemsAreEquivalent(item1, item2)).toBe(true)
    })
  })
})
