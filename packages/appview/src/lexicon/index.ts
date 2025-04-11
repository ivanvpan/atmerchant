/**
 * GENERATED CODE - DO NOT MODIFY
 */
import {
  createServer as createXrpcServer,
  Server as XrpcServer,
  type Options as XrpcOptions,
  type AuthVerifier,
  type StreamAuthVerifier,
} from '@atproto/xrpc-server'
import { schemas } from './lexicons.js'
import * as XyzNoshdeliveryV0CatalogGetFullCatalog from './types/xyz/noshdelivery/v0/catalog/getFullCatalog.js'
import * as XyzNoshdeliveryV0CatalogGetShallowCatalogView from './types/xyz/noshdelivery/v0/catalog/getShallowCatalogView.js'
import * as XyzNoshdeliveryV0CatalogPutCatalog from './types/xyz/noshdelivery/v0/catalog/putCatalog.js'
import * as XyzNoshdeliveryV0CatalogPutCollection from './types/xyz/noshdelivery/v0/catalog/putCollection.js'
import * as XyzNoshdeliveryV0CatalogPutItem from './types/xyz/noshdelivery/v0/catalog/putItem.js'
import * as XyzNoshdeliveryV0MerchantGetGroup from './types/xyz/noshdelivery/v0/merchant/getGroup.js'
import * as XyzNoshdeliveryV0MerchantListGroups from './types/xyz/noshdelivery/v0/merchant/listGroups.js'
import * as XyzNoshdeliveryV0MerchantListLocations from './types/xyz/noshdelivery/v0/merchant/listLocations.js'
import * as XyzNoshdeliveryV0MerchantPutGroup from './types/xyz/noshdelivery/v0/merchant/putGroup.js'
import * as XyzNoshdeliveryV0MerchantPutLocation from './types/xyz/noshdelivery/v0/merchant/putLocation.js'
import * as ComAtprotoRepoApplyWrites from './types/com/atproto/repo/applyWrites.js'
import * as ComAtprotoRepoCreateRecord from './types/com/atproto/repo/createRecord.js'
import * as ComAtprotoRepoDeleteRecord from './types/com/atproto/repo/deleteRecord.js'
import * as ComAtprotoRepoDescribeRepo from './types/com/atproto/repo/describeRepo.js'
import * as ComAtprotoRepoGetRecord from './types/com/atproto/repo/getRecord.js'
import * as ComAtprotoRepoImportRepo from './types/com/atproto/repo/importRepo.js'
import * as ComAtprotoRepoListMissingBlobs from './types/com/atproto/repo/listMissingBlobs.js'
import * as ComAtprotoRepoListRecords from './types/com/atproto/repo/listRecords.js'
import * as ComAtprotoRepoPutRecord from './types/com/atproto/repo/putRecord.js'
import * as ComAtprotoRepoUploadBlob from './types/com/atproto/repo/uploadBlob.js'

export function createServer(options?: XrpcOptions): Server {
  return new Server(options)
}

export class Server {
  xrpc: XrpcServer
  xyz: XyzNS
  com: ComNS
  community: CommunityNS

  constructor(options?: XrpcOptions) {
    this.xrpc = createXrpcServer(schemas, options)
    this.xyz = new XyzNS(this)
    this.com = new ComNS(this)
    this.community = new CommunityNS(this)
  }
}

export class XyzNS {
  _server: Server
  noshdelivery: XyzNoshdeliveryNS

  constructor(server: Server) {
    this._server = server
    this.noshdelivery = new XyzNoshdeliveryNS(server)
  }
}

export class XyzNoshdeliveryNS {
  _server: Server
  v0: XyzNoshdeliveryV0NS

  constructor(server: Server) {
    this._server = server
    this.v0 = new XyzNoshdeliveryV0NS(server)
  }
}

export class XyzNoshdeliveryV0NS {
  _server: Server
  catalog: XyzNoshdeliveryV0CatalogNS
  media: XyzNoshdeliveryV0MediaNS
  merchant: XyzNoshdeliveryV0MerchantNS

