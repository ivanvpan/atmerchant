import * as objectHash from 'object-hash'

// TODO
// check duplicates
// compute price
// check availability
// check catalog active

export type fullfillmentType = 'DELIVERY' | 'PICKUP'

export interface Preferences {
  // In nosh we have global delivery and pickup preferences, not per-cart. This makes much simpler UX
  // but precludes  more complex functionality like group orders
  // fullfillmentType: fullfillmentType
  // address: Address
}

export interface CartModifierGroup {
  modifierGroupId: string
  modifiers: CartModifier[]
}

export interface CartModifier {
  modifierId: string
  quantity: number
  childModifierGroups?: CartModifierGroup[]
}

export interface CartItem {
  itemCatalogId: string
  quantity: number
  itemNotes?: string
  modifierGroups?: CartModifierGroup[]
}

export interface Cart {
  id: string
  merchantId: string
  orderNotes?: string
  preferences: Preferences
  cartItems: CartItem[]
}

export function itemsAreEquivalent(item1: CartItem, item2: CartItem) {
  const smartHash = (obj: any) => {
    const IGNORE_KEYS = ['quantity']
    return objectHash(obj, {
      unorderedArrays: true, // Treat arrays as unordered sets
      excludeKeys: (key) => IGNORE_KEYS.includes(key),
    })
  }
  return smartHash(item1) === smartHash(item2)
}

export function addItemToCart(cart: Cart, item: CartItem) {
  const existingItem = cart.cartItems.find((cartItem) => itemsAreEquivalent(cartItem, item))
  if (existingItem) {
    existingItem.quantity += item.quantity
  } else {
    cart.cartItems.push(item)
  }
}
