import * as objectHash from 'object-hash'
import { Catalogs } from './catalog'

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

export enum CartValidationErrorCode {
  MODIFIER_ABOVE_MAXIMUM = 'MODIFIER_ABOVE_MAXIMUM',
  MODIFIER_UNAVAILABLE = 'MODIFIER_UNAVAILABLE',
  ITEM_UNAVAILABLE = 'ITEM_UNAVAILABLE',
  MODIFIER_GROUP_UNAVAILABLE = 'MODIFIER_GROUP_UNAVAILABLE',
  MODIFIER_GROUP_TOTAL_ABOVE_MAXIMUM = 'MODIFIER_GROUP_TOTAL_ABOVE_MAXIMUM',
  MODIFIER_GROUP_TOTAL_BELOW_MINIMUM = 'MODIFIER_GROUP_TOTAL_BELOW_MINIMUM',
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

export function validateCartItem(item: CartItem, catalogs: Catalogs): CartValidationErrorCode[] {
  const errors: CartValidationErrorCode[] = []

  const catalogItem = catalogs.items[item.itemCatalogId]
  if (!catalogItem || catalogItem.suspended) {
    errors.push(CartValidationErrorCode.ITEM_UNAVAILABLE)
  }

  // Does item belong to a catalog that is active?

  return errors
}

export function addItemToCart(cart: Cart, item: CartItem) {
  const existingItem = cart.cartItems.find((cartItem) => itemsAreEquivalent(cartItem, item))
  if (existingItem) {
    existingItem.quantity += item.quantity
  } else {
    cart.cartItems.push(item)
  }
}