  constructor(server: Server) {
    this._server = server
    this.catalog = new XyzNoshdeliveryV0CatalogNS(server)
    this.media = new XyzNoshdeliveryV0MediaNS(server)
    this.merchant = new XyzNoshdeliveryV0MerchantNS(server)
  }
}

export class XyzNoshdeliveryV0CatalogNS {
  _server: Server

  constructor(server: Server) {
    this._server = server
  }

  getFullCatalog<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      XyzNoshdeliveryV0CatalogGetFullCatalog.Handler<ExtractAuth<AV>>,
      XyzNoshdeliveryV0CatalogGetFullCatalog.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'xyz.noshdelivery.v0.catalog.getFullCatalog' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }

  getShallowCatalogView<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      XyzNoshdeliveryV0CatalogGetShallowCatalogView.Handler<ExtractAuth<AV>>,
      XyzNoshdeliveryV0CatalogGetShallowCatalogView.HandlerReqCtx<
        ExtractAuth<AV>
      >
    >,
  ) {
    const nsid = 'xyz.noshdelivery.v0.catalog.getShallowCatalogView' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }

  putCatalog<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      XyzNoshdeliveryV0CatalogPutCatalog.Handler<ExtractAuth<AV>>,
      XyzNoshdeliveryV0CatalogPutCatalog.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'xyz.noshdelivery.v0.catalog.putCatalog' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }

  putCollection<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      XyzNoshdeliveryV0CatalogPutCollection.Handler<ExtractAuth<AV>>,
      XyzNoshdeliveryV0CatalogPutCollection.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'xyz.noshdelivery.v0.catalog.putCollection' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }

  putItem<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      XyzNoshdeliveryV0CatalogPutItem.Handler<ExtractAuth<AV>>,
      XyzNoshdeliveryV0CatalogPutItem.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'xyz.noshdelivery.v0.catalog.putItem' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }
}

export class XyzNoshdeliveryV0MediaNS {
  _server: Server

  constructor(server: Server) {
    this._server = server
  }
}

export class XyzNoshdeliveryV0MerchantNS {
  _server: Server

  constructor(server: Server) {
    this._server = server
  }

  getGroup<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      XyzNoshdeliveryV0MerchantGetGroup.Handler<ExtractAuth<AV>>,
      XyzNoshdeliveryV0MerchantGetGroup.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'xyz.noshdelivery.v0.merchant.getGroup' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }

  listGroups<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      XyzNoshdeliveryV0MerchantListGroups.Handler<ExtractAuth<AV>>,
      XyzNoshdeliveryV0MerchantListGroups.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'xyz.noshdelivery.v0.merchant.listGroups' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }

  listLocations<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      XyzNoshdeliveryV0MerchantListLocations.Handler<ExtractAuth<AV>>,
      XyzNoshdeliveryV0MerchantListLocations.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'xyz.noshdelivery.v0.merchant.listLocations' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }

  putGroup<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      XyzNoshdeliveryV0MerchantPutGroup.Handler<ExtractAuth<AV>>,
      XyzNoshdeliveryV0MerchantPutGroup.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'xyz.noshdelivery.v0.merchant.putGroup' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }

  putLocation<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      XyzNoshdeliveryV0MerchantPutLocation.Handler<ExtractAuth<AV>>,
      XyzNoshdeliveryV0MerchantPutLocation.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'xyz.noshdelivery.v0.merchant.putLocation' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }
}

export class ComNS {
  _server: Server
  atproto: ComAtprotoNS

  constructor(server: Server) {
    this._server = server
    this.atproto = new ComAtprotoNS(server)
  }
}

export class ComAtprotoNS {
  _server: Server
  repo: ComAtprotoRepoNS

  constructor(server: Server) {
    this._server = server
    this.repo = new ComAtprotoRepoNS(server)
  }
}

