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
import * as XyzNoshdeliveryMerchant from './types/xyz/noshdelivery/merchant.js'

export * as XyzNoshdeliveryMerchant from './types/xyz/noshdelivery/merchant.js'

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
    records: { uri: string; value: XyzNoshdeliveryMerchant.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'xyz.noshdelivery.merchant',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: XyzNoshdeliveryMerchant.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'xyz.noshdelivery.merchant',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<XyzNoshdeliveryMerchant.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'xyz.noshdelivery.merchant'
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
      { collection: 'xyz.noshdelivery.merchant', ...params },
      { headers },
    )
  }
}
