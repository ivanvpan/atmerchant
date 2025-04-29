import * as objectHash from 'object-hash'

// TODO
// check duplicates
// compute price
// check availability
// check catalog active

export type fullfillmentType = 'DELIVERY' | 'PICKUP'

export interface Preferences {
  // fullfillmentType: fullfillmentType
  // address, etc. ? In nosh we have global delivery and pickup preferences, not per-cart. This makes much simpler UX
  // but precludes things like group orders
}

export interface ModifierGroup {
  modifierGroupId: string
  modifiers: Modifier[]
}

export interface Modifier {
  modifierId: string
  quantity: number
  childModifierGroups?: ModifierGroup[]
}

export interface CartItem {
  itemCatalogId: string
  quantity: number
  modifierGroups?: ModifierGroup[]
}

export interface Cart {
  id: string
  merchantId: string
  orderNotes?: string
  preferences: Preferences
  cartItems: CartItem[]
}

export function itemsAreEquivalent(item1: CartItem, item2: CartItem) {
  return objectHash(item1) === objectHash(item2)
}

export function addItemToCart(cart: Cart, item: CartItem) {}