export class ComAtprotoRepoNS {
  _server: Server

  constructor(server: Server) {
    this._server = server
  }

  applyWrites<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      ComAtprotoRepoApplyWrites.Handler<ExtractAuth<AV>>,
      ComAtprotoRepoApplyWrites.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'com.atproto.repo.applyWrites' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }

  createRecord<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      ComAtprotoRepoCreateRecord.Handler<ExtractAuth<AV>>,
      ComAtprotoRepoCreateRecord.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'com.atproto.repo.createRecord' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }

  deleteRecord<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      ComAtprotoRepoDeleteRecord.Handler<ExtractAuth<AV>>,
      ComAtprotoRepoDeleteRecord.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'com.atproto.repo.deleteRecord' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }

  describeRepo<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      ComAtprotoRepoDescribeRepo.Handler<ExtractAuth<AV>>,
      ComAtprotoRepoDescribeRepo.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'com.atproto.repo.describeRepo' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }

  getRecord<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      ComAtprotoRepoGetRecord.Handler<ExtractAuth<AV>>,
      ComAtprotoRepoGetRecord.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'com.atproto.repo.getRecord' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }

  importRepo<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      ComAtprotoRepoImportRepo.Handler<ExtractAuth<AV>>,
      ComAtprotoRepoImportRepo.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'com.atproto.repo.importRepo' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }

  listMissingBlobs<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      ComAtprotoRepoListMissingBlobs.Handler<ExtractAuth<AV>>,
      ComAtprotoRepoListMissingBlobs.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'com.atproto.repo.listMissingBlobs' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }

  listRecords<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      ComAtprotoRepoListRecords.Handler<ExtractAuth<AV>>,
      ComAtprotoRepoListRecords.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'com.atproto.repo.listRecords' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }

  putRecord<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      ComAtprotoRepoPutRecord.Handler<ExtractAuth<AV>>,
      ComAtprotoRepoPutRecord.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'com.atproto.repo.putRecord' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }

  uploadBlob<AV extends AuthVerifier>(
    cfg: ConfigOf<
      AV,
      ComAtprotoRepoUploadBlob.Handler<ExtractAuth<AV>>,
      ComAtprotoRepoUploadBlob.HandlerReqCtx<ExtractAuth<AV>>
    >,
  ) {
    const nsid = 'com.atproto.repo.uploadBlob' // @ts-ignore
    return this._server.xrpc.method(nsid, cfg)
  }
}

export class CommunityNS {
  _server: Server
  lexicon: CommunityLexiconNS

  constructor(server: Server) {
    this._server = server
    this.lexicon = new CommunityLexiconNS(server)
  }
}

export class CommunityLexiconNS {
  _server: Server
  location: CommunityLexiconLocationNS

  constructor(server: Server) {
    this._server = server
    this.location = new CommunityLexiconLocationNS(server)
  }
}

export class CommunityLexiconLocationNS {
  _server: Server

  constructor(server: Server) {
    this._server = server
  }
}

type SharedRateLimitOpts<T> = {
  name: string
  calcKey?: (ctx: T) => string | null
  calcPoints?: (ctx: T) => number
}
type RouteRateLimitOpts<T> = {
  durationMs: number
  points: number
  calcKey?: (ctx: T) => string | null
  calcPoints?: (ctx: T) => number
}
type HandlerOpts = { blobLimit?: number }
type HandlerRateLimitOpts<T> = SharedRateLimitOpts<T> | RouteRateLimitOpts<T>
type ConfigOf<Auth, Handler, ReqCtx> =
  | Handler
  | {
      auth?: Auth
      opts?: HandlerOpts
      rateLimit?: HandlerRateLimitOpts<ReqCtx> | HandlerRateLimitOpts<ReqCtx>[]
      handler: Handler
    }
type ExtractAuth<AV extends AuthVerifier | StreamAuthVerifier> = Extract<
  Awaited<ReturnType<AV>>,
  { credentials: unknown }
>
