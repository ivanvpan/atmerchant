/**
 * GENERATED CODE - DO NOT MODIFY
 */
import {
  XrpcClient,
  type FetchHandler,
  type FetchHandlerOptions,
} from '@atproto/xrpc'
import { schemas } from './lexicons.js'
import { CID } from 'multiformats/cid'
import { type OmitKey, type Un$Typed } from './util.js'
import * as XyzNoshdeliveryV0CatalogCatalog from './types/xyz/noshdelivery/v0/catalog/catalog.js'
import * as XyzNoshdeliveryV0CatalogCollection from './types/xyz/noshdelivery/v0/catalog/collection.js'
import * as XyzNoshdeliveryV0CatalogDefs from './types/xyz/noshdelivery/v0/catalog/defs.js'
import * as XyzNoshdeliveryV0CatalogItem from './types/xyz/noshdelivery/v0/catalog/item.js'
import * as XyzNoshdeliveryV0CatalogModifier from './types/xyz/noshdelivery/v0/catalog/modifier.js'
import * as XyzNoshdeliveryV0CatalogModifierGroup from './types/xyz/noshdelivery/v0/catalog/modifierGroup.js'
import * as XyzNoshdeliveryV0MerchantCreateMerchant from './types/xyz/noshdelivery/v0/merchant/createMerchant.js'
import * as XyzNoshdeliveryV0MerchantGetMerchants from './types/xyz/noshdelivery/v0/merchant/getMerchants.js'
import * as XyzNoshdeliveryV0MerchantMerchant from './types/xyz/noshdelivery/v0/merchant/merchant.js'
import * as ComAtprotoLabelDefs from './types/com/atproto/label/defs.js'
import * as ComAtprotoRepoApplyWrites from './types/com/atproto/repo/applyWrites.js'
import * as ComAtprotoRepoCreateRecord from './types/com/atproto/repo/createRecord.js'
import * as ComAtprotoRepoDefs from './types/com/atproto/repo/defs.js'
import * as ComAtprotoRepoDeleteRecord from './types/com/atproto/repo/deleteRecord.js'
import * as ComAtprotoRepoDescribeRepo from './types/com/atproto/repo/describeRepo.js'
import * as ComAtprotoRepoGetRecord from './types/com/atproto/repo/getRecord.js'
import * as ComAtprotoRepoImportRepo from './types/com/atproto/repo/importRepo.js'
import * as ComAtprotoRepoListMissingBlobs from './types/com/atproto/repo/listMissingBlobs.js'
import * as ComAtprotoRepoListRecords from './types/com/atproto/repo/listRecords.js'
import * as ComAtprotoRepoPutRecord from './types/com/atproto/repo/putRecord.js'
import * as ComAtprotoRepoStrongRef from './types/com/atproto/repo/strongRef.js'
import * as ComAtprotoRepoUploadBlob from './types/com/atproto/repo/uploadBlob.js'

export * as XyzNoshdeliveryV0CatalogCatalog from './types/xyz/noshdelivery/v0/catalog/catalog.js'
export * as XyzNoshdeliveryV0CatalogCollection from './types/xyz/noshdelivery/v0/catalog/collection.js'
export * as XyzNoshdeliveryV0CatalogDefs from './types/xyz/noshdelivery/v0/catalog/defs.js'
export * as XyzNoshdeliveryV0CatalogItem from './types/xyz/noshdelivery/v0/catalog/item.js'
export * as XyzNoshdeliveryV0CatalogModifier from './types/xyz/noshdelivery/v0/catalog/modifier.js'
export * as XyzNoshdeliveryV0CatalogModifierGroup from './types/xyz/noshdelivery/v0/catalog/modifierGroup.js'
export * as XyzNoshdeliveryV0MerchantCreateMerchant from './types/xyz/noshdelivery/v0/merchant/createMerchant.js'
export * as XyzNoshdeliveryV0MerchantGetMerchants from './types/xyz/noshdelivery/v0/merchant/getMerchants.js'
export * as XyzNoshdeliveryV0MerchantMerchant from './types/xyz/noshdelivery/v0/merchant/merchant.js'
export * as ComAtprotoLabelDefs from './types/com/atproto/label/defs.js'
export * as ComAtprotoRepoApplyWrites from './types/com/atproto/repo/applyWrites.js'
export * as ComAtprotoRepoCreateRecord from './types/com/atproto/repo/createRecord.js'
export * as ComAtprotoRepoDefs from './types/com/atproto/repo/defs.js'
export * as ComAtprotoRepoDeleteRecord from './types/com/atproto/repo/deleteRecord.js'
export * as ComAtprotoRepoDescribeRepo from './types/com/atproto/repo/describeRepo.js'
export * as ComAtprotoRepoGetRecord from './types/com/atproto/repo/getRecord.js'
export * as ComAtprotoRepoImportRepo from './types/com/atproto/repo/importRepo.js'
export * as ComAtprotoRepoListMissingBlobs from './types/com/atproto/repo/listMissingBlobs.js'
export * as ComAtprotoRepoListRecords from './types/com/atproto/repo/listRecords.js'
export * as ComAtprotoRepoPutRecord from './types/com/atproto/repo/putRecord.js'
export * as ComAtprotoRepoStrongRef from './types/com/atproto/repo/strongRef.js'
export * as ComAtprotoRepoUploadBlob from './types/com/atproto/repo/uploadBlob.js'

