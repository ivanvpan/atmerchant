import { addItemToCart, CartItem, itemsAreEquivalent, CartModifierGroup, Cart } from './cart'

describe('cart', () => {
  describe('itemsAreEquivalent', () => {
    it('should return true for basic equivalent items', () => {
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

    it('should ignore quantity', () => {
      const item1: CartItem = {
        itemCatalogId: '123',
        quantity: 1,
        modifierGroups: [],
      }
      const item2: CartItem = {
        itemCatalogId: '123',
        quantity: 2,
        modifierGroups: [],
      }
      expect(itemsAreEquivalent(item1, item2)).toBe(true)
    })

    it('should compare modifier groups regardless of order', () => {
      const modifierGroup1: CartModifierGroup = {
        modifierGroupId: '123',
        modifiers: [
          {
            modifierId: '789',
            quantity: 1,
            childModifierGroups: [
              {
                modifierGroupId: '456',
                modifiers: [
                  {
                    modifierId: '123',
                    quantity: 1,
                  },
                ],
              },
            ],
          },
        ],
      }

      const modifierGroup2: CartModifierGroup = {
        modifierGroupId: '456',
        modifiers: [
          {
            modifierId: '123',
            quantity: 1,
            childModifierGroups: [
              {
                modifierGroupId: '789',
                modifiers: [
                  {
                    modifierId: '456',
                    quantity: 1,
                  },
                ],
              },
            ],
          },
        ],
      }

      const item1: CartItem = {
        itemCatalogId: '123',
        quantity: 1,
        modifierGroups: [modifierGroup1, modifierGroup2],
      }
      const item2: CartItem = {
        itemCatalogId: '123',
        quantity: 1,
        modifierGroups: [modifierGroup2, modifierGroup1],
      }
      expect(itemsAreEquivalent(item1, item2)).toBe(true)
    })

    it('should treat items notes as not equivalent', () => {
      const item1: CartItem = {
        itemCatalogId: '123',
        quantity: 1,
        itemNotes: 'no spice!',
      }
      const item2: CartItem = {
        itemCatalogId: '123',
        quantity: 1,
        itemNotes: 'spicy!',
      }
      expect(itemsAreEquivalent(item1, item2)).toBe(false)
    })
  })
  describe('addItemToCart', () => {
    it('should add an item to the cart', () => {
      const cart: Cart = {
        id: '123',
        merchantId: '456',
        orderNotes: 'test',
        preferences: {
          deliveryType: 'DELIVERY',
          pickupType: 'PICKUP',
        },
        cartItems: [],
      }
      const item: CartItem = {
        itemCatalogId: '123',
        quantity: 2,
        modifierGroups: [],
      }
      addItemToCart(cart, item)
      expect(cart.cartItems).toEqual([item])
    })

    it('should increment quantity if item already exists', () => {
      const cart: Cart = {
        id: '123',
        merchantId: '456',
        orderNotes: 'test',
        preferences: {
          deliveryType: 'DELIVERY',
          pickupType: 'PICKUP',
        },
        cartItems: [
          {
            itemCatalogId: '123',
            quantity: 1,
            modifierGroups: [],
          },
        ],
      }
      const item: CartItem = {
        itemCatalogId: '123',
        quantity: 2,
        modifierGroups: [],
      }
      addItemToCart(cart, item)
      expect(cart.cartItems).toEqual([
        {
          itemCatalogId: '123',
          quantity: 3,
          modifierGroups: [],
        },
      ])
    })
  })
})
