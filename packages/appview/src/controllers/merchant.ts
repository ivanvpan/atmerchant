import { MerchantGroup } from '#/db'

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