export class AtpBaseClient extends XrpcClient {
  xyz: XyzNS
  com: ComNS

  constructor(options: FetchHandler | FetchHandlerOptions) {
    super(options, schemas)
    this.xyz = new XyzNS(this)
    this.com = new ComNS(this)
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
  v0: XyzNoshdeliveryV0NS

  constructor(client: XrpcClient) {
    this._client = client
    this.v0 = new XyzNoshdeliveryV0NS(client)
  }
}

export class XyzNoshdeliveryV0NS {
  _client: XrpcClient
  catalog: XyzNoshdeliveryV0CatalogNS
  merchant: XyzNoshdeliveryV0MerchantNS

  constructor(client: XrpcClient) {
    this._client = client
    this.catalog = new XyzNoshdeliveryV0CatalogNS(client)
    this.merchant = new XyzNoshdeliveryV0MerchantNS(client)
  }
}

export class XyzNoshdeliveryV0CatalogNS {
  _client: XrpcClient
  catalog: CatalogRecord
  collection: CollectionRecord
  item: ItemRecord
  modifier: ModifierRecord
  modifierGroup: ModifierGroupRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.catalog = new CatalogRecord(client)
    this.collection = new CollectionRecord(client)
    this.item = new ItemRecord(client)
    this.modifier = new ModifierRecord(client)
    this.modifierGroup = new ModifierGroupRecord(client)
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
    records: { uri: string; value: XyzNoshdeliveryV0CatalogCatalog.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'xyz.noshdelivery.v0.catalog.catalog',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: XyzNoshdeliveryV0CatalogCatalog.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'xyz.noshdelivery.v0.catalog.catalog',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<XyzNoshdeliveryV0CatalogCatalog.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'xyz.noshdelivery.v0.catalog.catalog'
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
      { collection: 'xyz.noshdelivery.v0.catalog.catalog', ...params },
      { headers },
    )
  }
}

export class CollectionRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: XyzNoshdeliveryV0CatalogCollection.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'xyz.noshdelivery.v0.catalog.collection',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: XyzNoshdeliveryV0CatalogCollection.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'xyz.noshdelivery.v0.catalog.collection',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<XyzNoshdeliveryV0CatalogCollection.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'xyz.noshdelivery.v0.catalog.collection'
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
      { collection: 'xyz.noshdelivery.v0.catalog.collection', ...params },
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
    records: { uri: string; value: XyzNoshdeliveryV0CatalogItem.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'xyz.noshdelivery.v0.catalog.item',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: XyzNoshdeliveryV0CatalogItem.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'xyz.noshdelivery.v0.catalog.item',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<XyzNoshdeliveryV0CatalogItem.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'xyz.noshdelivery.v0.catalog.item'
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
      { collection: 'xyz.noshdelivery.v0.catalog.item', ...params },
      { headers },
    )
  }
}

export class ModifierRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: XyzNoshdeliveryV0CatalogModifier.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'xyz.noshdelivery.v0.catalog.modifier',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: XyzNoshdeliveryV0CatalogModifier.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'xyz.noshdelivery.v0.catalog.modifier',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<XyzNoshdeliveryV0CatalogModifier.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'xyz.noshdelivery.v0.catalog.modifier'
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
      { collection: 'xyz.noshdelivery.v0.catalog.modifier', ...params },
      { headers },
    )
  }
}

export class ModifierGroupRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: {
      uri: string
      value: XyzNoshdeliveryV0CatalogModifierGroup.Record
    }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'xyz.noshdelivery.v0.catalog.modifierGroup',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: XyzNoshdeliveryV0CatalogModifierGroup.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'xyz.noshdelivery.v0.catalog.modifierGroup',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<XyzNoshdeliveryV0CatalogModifierGroup.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'xyz.noshdelivery.v0.catalog.modifierGroup'
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
      { collection: 'xyz.noshdelivery.v0.catalog.modifierGroup', ...params },
      { headers },
    )
  }
}

