import { MerchantGroup, MerchantLocation } from '#/db'

export function dbMerchantGroupToMerchantGroupView(
  dbMerchantGroup: MerchantGroup,
) {
  return {
    tid: dbMerchantGroup.tid,
    uri: dbMerchantGroup.uri,
    externalId: dbMerchantGroup.externalId || undefined,
    name: dbMerchantGroup.name,
    logo: undefined,
  }
}

type Address = {
  city: string
  country: string
  postalCode: string
  state: string
  street: string
}
type Geo = {
  latitude: string
  longitude: string
}

export function dbMerchantLocationToMerchantLocationView(
  dbMerchantLocation: MerchantLocation,
) {
  return {
    tid: dbMerchantLocation.tid,
    uri: dbMerchantLocation.uri,
    externalId: dbMerchantLocation.externalId || undefined,
    name: dbMerchantLocation.name,
    address: JSON.parse(dbMerchantLocation.address) as Address,
    timezone: dbMerchantLocation.timezone,
    coordinates: JSON.parse(dbMerchantLocation.coordinates) as Geo,
  }
}
