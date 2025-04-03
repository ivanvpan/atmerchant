/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { XrpcClient, FetchHandler, FetchHandlerOptions } from '@atproto/xrpc'
import { schemas } from './lexicons.js'
import { CID } from 'multiformats/cid'
import { OmitKey, Un$Typed } from './util.js'
import * as XyzNoshdeliveryCatalogCatalog from './types/xyz/noshdelivery/catalog/catalog.js'
import * as XyzNoshdeliveryCatalogCategory from './types/xyz/noshdelivery/catalog/category.js'
import * as XyzNoshdeliveryCatalogDefs from './types/xyz/noshdelivery/catalog/defs.js'
import * as XyzNoshdeliveryCatalogItem from './types/xyz/noshdelivery/catalog/item.js'
import * as XyzNoshdeliveryMerchantMerchant from './types/xyz/noshdelivery/merchant/merchant.js'

export * as XyzNoshdeliveryCatalogCatalog from './types/xyz/noshdelivery/catalog/catalog.js'
export * as XyzNoshdeliveryCatalogCategory from './types/xyz/noshdelivery/catalog/category.js'
export * as XyzNoshdeliveryCatalogDefs from './types/xyz/noshdelivery/catalog/defs.js'
export * as XyzNoshdeliveryCatalogItem from './types/xyz/noshdelivery/catalog/item.js'
export * as XyzNoshdeliveryMerchantMerchant from './types/xyz/noshdelivery/merchant/merchant.js'

export class AtpBaseClient extends XrpcClient {
  xyz: XyzNS

  constructor(options: FetchHandler | FetchHandlerOptions) {
    super(options, schemas)
    this.xyz = new XyzNS(this)
  }

  /** @deprecated use `this` instead */
  get xrpc(): XrpcClient {
    return this
  }
}

export class XyzNS {
  _client: XrpcClient
  noshdelivery: XyzNoshdeliveryNS

  constructor(client: XrpcClient) {
    this._client = client
    this.noshdelivery = new XyzNoshdeliveryNS(client)
  }
}

export class XyzNoshdeliveryNS {
  _client: XrpcClient
  catalog: XyzNoshdeliveryCatalogNS
  merchant: XyzNoshdeliveryMerchantNS

  constructor(client: XrpcClient) {
    this._client = client
    this.catalog = new XyzNoshdeliveryCatalogNS(client)
    this.merchant = new XyzNoshdeliveryMerchantNS(client)
  }
}

export class XyzNoshdeliveryCatalogNS {
  _client: XrpcClient
  catalog: CatalogRecord
  category: CategoryRecord
  item: ItemRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.catalog = new CatalogRecord(client)
    this.category = new CategoryRecord(client)
    this.item = new ItemRecord(client)
  }
}

export class CatalogRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: XyzNoshdeliveryCatalogCatalog.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'xyz.noshdelivery.catalog.catalog',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: XyzNoshdeliveryCatalogCatalog.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'xyz.noshdelivery.catalog.catalog',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<XyzNoshdeliveryCatalogCatalog.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'xyz.noshdelivery.catalog.catalog'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'xyz.noshdelivery.catalog.catalog', ...params },
      { headers },
    )
  }
}

export class CategoryRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: XyzNoshdeliveryCatalogCategory.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'xyz.noshdelivery.catalog.category',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: XyzNoshdeliveryCatalogCategory.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'xyz.noshdelivery.catalog.category',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<XyzNoshdeliveryCatalogCategory.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'xyz.noshdelivery.catalog.category'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'xyz.noshdelivery.catalog.category', ...params },
      { headers },
    )
  }
}

export class ItemRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: XyzNoshdeliveryCatalogItem.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'xyz.noshdelivery.catalog.item',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: XyzNoshdeliveryCatalogItem.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'xyz.noshdelivery.catalog.item',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<XyzNoshdeliveryCatalogItem.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'xyz.noshdelivery.catalog.item'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'xyz.noshdelivery.catalog.item', ...params },
      { headers },
    )
  }
}

export class XyzNoshdeliveryMerchantNS {
  _client: XrpcClient
  merchant: MerchantRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.merchant = new MerchantRecord(client)
  }
}

export class MerchantRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: XyzNoshdeliveryMerchantMerchant.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'xyz.noshdelivery.merchant.merchant',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: XyzNoshdeliveryMerchantMerchant.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'xyz.noshdelivery.merchant.merchant',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<XyzNoshdeliveryMerchantMerchant.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'xyz.noshdelivery.merchant.merchant'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'xyz.noshdelivery.merchant.merchant', ...params },
      { headers },
    )
  }
}