export class XyzNoshdeliveryV0MerchantNS {
  _client: XrpcClient
  merchant: MerchantRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.merchant = new MerchantRecord(client)
  }

  createMerchant(
    data?: XyzNoshdeliveryV0MerchantCreateMerchant.InputSchema,
    opts?: XyzNoshdeliveryV0MerchantCreateMerchant.CallOptions,
  ): Promise<XyzNoshdeliveryV0MerchantCreateMerchant.Response> {
    return this._client.call(
      'xyz.noshdelivery.v0.merchant.createMerchant',
      opts?.qp,
      data,
      opts,
    )
  }

  getMerchants(
    params?: XyzNoshdeliveryV0MerchantGetMerchants.QueryParams,
    opts?: XyzNoshdeliveryV0MerchantGetMerchants.CallOptions,
  ): Promise<XyzNoshdeliveryV0MerchantGetMerchants.Response> {
    return this._client.call(
      'xyz.noshdelivery.v0.merchant.getMerchants',
      params,
      undefined,
      opts,
    )
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
    records: { uri: string; value: XyzNoshdeliveryV0MerchantMerchant.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'xyz.noshdelivery.v0.merchant.merchant',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: XyzNoshdeliveryV0MerchantMerchant.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'xyz.noshdelivery.v0.merchant.merchant',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<XyzNoshdeliveryV0MerchantMerchant.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'xyz.noshdelivery.v0.merchant.merchant'
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
      { collection: 'xyz.noshdelivery.v0.merchant.merchant', ...params },
      { headers },
    )
  }
}

export class ComNS {
  _client: XrpcClient
  atproto: ComAtprotoNS

  constructor(client: XrpcClient) {
    this._client = client
    this.atproto = new ComAtprotoNS(client)
  }
}

export class ComAtprotoNS {
  _client: XrpcClient
  repo: ComAtprotoRepoNS

  constructor(client: XrpcClient) {
    this._client = client
    this.repo = new ComAtprotoRepoNS(client)
  }
}

export class ComAtprotoRepoNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  applyWrites(
    data?: ComAtprotoRepoApplyWrites.InputSchema,
    opts?: ComAtprotoRepoApplyWrites.CallOptions,
  ): Promise<ComAtprotoRepoApplyWrites.Response> {
    return this._client
      .call('com.atproto.repo.applyWrites', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoRepoApplyWrites.toKnownErr(e)
      })
  }

  createRecord(
    data?: ComAtprotoRepoCreateRecord.InputSchema,
    opts?: ComAtprotoRepoCreateRecord.CallOptions,
  ): Promise<ComAtprotoRepoCreateRecord.Response> {
    return this._client
      .call('com.atproto.repo.createRecord', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoRepoCreateRecord.toKnownErr(e)
      })
  }

  deleteRecord(
    data?: ComAtprotoRepoDeleteRecord.InputSchema,
    opts?: ComAtprotoRepoDeleteRecord.CallOptions,
  ): Promise<ComAtprotoRepoDeleteRecord.Response> {
    return this._client
      .call('com.atproto.repo.deleteRecord', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoRepoDeleteRecord.toKnownErr(e)
      })
  }

  describeRepo(
    params?: ComAtprotoRepoDescribeRepo.QueryParams,
    opts?: ComAtprotoRepoDescribeRepo.CallOptions,
  ): Promise<ComAtprotoRepoDescribeRepo.Response> {
    return this._client.call(
      'com.atproto.repo.describeRepo',
      params,
      undefined,
      opts,
    )
  }

  getRecord(
    params?: ComAtprotoRepoGetRecord.QueryParams,
    opts?: ComAtprotoRepoGetRecord.CallOptions,
  ): Promise<ComAtprotoRepoGetRecord.Response> {
    return this._client
      .call('com.atproto.repo.getRecord', params, undefined, opts)
      .catch((e) => {
        throw ComAtprotoRepoGetRecord.toKnownErr(e)
      })
  }

  importRepo(
    data?: ComAtprotoRepoImportRepo.InputSchema,
    opts?: ComAtprotoRepoImportRepo.CallOptions,
  ): Promise<ComAtprotoRepoImportRepo.Response> {
    return this._client.call(
      'com.atproto.repo.importRepo',
      opts?.qp,
      data,
      opts,
    )
  }

  listMissingBlobs(
    params?: ComAtprotoRepoListMissingBlobs.QueryParams,
    opts?: ComAtprotoRepoListMissingBlobs.CallOptions,
  ): Promise<ComAtprotoRepoListMissingBlobs.Response> {
    return this._client.call(
      'com.atproto.repo.listMissingBlobs',
      params,
      undefined,
      opts,
    )
  }

  listRecords(
    params?: ComAtprotoRepoListRecords.QueryParams,
    opts?: ComAtprotoRepoListRecords.CallOptions,
  ): Promise<ComAtprotoRepoListRecords.Response> {
    return this._client.call(
      'com.atproto.repo.listRecords',
      params,
      undefined,
      opts,
    )
  }

  putRecord(
    data?: ComAtprotoRepoPutRecord.InputSchema,
    opts?: ComAtprotoRepoPutRecord.CallOptions,
  ): Promise<ComAtprotoRepoPutRecord.Response> {
    return this._client
      .call('com.atproto.repo.putRecord', opts?.qp, data, opts)
      .catch((e) => {
        throw ComAtprotoRepoPutRecord.toKnownErr(e)
      })
  }

  uploadBlob(
    data?: ComAtprotoRepoUploadBlob.InputSchema,
    opts?: ComAtprotoRepoUploadBlob.CallOptions,
  ): Promise<ComAtprotoRepoUploadBlob.Response> {
    return this._client.call(
      'com.atproto.repo.uploadBlob',
      opts?.qp,
      data,
      opts,
    )
  }
}
