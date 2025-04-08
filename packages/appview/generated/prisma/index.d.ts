
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model MerchantGroup
 * 
 */
export type MerchantGroup = $Result.DefaultSelection<Prisma.$MerchantGroupPayload>
/**
 * Model MerchantLocation
 * 
 */
export type MerchantLocation = $Result.DefaultSelection<Prisma.$MerchantLocationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more MerchantGroups
 * const merchantGroups = await prisma.merchantGroup.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more MerchantGroups
   * const merchantGroups = await prisma.merchantGroup.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.merchantGroup`: Exposes CRUD operations for the **MerchantGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MerchantGroups
    * const merchantGroups = await prisma.merchantGroup.findMany()
    * ```
    */
  get merchantGroup(): Prisma.MerchantGroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.merchantLocation`: Exposes CRUD operations for the **MerchantLocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MerchantLocations
    * const merchantLocations = await prisma.merchantLocation.findMany()
    * ```
    */
  get merchantLocation(): Prisma.MerchantLocationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    MerchantGroup: 'MerchantGroup',
    MerchantLocation: 'MerchantLocation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "merchantGroup" | "merchantLocation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      MerchantGroup: {
        payload: Prisma.$MerchantGroupPayload<ExtArgs>
        fields: Prisma.MerchantGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MerchantGroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MerchantGroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantGroupPayload>
          }
          findFirst: {
            args: Prisma.MerchantGroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MerchantGroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantGroupPayload>
          }
          findMany: {
            args: Prisma.MerchantGroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantGroupPayload>[]
          }
          create: {
            args: Prisma.MerchantGroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantGroupPayload>
          }
          createMany: {
            args: Prisma.MerchantGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MerchantGroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantGroupPayload>[]
          }
          delete: {
            args: Prisma.MerchantGroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantGroupPayload>
          }
          update: {
            args: Prisma.MerchantGroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantGroupPayload>
          }
          deleteMany: {
            args: Prisma.MerchantGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MerchantGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MerchantGroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantGroupPayload>[]
          }
          upsert: {
            args: Prisma.MerchantGroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantGroupPayload>
          }
          aggregate: {
            args: Prisma.MerchantGroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMerchantGroup>
          }
          groupBy: {
            args: Prisma.MerchantGroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<MerchantGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.MerchantGroupCountArgs<ExtArgs>
            result: $Utils.Optional<MerchantGroupCountAggregateOutputType> | number
          }
        }
      }
      MerchantLocation: {
        payload: Prisma.$MerchantLocationPayload<ExtArgs>
        fields: Prisma.MerchantLocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MerchantLocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantLocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MerchantLocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantLocationPayload>
          }
          findFirst: {
            args: Prisma.MerchantLocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantLocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MerchantLocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantLocationPayload>
          }
          findMany: {
            args: Prisma.MerchantLocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantLocationPayload>[]
          }
          create: {
            args: Prisma.MerchantLocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantLocationPayload>
          }
          createMany: {
            args: Prisma.MerchantLocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MerchantLocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantLocationPayload>[]
          }
          delete: {
            args: Prisma.MerchantLocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantLocationPayload>
          }
          update: {
            args: Prisma.MerchantLocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantLocationPayload>
          }
          deleteMany: {
            args: Prisma.MerchantLocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MerchantLocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MerchantLocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantLocationPayload>[]
          }
          upsert: {
            args: Prisma.MerchantLocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerchantLocationPayload>
          }
          aggregate: {
            args: Prisma.MerchantLocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMerchantLocation>
          }
          groupBy: {
            args: Prisma.MerchantLocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<MerchantLocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.MerchantLocationCountArgs<ExtArgs>
            result: $Utils.Optional<MerchantLocationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    merchantGroup?: MerchantGroupOmit
    merchantLocation?: MerchantLocationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MerchantGroupCountOutputType
   */

  export type MerchantGroupCountOutputType = {
    locations: number
  }

  export type MerchantGroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    locations?: boolean | MerchantGroupCountOutputTypeCountLocationsArgs
  }

  // Custom InputTypes
  /**
   * MerchantGroupCountOutputType without action
   */
  export type MerchantGroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantGroupCountOutputType
     */
    select?: MerchantGroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MerchantGroupCountOutputType without action
   */
  export type MerchantGroupCountOutputTypeCountLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MerchantLocationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model MerchantGroup
   */

  export type AggregateMerchantGroup = {
    _count: MerchantGroupCountAggregateOutputType | null
    _min: MerchantGroupMinAggregateOutputType | null
    _max: MerchantGroupMaxAggregateOutputType | null
  }

  export type MerchantGroupMinAggregateOutputType = {
    uri: string | null
    externalId: string | null
    name: string | null
    logo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MerchantGroupMaxAggregateOutputType = {
    uri: string | null
    externalId: string | null
    name: string | null
    logo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MerchantGroupCountAggregateOutputType = {
    uri: number
    externalId: number
    name: number
    logo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MerchantGroupMinAggregateInputType = {
    uri?: true
    externalId?: true
    name?: true
    logo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MerchantGroupMaxAggregateInputType = {
    uri?: true
    externalId?: true
    name?: true
    logo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MerchantGroupCountAggregateInputType = {
    uri?: true
    externalId?: true
    name?: true
    logo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MerchantGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MerchantGroup to aggregate.
     */
    where?: MerchantGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerchantGroups to fetch.
     */
    orderBy?: MerchantGroupOrderByWithRelationInput | MerchantGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MerchantGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerchantGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerchantGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MerchantGroups
    **/
    _count?: true | MerchantGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MerchantGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MerchantGroupMaxAggregateInputType
  }

  export type GetMerchantGroupAggregateType<T extends MerchantGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateMerchantGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMerchantGroup[P]>
      : GetScalarType<T[P], AggregateMerchantGroup[P]>
  }




  export type MerchantGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MerchantGroupWhereInput
    orderBy?: MerchantGroupOrderByWithAggregationInput | MerchantGroupOrderByWithAggregationInput[]
    by: MerchantGroupScalarFieldEnum[] | MerchantGroupScalarFieldEnum
    having?: MerchantGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MerchantGroupCountAggregateInputType | true
    _min?: MerchantGroupMinAggregateInputType
    _max?: MerchantGroupMaxAggregateInputType
  }

  export type MerchantGroupGroupByOutputType = {
    uri: string
    externalId: string | null
    name: string
    logo: string | null
    createdAt: Date
    updatedAt: Date
    _count: MerchantGroupCountAggregateOutputType | null
    _min: MerchantGroupMinAggregateOutputType | null
    _max: MerchantGroupMaxAggregateOutputType | null
  }

  type GetMerchantGroupGroupByPayload<T extends MerchantGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MerchantGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MerchantGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MerchantGroupGroupByOutputType[P]>
            : GetScalarType<T[P], MerchantGroupGroupByOutputType[P]>
        }
      >
    >


  export type MerchantGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uri?: boolean
    externalId?: boolean
    name?: boolean
    logo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    locations?: boolean | MerchantGroup$locationsArgs<ExtArgs>
    _count?: boolean | MerchantGroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["merchantGroup"]>

  export type MerchantGroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uri?: boolean
    externalId?: boolean
    name?: boolean
    logo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["merchantGroup"]>

  export type MerchantGroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uri?: boolean
    externalId?: boolean
    name?: boolean
    logo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["merchantGroup"]>

  export type MerchantGroupSelectScalar = {
    uri?: boolean
    externalId?: boolean
    name?: boolean
    logo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MerchantGroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"uri" | "externalId" | "name" | "logo" | "createdAt" | "updatedAt", ExtArgs["result"]["merchantGroup"]>
  export type MerchantGroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    locations?: boolean | MerchantGroup$locationsArgs<ExtArgs>
    _count?: boolean | MerchantGroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MerchantGroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MerchantGroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MerchantGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MerchantGroup"
    objects: {
      locations: Prisma.$MerchantLocationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      uri: string
      externalId: string | null
      name: string
      logo: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["merchantGroup"]>
    composites: {}
  }

  type MerchantGroupGetPayload<S extends boolean | null | undefined | MerchantGroupDefaultArgs> = $Result.GetResult<Prisma.$MerchantGroupPayload, S>

  type MerchantGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MerchantGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MerchantGroupCountAggregateInputType | true
    }

  export interface MerchantGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MerchantGroup'], meta: { name: 'MerchantGroup' } }
    /**
     * Find zero or one MerchantGroup that matches the filter.
     * @param {MerchantGroupFindUniqueArgs} args - Arguments to find a MerchantGroup
     * @example
     * // Get one MerchantGroup
     * const merchantGroup = await prisma.merchantGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MerchantGroupFindUniqueArgs>(args: SelectSubset<T, MerchantGroupFindUniqueArgs<ExtArgs>>): Prisma__MerchantGroupClient<$Result.GetResult<Prisma.$MerchantGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MerchantGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MerchantGroupFindUniqueOrThrowArgs} args - Arguments to find a MerchantGroup
     * @example
     * // Get one MerchantGroup
     * const merchantGroup = await prisma.merchantGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MerchantGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, MerchantGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MerchantGroupClient<$Result.GetResult<Prisma.$MerchantGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MerchantGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantGroupFindFirstArgs} args - Arguments to find a MerchantGroup
     * @example
     * // Get one MerchantGroup
     * const merchantGroup = await prisma.merchantGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MerchantGroupFindFirstArgs>(args?: SelectSubset<T, MerchantGroupFindFirstArgs<ExtArgs>>): Prisma__MerchantGroupClient<$Result.GetResult<Prisma.$MerchantGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MerchantGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantGroupFindFirstOrThrowArgs} args - Arguments to find a MerchantGroup
     * @example
     * // Get one MerchantGroup
     * const merchantGroup = await prisma.merchantGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MerchantGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, MerchantGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__MerchantGroupClient<$Result.GetResult<Prisma.$MerchantGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MerchantGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MerchantGroups
     * const merchantGroups = await prisma.merchantGroup.findMany()
     * 
     * // Get first 10 MerchantGroups
     * const merchantGroups = await prisma.merchantGroup.findMany({ take: 10 })
     * 
     * // Only select the `uri`
     * const merchantGroupWithUriOnly = await prisma.merchantGroup.findMany({ select: { uri: true } })
     * 
     */
    findMany<T extends MerchantGroupFindManyArgs>(args?: SelectSubset<T, MerchantGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerchantGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MerchantGroup.
     * @param {MerchantGroupCreateArgs} args - Arguments to create a MerchantGroup.
     * @example
     * // Create one MerchantGroup
     * const MerchantGroup = await prisma.merchantGroup.create({
     *   data: {
     *     // ... data to create a MerchantGroup
     *   }
     * })
     * 
     */
    create<T extends MerchantGroupCreateArgs>(args: SelectSubset<T, MerchantGroupCreateArgs<ExtArgs>>): Prisma__MerchantGroupClient<$Result.GetResult<Prisma.$MerchantGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MerchantGroups.
     * @param {MerchantGroupCreateManyArgs} args - Arguments to create many MerchantGroups.
     * @example
     * // Create many MerchantGroups
     * const merchantGroup = await prisma.merchantGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MerchantGroupCreateManyArgs>(args?: SelectSubset<T, MerchantGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MerchantGroups and returns the data saved in the database.
     * @param {MerchantGroupCreateManyAndReturnArgs} args - Arguments to create many MerchantGroups.
     * @example
     * // Create many MerchantGroups
     * const merchantGroup = await prisma.merchantGroup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MerchantGroups and only return the `uri`
     * const merchantGroupWithUriOnly = await prisma.merchantGroup.createManyAndReturn({
     *   select: { uri: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MerchantGroupCreateManyAndReturnArgs>(args?: SelectSubset<T, MerchantGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerchantGroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MerchantGroup.
     * @param {MerchantGroupDeleteArgs} args - Arguments to delete one MerchantGroup.
     * @example
     * // Delete one MerchantGroup
     * const MerchantGroup = await prisma.merchantGroup.delete({
     *   where: {
     *     // ... filter to delete one MerchantGroup
     *   }
     * })
     * 
     */
    delete<T extends MerchantGroupDeleteArgs>(args: SelectSubset<T, MerchantGroupDeleteArgs<ExtArgs>>): Prisma__MerchantGroupClient<$Result.GetResult<Prisma.$MerchantGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MerchantGroup.
     * @param {MerchantGroupUpdateArgs} args - Arguments to update one MerchantGroup.
     * @example
     * // Update one MerchantGroup
     * const merchantGroup = await prisma.merchantGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MerchantGroupUpdateArgs>(args: SelectSubset<T, MerchantGroupUpdateArgs<ExtArgs>>): Prisma__MerchantGroupClient<$Result.GetResult<Prisma.$MerchantGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MerchantGroups.
     * @param {MerchantGroupDeleteManyArgs} args - Arguments to filter MerchantGroups to delete.
     * @example
     * // Delete a few MerchantGroups
     * const { count } = await prisma.merchantGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MerchantGroupDeleteManyArgs>(args?: SelectSubset<T, MerchantGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MerchantGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MerchantGroups
     * const merchantGroup = await prisma.merchantGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MerchantGroupUpdateManyArgs>(args: SelectSubset<T, MerchantGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MerchantGroups and returns the data updated in the database.
     * @param {MerchantGroupUpdateManyAndReturnArgs} args - Arguments to update many MerchantGroups.
     * @example
     * // Update many MerchantGroups
     * const merchantGroup = await prisma.merchantGroup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MerchantGroups and only return the `uri`
     * const merchantGroupWithUriOnly = await prisma.merchantGroup.updateManyAndReturn({
     *   select: { uri: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MerchantGroupUpdateManyAndReturnArgs>(args: SelectSubset<T, MerchantGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerchantGroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MerchantGroup.
     * @param {MerchantGroupUpsertArgs} args - Arguments to update or create a MerchantGroup.
     * @example
     * // Update or create a MerchantGroup
     * const merchantGroup = await prisma.merchantGroup.upsert({
     *   create: {
     *     // ... data to create a MerchantGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MerchantGroup we want to update
     *   }
     * })
     */
    upsert<T extends MerchantGroupUpsertArgs>(args: SelectSubset<T, MerchantGroupUpsertArgs<ExtArgs>>): Prisma__MerchantGroupClient<$Result.GetResult<Prisma.$MerchantGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MerchantGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantGroupCountArgs} args - Arguments to filter MerchantGroups to count.
     * @example
     * // Count the number of MerchantGroups
     * const count = await prisma.merchantGroup.count({
     *   where: {
     *     // ... the filter for the MerchantGroups we want to count
     *   }
     * })
    **/
    count<T extends MerchantGroupCountArgs>(
      args?: Subset<T, MerchantGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MerchantGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MerchantGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MerchantGroupAggregateArgs>(args: Subset<T, MerchantGroupAggregateArgs>): Prisma.PrismaPromise<GetMerchantGroupAggregateType<T>>

    /**
     * Group by MerchantGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantGroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MerchantGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MerchantGroupGroupByArgs['orderBy'] }
        : { orderBy?: MerchantGroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MerchantGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMerchantGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MerchantGroup model
   */
  readonly fields: MerchantGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MerchantGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MerchantGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    locations<T extends MerchantGroup$locationsArgs<ExtArgs> = {}>(args?: Subset<T, MerchantGroup$locationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerchantLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MerchantGroup model
   */
  interface MerchantGroupFieldRefs {
    readonly uri: FieldRef<"MerchantGroup", 'String'>
    readonly externalId: FieldRef<"MerchantGroup", 'String'>
    readonly name: FieldRef<"MerchantGroup", 'String'>
    readonly logo: FieldRef<"MerchantGroup", 'String'>
    readonly createdAt: FieldRef<"MerchantGroup", 'DateTime'>
    readonly updatedAt: FieldRef<"MerchantGroup", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MerchantGroup findUnique
   */
  export type MerchantGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantGroup
     */
    select?: MerchantGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantGroup
     */
    omit?: MerchantGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantGroupInclude<ExtArgs> | null
    /**
     * Filter, which MerchantGroup to fetch.
     */
    where: MerchantGroupWhereUniqueInput
  }

  /**
   * MerchantGroup findUniqueOrThrow
   */
  export type MerchantGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantGroup
     */
    select?: MerchantGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantGroup
     */
    omit?: MerchantGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantGroupInclude<ExtArgs> | null
    /**
     * Filter, which MerchantGroup to fetch.
     */
    where: MerchantGroupWhereUniqueInput
  }

  /**
   * MerchantGroup findFirst
   */
  export type MerchantGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantGroup
     */
    select?: MerchantGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantGroup
     */
    omit?: MerchantGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantGroupInclude<ExtArgs> | null
    /**
     * Filter, which MerchantGroup to fetch.
     */
    where?: MerchantGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerchantGroups to fetch.
     */
    orderBy?: MerchantGroupOrderByWithRelationInput | MerchantGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MerchantGroups.
     */
    cursor?: MerchantGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerchantGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerchantGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MerchantGroups.
     */
    distinct?: MerchantGroupScalarFieldEnum | MerchantGroupScalarFieldEnum[]
  }

  /**
   * MerchantGroup findFirstOrThrow
   */
  export type MerchantGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantGroup
     */
    select?: MerchantGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantGroup
     */
    omit?: MerchantGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantGroupInclude<ExtArgs> | null
    /**
     * Filter, which MerchantGroup to fetch.
     */
    where?: MerchantGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerchantGroups to fetch.
     */
    orderBy?: MerchantGroupOrderByWithRelationInput | MerchantGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MerchantGroups.
     */
    cursor?: MerchantGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerchantGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerchantGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MerchantGroups.
     */
    distinct?: MerchantGroupScalarFieldEnum | MerchantGroupScalarFieldEnum[]
  }

  /**
   * MerchantGroup findMany
   */
  export type MerchantGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantGroup
     */
    select?: MerchantGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantGroup
     */
    omit?: MerchantGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantGroupInclude<ExtArgs> | null
    /**
     * Filter, which MerchantGroups to fetch.
     */
    where?: MerchantGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerchantGroups to fetch.
     */
    orderBy?: MerchantGroupOrderByWithRelationInput | MerchantGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MerchantGroups.
     */
    cursor?: MerchantGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerchantGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerchantGroups.
     */
    skip?: number
    distinct?: MerchantGroupScalarFieldEnum | MerchantGroupScalarFieldEnum[]
  }

  /**
   * MerchantGroup create
   */
  export type MerchantGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantGroup
     */
    select?: MerchantGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantGroup
     */
    omit?: MerchantGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantGroupInclude<ExtArgs> | null
    /**
     * The data needed to create a MerchantGroup.
     */
    data: XOR<MerchantGroupCreateInput, MerchantGroupUncheckedCreateInput>
  }

  /**
   * MerchantGroup createMany
   */
  export type MerchantGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MerchantGroups.
     */
    data: MerchantGroupCreateManyInput | MerchantGroupCreateManyInput[]
  }

  /**
   * MerchantGroup createManyAndReturn
   */
  export type MerchantGroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantGroup
     */
    select?: MerchantGroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantGroup
     */
    omit?: MerchantGroupOmit<ExtArgs> | null
    /**
     * The data used to create many MerchantGroups.
     */
    data: MerchantGroupCreateManyInput | MerchantGroupCreateManyInput[]
  }

  /**
   * MerchantGroup update
   */
  export type MerchantGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantGroup
     */
    select?: MerchantGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantGroup
     */
    omit?: MerchantGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantGroupInclude<ExtArgs> | null
    /**
     * The data needed to update a MerchantGroup.
     */
    data: XOR<MerchantGroupUpdateInput, MerchantGroupUncheckedUpdateInput>
    /**
     * Choose, which MerchantGroup to update.
     */
    where: MerchantGroupWhereUniqueInput
  }

  /**
   * MerchantGroup updateMany
   */
  export type MerchantGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MerchantGroups.
     */
    data: XOR<MerchantGroupUpdateManyMutationInput, MerchantGroupUncheckedUpdateManyInput>
    /**
     * Filter which MerchantGroups to update
     */
    where?: MerchantGroupWhereInput
    /**
     * Limit how many MerchantGroups to update.
     */
    limit?: number
  }

  /**
   * MerchantGroup updateManyAndReturn
   */
  export type MerchantGroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantGroup
     */
    select?: MerchantGroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantGroup
     */
    omit?: MerchantGroupOmit<ExtArgs> | null
    /**
     * The data used to update MerchantGroups.
     */
    data: XOR<MerchantGroupUpdateManyMutationInput, MerchantGroupUncheckedUpdateManyInput>
    /**
     * Filter which MerchantGroups to update
     */
    where?: MerchantGroupWhereInput
    /**
     * Limit how many MerchantGroups to update.
     */
    limit?: number
  }

  /**
   * MerchantGroup upsert
   */
  export type MerchantGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantGroup
     */
    select?: MerchantGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantGroup
     */
    omit?: MerchantGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantGroupInclude<ExtArgs> | null
    /**
     * The filter to search for the MerchantGroup to update in case it exists.
     */
    where: MerchantGroupWhereUniqueInput
    /**
     * In case the MerchantGroup found by the `where` argument doesn't exist, create a new MerchantGroup with this data.
     */
    create: XOR<MerchantGroupCreateInput, MerchantGroupUncheckedCreateInput>
    /**
     * In case the MerchantGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MerchantGroupUpdateInput, MerchantGroupUncheckedUpdateInput>
  }

  /**
   * MerchantGroup delete
   */
  export type MerchantGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantGroup
     */
    select?: MerchantGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantGroup
     */
    omit?: MerchantGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantGroupInclude<ExtArgs> | null
    /**
     * Filter which MerchantGroup to delete.
     */
    where: MerchantGroupWhereUniqueInput
  }

  /**
   * MerchantGroup deleteMany
   */
  export type MerchantGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MerchantGroups to delete
     */
    where?: MerchantGroupWhereInput
    /**
     * Limit how many MerchantGroups to delete.
     */
    limit?: number
  }

  /**
   * MerchantGroup.locations
   */
  export type MerchantGroup$locationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantLocation
     */
    select?: MerchantLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantLocation
     */
    omit?: MerchantLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantLocationInclude<ExtArgs> | null
    where?: MerchantLocationWhereInput
    orderBy?: MerchantLocationOrderByWithRelationInput | MerchantLocationOrderByWithRelationInput[]
    cursor?: MerchantLocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MerchantLocationScalarFieldEnum | MerchantLocationScalarFieldEnum[]
  }

  /**
   * MerchantGroup without action
   */
  export type MerchantGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantGroup
     */
    select?: MerchantGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantGroup
     */
    omit?: MerchantGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantGroupInclude<ExtArgs> | null
  }


  /**
   * Model MerchantLocation
   */

  export type AggregateMerchantLocation = {
    _count: MerchantLocationCountAggregateOutputType | null
    _avg: MerchantLocationAvgAggregateOutputType | null
    _sum: MerchantLocationSumAggregateOutputType | null
    _min: MerchantLocationMinAggregateOutputType | null
    _max: MerchantLocationMaxAggregateOutputType | null
  }

  export type MerchantLocationAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type MerchantLocationSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type MerchantLocationMinAggregateOutputType = {
    uri: string | null
    externalId: string | null
    name: string | null
    timezone: string | null
    latitude: number | null
    longitude: number | null
    groupUri: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MerchantLocationMaxAggregateOutputType = {
    uri: string | null
    externalId: string | null
    name: string | null
    timezone: string | null
    latitude: number | null
    longitude: number | null
    groupUri: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MerchantLocationCountAggregateOutputType = {
    uri: number
    externalId: number
    name: number
    address: number
    timezone: number
    latitude: number
    longitude: number
    media: number
    groupUri: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MerchantLocationAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type MerchantLocationSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type MerchantLocationMinAggregateInputType = {
    uri?: true
    externalId?: true
    name?: true
    timezone?: true
    latitude?: true
    longitude?: true
    groupUri?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MerchantLocationMaxAggregateInputType = {
    uri?: true
    externalId?: true
    name?: true
    timezone?: true
    latitude?: true
    longitude?: true
    groupUri?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MerchantLocationCountAggregateInputType = {
    uri?: true
    externalId?: true
    name?: true
    address?: true
    timezone?: true
    latitude?: true
    longitude?: true
    media?: true
    groupUri?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MerchantLocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MerchantLocation to aggregate.
     */
    where?: MerchantLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerchantLocations to fetch.
     */
    orderBy?: MerchantLocationOrderByWithRelationInput | MerchantLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MerchantLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerchantLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerchantLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MerchantLocations
    **/
    _count?: true | MerchantLocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MerchantLocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MerchantLocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MerchantLocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MerchantLocationMaxAggregateInputType
  }

  export type GetMerchantLocationAggregateType<T extends MerchantLocationAggregateArgs> = {
        [P in keyof T & keyof AggregateMerchantLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMerchantLocation[P]>
      : GetScalarType<T[P], AggregateMerchantLocation[P]>
  }




  export type MerchantLocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MerchantLocationWhereInput
    orderBy?: MerchantLocationOrderByWithAggregationInput | MerchantLocationOrderByWithAggregationInput[]
    by: MerchantLocationScalarFieldEnum[] | MerchantLocationScalarFieldEnum
    having?: MerchantLocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MerchantLocationCountAggregateInputType | true
    _avg?: MerchantLocationAvgAggregateInputType
    _sum?: MerchantLocationSumAggregateInputType
    _min?: MerchantLocationMinAggregateInputType
    _max?: MerchantLocationMaxAggregateInputType
  }

  export type MerchantLocationGroupByOutputType = {
    uri: string
    externalId: string | null
    name: string
    address: JsonValue
    timezone: string
    latitude: number
    longitude: number
    media: JsonValue | null
    groupUri: string
    createdAt: Date
    updatedAt: Date
    _count: MerchantLocationCountAggregateOutputType | null
    _avg: MerchantLocationAvgAggregateOutputType | null
    _sum: MerchantLocationSumAggregateOutputType | null
    _min: MerchantLocationMinAggregateOutputType | null
    _max: MerchantLocationMaxAggregateOutputType | null
  }

  type GetMerchantLocationGroupByPayload<T extends MerchantLocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MerchantLocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MerchantLocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MerchantLocationGroupByOutputType[P]>
            : GetScalarType<T[P], MerchantLocationGroupByOutputType[P]>
        }
      >
    >


  export type MerchantLocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uri?: boolean
    externalId?: boolean
    name?: boolean
    address?: boolean
    timezone?: boolean
    latitude?: boolean
    longitude?: boolean
    media?: boolean
    groupUri?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    group?: boolean | MerchantGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["merchantLocation"]>

  export type MerchantLocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uri?: boolean
    externalId?: boolean
    name?: boolean
    address?: boolean
    timezone?: boolean
    latitude?: boolean
    longitude?: boolean
    media?: boolean
    groupUri?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    group?: boolean | MerchantGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["merchantLocation"]>

  export type MerchantLocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uri?: boolean
    externalId?: boolean
    name?: boolean
    address?: boolean
    timezone?: boolean
    latitude?: boolean
    longitude?: boolean
    media?: boolean
    groupUri?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    group?: boolean | MerchantGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["merchantLocation"]>

  export type MerchantLocationSelectScalar = {
    uri?: boolean
    externalId?: boolean
    name?: boolean
    address?: boolean
    timezone?: boolean
    latitude?: boolean
    longitude?: boolean
    media?: boolean
    groupUri?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MerchantLocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"uri" | "externalId" | "name" | "address" | "timezone" | "latitude" | "longitude" | "media" | "groupUri" | "createdAt" | "updatedAt", ExtArgs["result"]["merchantLocation"]>
  export type MerchantLocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | MerchantGroupDefaultArgs<ExtArgs>
  }
  export type MerchantLocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | MerchantGroupDefaultArgs<ExtArgs>
  }
  export type MerchantLocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | MerchantGroupDefaultArgs<ExtArgs>
  }

  export type $MerchantLocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MerchantLocation"
    objects: {
      group: Prisma.$MerchantGroupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      uri: string
      externalId: string | null
      name: string
      address: Prisma.JsonValue
      timezone: string
      latitude: number
      longitude: number
      media: Prisma.JsonValue | null
      groupUri: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["merchantLocation"]>
    composites: {}
  }

  type MerchantLocationGetPayload<S extends boolean | null | undefined | MerchantLocationDefaultArgs> = $Result.GetResult<Prisma.$MerchantLocationPayload, S>

  type MerchantLocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MerchantLocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MerchantLocationCountAggregateInputType | true
    }

  export interface MerchantLocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MerchantLocation'], meta: { name: 'MerchantLocation' } }
    /**
     * Find zero or one MerchantLocation that matches the filter.
     * @param {MerchantLocationFindUniqueArgs} args - Arguments to find a MerchantLocation
     * @example
     * // Get one MerchantLocation
     * const merchantLocation = await prisma.merchantLocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MerchantLocationFindUniqueArgs>(args: SelectSubset<T, MerchantLocationFindUniqueArgs<ExtArgs>>): Prisma__MerchantLocationClient<$Result.GetResult<Prisma.$MerchantLocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MerchantLocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MerchantLocationFindUniqueOrThrowArgs} args - Arguments to find a MerchantLocation
     * @example
     * // Get one MerchantLocation
     * const merchantLocation = await prisma.merchantLocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MerchantLocationFindUniqueOrThrowArgs>(args: SelectSubset<T, MerchantLocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MerchantLocationClient<$Result.GetResult<Prisma.$MerchantLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MerchantLocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantLocationFindFirstArgs} args - Arguments to find a MerchantLocation
     * @example
     * // Get one MerchantLocation
     * const merchantLocation = await prisma.merchantLocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MerchantLocationFindFirstArgs>(args?: SelectSubset<T, MerchantLocationFindFirstArgs<ExtArgs>>): Prisma__MerchantLocationClient<$Result.GetResult<Prisma.$MerchantLocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MerchantLocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantLocationFindFirstOrThrowArgs} args - Arguments to find a MerchantLocation
     * @example
     * // Get one MerchantLocation
     * const merchantLocation = await prisma.merchantLocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MerchantLocationFindFirstOrThrowArgs>(args?: SelectSubset<T, MerchantLocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__MerchantLocationClient<$Result.GetResult<Prisma.$MerchantLocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MerchantLocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantLocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MerchantLocations
     * const merchantLocations = await prisma.merchantLocation.findMany()
     * 
     * // Get first 10 MerchantLocations
     * const merchantLocations = await prisma.merchantLocation.findMany({ take: 10 })
     * 
     * // Only select the `uri`
     * const merchantLocationWithUriOnly = await prisma.merchantLocation.findMany({ select: { uri: true } })
     * 
     */
    findMany<T extends MerchantLocationFindManyArgs>(args?: SelectSubset<T, MerchantLocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerchantLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MerchantLocation.
     * @param {MerchantLocationCreateArgs} args - Arguments to create a MerchantLocation.
     * @example
     * // Create one MerchantLocation
     * const MerchantLocation = await prisma.merchantLocation.create({
     *   data: {
     *     // ... data to create a MerchantLocation
     *   }
     * })
     * 
     */
    create<T extends MerchantLocationCreateArgs>(args: SelectSubset<T, MerchantLocationCreateArgs<ExtArgs>>): Prisma__MerchantLocationClient<$Result.GetResult<Prisma.$MerchantLocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MerchantLocations.
     * @param {MerchantLocationCreateManyArgs} args - Arguments to create many MerchantLocations.
     * @example
     * // Create many MerchantLocations
     * const merchantLocation = await prisma.merchantLocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MerchantLocationCreateManyArgs>(args?: SelectSubset<T, MerchantLocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MerchantLocations and returns the data saved in the database.
     * @param {MerchantLocationCreateManyAndReturnArgs} args - Arguments to create many MerchantLocations.
     * @example
     * // Create many MerchantLocations
     * const merchantLocation = await prisma.merchantLocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MerchantLocations and only return the `uri`
     * const merchantLocationWithUriOnly = await prisma.merchantLocation.createManyAndReturn({
     *   select: { uri: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MerchantLocationCreateManyAndReturnArgs>(args?: SelectSubset<T, MerchantLocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerchantLocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MerchantLocation.
     * @param {MerchantLocationDeleteArgs} args - Arguments to delete one MerchantLocation.
     * @example
     * // Delete one MerchantLocation
     * const MerchantLocation = await prisma.merchantLocation.delete({
     *   where: {
     *     // ... filter to delete one MerchantLocation
     *   }
     * })
     * 
     */
    delete<T extends MerchantLocationDeleteArgs>(args: SelectSubset<T, MerchantLocationDeleteArgs<ExtArgs>>): Prisma__MerchantLocationClient<$Result.GetResult<Prisma.$MerchantLocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MerchantLocation.
     * @param {MerchantLocationUpdateArgs} args - Arguments to update one MerchantLocation.
     * @example
     * // Update one MerchantLocation
     * const merchantLocation = await prisma.merchantLocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MerchantLocationUpdateArgs>(args: SelectSubset<T, MerchantLocationUpdateArgs<ExtArgs>>): Prisma__MerchantLocationClient<$Result.GetResult<Prisma.$MerchantLocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MerchantLocations.
     * @param {MerchantLocationDeleteManyArgs} args - Arguments to filter MerchantLocations to delete.
     * @example
     * // Delete a few MerchantLocations
     * const { count } = await prisma.merchantLocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MerchantLocationDeleteManyArgs>(args?: SelectSubset<T, MerchantLocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MerchantLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantLocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MerchantLocations
     * const merchantLocation = await prisma.merchantLocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MerchantLocationUpdateManyArgs>(args: SelectSubset<T, MerchantLocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MerchantLocations and returns the data updated in the database.
     * @param {MerchantLocationUpdateManyAndReturnArgs} args - Arguments to update many MerchantLocations.
     * @example
     * // Update many MerchantLocations
     * const merchantLocation = await prisma.merchantLocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MerchantLocations and only return the `uri`
     * const merchantLocationWithUriOnly = await prisma.merchantLocation.updateManyAndReturn({
     *   select: { uri: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MerchantLocationUpdateManyAndReturnArgs>(args: SelectSubset<T, MerchantLocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerchantLocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MerchantLocation.
     * @param {MerchantLocationUpsertArgs} args - Arguments to update or create a MerchantLocation.
     * @example
     * // Update or create a MerchantLocation
     * const merchantLocation = await prisma.merchantLocation.upsert({
     *   create: {
     *     // ... data to create a MerchantLocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MerchantLocation we want to update
     *   }
     * })
     */
    upsert<T extends MerchantLocationUpsertArgs>(args: SelectSubset<T, MerchantLocationUpsertArgs<ExtArgs>>): Prisma__MerchantLocationClient<$Result.GetResult<Prisma.$MerchantLocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MerchantLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantLocationCountArgs} args - Arguments to filter MerchantLocations to count.
     * @example
     * // Count the number of MerchantLocations
     * const count = await prisma.merchantLocation.count({
     *   where: {
     *     // ... the filter for the MerchantLocations we want to count
     *   }
     * })
    **/
    count<T extends MerchantLocationCountArgs>(
      args?: Subset<T, MerchantLocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MerchantLocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MerchantLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantLocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MerchantLocationAggregateArgs>(args: Subset<T, MerchantLocationAggregateArgs>): Prisma.PrismaPromise<GetMerchantLocationAggregateType<T>>

    /**
     * Group by MerchantLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerchantLocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MerchantLocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MerchantLocationGroupByArgs['orderBy'] }
        : { orderBy?: MerchantLocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MerchantLocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMerchantLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MerchantLocation model
   */
  readonly fields: MerchantLocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MerchantLocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MerchantLocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends MerchantGroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MerchantGroupDefaultArgs<ExtArgs>>): Prisma__MerchantGroupClient<$Result.GetResult<Prisma.$MerchantGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MerchantLocation model
   */
  interface MerchantLocationFieldRefs {
    readonly uri: FieldRef<"MerchantLocation", 'String'>
    readonly externalId: FieldRef<"MerchantLocation", 'String'>
    readonly name: FieldRef<"MerchantLocation", 'String'>
    readonly address: FieldRef<"MerchantLocation", 'Json'>
    readonly timezone: FieldRef<"MerchantLocation", 'String'>
    readonly latitude: FieldRef<"MerchantLocation", 'Float'>
    readonly longitude: FieldRef<"MerchantLocation", 'Float'>
    readonly media: FieldRef<"MerchantLocation", 'Json'>
    readonly groupUri: FieldRef<"MerchantLocation", 'String'>
    readonly createdAt: FieldRef<"MerchantLocation", 'DateTime'>
    readonly updatedAt: FieldRef<"MerchantLocation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MerchantLocation findUnique
   */
  export type MerchantLocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantLocation
     */
    select?: MerchantLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantLocation
     */
    omit?: MerchantLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantLocationInclude<ExtArgs> | null
    /**
     * Filter, which MerchantLocation to fetch.
     */
    where: MerchantLocationWhereUniqueInput
  }

  /**
   * MerchantLocation findUniqueOrThrow
   */
  export type MerchantLocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantLocation
     */
    select?: MerchantLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantLocation
     */
    omit?: MerchantLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantLocationInclude<ExtArgs> | null
    /**
     * Filter, which MerchantLocation to fetch.
     */
    where: MerchantLocationWhereUniqueInput
  }

  /**
   * MerchantLocation findFirst
   */
  export type MerchantLocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantLocation
     */
    select?: MerchantLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantLocation
     */
    omit?: MerchantLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantLocationInclude<ExtArgs> | null
    /**
     * Filter, which MerchantLocation to fetch.
     */
    where?: MerchantLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerchantLocations to fetch.
     */
    orderBy?: MerchantLocationOrderByWithRelationInput | MerchantLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MerchantLocations.
     */
    cursor?: MerchantLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerchantLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerchantLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MerchantLocations.
     */
    distinct?: MerchantLocationScalarFieldEnum | MerchantLocationScalarFieldEnum[]
  }

  /**
   * MerchantLocation findFirstOrThrow
   */
  export type MerchantLocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantLocation
     */
    select?: MerchantLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantLocation
     */
    omit?: MerchantLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantLocationInclude<ExtArgs> | null
    /**
     * Filter, which MerchantLocation to fetch.
     */
    where?: MerchantLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerchantLocations to fetch.
     */
    orderBy?: MerchantLocationOrderByWithRelationInput | MerchantLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MerchantLocations.
     */
    cursor?: MerchantLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerchantLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerchantLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MerchantLocations.
     */
    distinct?: MerchantLocationScalarFieldEnum | MerchantLocationScalarFieldEnum[]
  }

  /**
   * MerchantLocation findMany
   */
  export type MerchantLocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantLocation
     */
    select?: MerchantLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantLocation
     */
    omit?: MerchantLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantLocationInclude<ExtArgs> | null
    /**
     * Filter, which MerchantLocations to fetch.
     */
    where?: MerchantLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerchantLocations to fetch.
     */
    orderBy?: MerchantLocationOrderByWithRelationInput | MerchantLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MerchantLocations.
     */
    cursor?: MerchantLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerchantLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerchantLocations.
     */
    skip?: number
    distinct?: MerchantLocationScalarFieldEnum | MerchantLocationScalarFieldEnum[]
  }

  /**
   * MerchantLocation create
   */
  export type MerchantLocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantLocation
     */
    select?: MerchantLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantLocation
     */
    omit?: MerchantLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantLocationInclude<ExtArgs> | null
    /**
     * The data needed to create a MerchantLocation.
     */
    data: XOR<MerchantLocationCreateInput, MerchantLocationUncheckedCreateInput>
  }

  /**
   * MerchantLocation createMany
   */
  export type MerchantLocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MerchantLocations.
     */
    data: MerchantLocationCreateManyInput | MerchantLocationCreateManyInput[]
  }

  /**
   * MerchantLocation createManyAndReturn
   */
  export type MerchantLocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantLocation
     */
    select?: MerchantLocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantLocation
     */
    omit?: MerchantLocationOmit<ExtArgs> | null
    /**
     * The data used to create many MerchantLocations.
     */
    data: MerchantLocationCreateManyInput | MerchantLocationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantLocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MerchantLocation update
   */
  export type MerchantLocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantLocation
     */
    select?: MerchantLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantLocation
     */
    omit?: MerchantLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantLocationInclude<ExtArgs> | null
    /**
     * The data needed to update a MerchantLocation.
     */
    data: XOR<MerchantLocationUpdateInput, MerchantLocationUncheckedUpdateInput>
    /**
     * Choose, which MerchantLocation to update.
     */
    where: MerchantLocationWhereUniqueInput
  }

  /**
   * MerchantLocation updateMany
   */
  export type MerchantLocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MerchantLocations.
     */
    data: XOR<MerchantLocationUpdateManyMutationInput, MerchantLocationUncheckedUpdateManyInput>
    /**
     * Filter which MerchantLocations to update
     */
    where?: MerchantLocationWhereInput
    /**
     * Limit how many MerchantLocations to update.
     */
    limit?: number
  }

  /**
   * MerchantLocation updateManyAndReturn
   */
  export type MerchantLocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantLocation
     */
    select?: MerchantLocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantLocation
     */
    omit?: MerchantLocationOmit<ExtArgs> | null
    /**
     * The data used to update MerchantLocations.
     */
    data: XOR<MerchantLocationUpdateManyMutationInput, MerchantLocationUncheckedUpdateManyInput>
    /**
     * Filter which MerchantLocations to update
     */
    where?: MerchantLocationWhereInput
    /**
     * Limit how many MerchantLocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantLocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MerchantLocation upsert
   */
  export type MerchantLocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantLocation
     */
    select?: MerchantLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantLocation
     */
    omit?: MerchantLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantLocationInclude<ExtArgs> | null
    /**
     * The filter to search for the MerchantLocation to update in case it exists.
     */
    where: MerchantLocationWhereUniqueInput
    /**
     * In case the MerchantLocation found by the `where` argument doesn't exist, create a new MerchantLocation with this data.
     */
    create: XOR<MerchantLocationCreateInput, MerchantLocationUncheckedCreateInput>
    /**
     * In case the MerchantLocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MerchantLocationUpdateInput, MerchantLocationUncheckedUpdateInput>
  }

  /**
   * MerchantLocation delete
   */
  export type MerchantLocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantLocation
     */
    select?: MerchantLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantLocation
     */
    omit?: MerchantLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantLocationInclude<ExtArgs> | null
    /**
     * Filter which MerchantLocation to delete.
     */
    where: MerchantLocationWhereUniqueInput
  }

  /**
   * MerchantLocation deleteMany
   */
  export type MerchantLocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MerchantLocations to delete
     */
    where?: MerchantLocationWhereInput
    /**
     * Limit how many MerchantLocations to delete.
     */
    limit?: number
  }

  /**
   * MerchantLocation without action
   */
  export type MerchantLocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerchantLocation
     */
    select?: MerchantLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerchantLocation
     */
    omit?: MerchantLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MerchantLocationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MerchantGroupScalarFieldEnum: {
    uri: 'uri',
    externalId: 'externalId',
    name: 'name',
    logo: 'logo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MerchantGroupScalarFieldEnum = (typeof MerchantGroupScalarFieldEnum)[keyof typeof MerchantGroupScalarFieldEnum]


  export const MerchantLocationScalarFieldEnum: {
    uri: 'uri',
    externalId: 'externalId',
    name: 'name',
    address: 'address',
    timezone: 'timezone',
    latitude: 'latitude',
    longitude: 'longitude',
    media: 'media',
    groupUri: 'groupUri',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MerchantLocationScalarFieldEnum = (typeof MerchantLocationScalarFieldEnum)[keyof typeof MerchantLocationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type MerchantGroupWhereInput = {
    AND?: MerchantGroupWhereInput | MerchantGroupWhereInput[]
    OR?: MerchantGroupWhereInput[]
    NOT?: MerchantGroupWhereInput | MerchantGroupWhereInput[]
    uri?: StringFilter<"MerchantGroup"> | string
    externalId?: StringNullableFilter<"MerchantGroup"> | string | null
    name?: StringFilter<"MerchantGroup"> | string
    logo?: StringNullableFilter<"MerchantGroup"> | string | null
    createdAt?: DateTimeFilter<"MerchantGroup"> | Date | string
    updatedAt?: DateTimeFilter<"MerchantGroup"> | Date | string
    locations?: MerchantLocationListRelationFilter
  }

  export type MerchantGroupOrderByWithRelationInput = {
    uri?: SortOrder
    externalId?: SortOrderInput | SortOrder
    name?: SortOrder
    logo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    locations?: MerchantLocationOrderByRelationAggregateInput
  }

  export type MerchantGroupWhereUniqueInput = Prisma.AtLeast<{
    uri?: string
    AND?: MerchantGroupWhereInput | MerchantGroupWhereInput[]
    OR?: MerchantGroupWhereInput[]
    NOT?: MerchantGroupWhereInput | MerchantGroupWhereInput[]
    externalId?: StringNullableFilter<"MerchantGroup"> | string | null
    name?: StringFilter<"MerchantGroup"> | string
    logo?: StringNullableFilter<"MerchantGroup"> | string | null
    createdAt?: DateTimeFilter<"MerchantGroup"> | Date | string
    updatedAt?: DateTimeFilter<"MerchantGroup"> | Date | string
    locations?: MerchantLocationListRelationFilter
  }, "uri">

  export type MerchantGroupOrderByWithAggregationInput = {
    uri?: SortOrder
    externalId?: SortOrderInput | SortOrder
    name?: SortOrder
    logo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MerchantGroupCountOrderByAggregateInput
    _max?: MerchantGroupMaxOrderByAggregateInput
    _min?: MerchantGroupMinOrderByAggregateInput
  }

  export type MerchantGroupScalarWhereWithAggregatesInput = {
    AND?: MerchantGroupScalarWhereWithAggregatesInput | MerchantGroupScalarWhereWithAggregatesInput[]
    OR?: MerchantGroupScalarWhereWithAggregatesInput[]
    NOT?: MerchantGroupScalarWhereWithAggregatesInput | MerchantGroupScalarWhereWithAggregatesInput[]
    uri?: StringWithAggregatesFilter<"MerchantGroup"> | string
    externalId?: StringNullableWithAggregatesFilter<"MerchantGroup"> | string | null
    name?: StringWithAggregatesFilter<"MerchantGroup"> | string
    logo?: StringNullableWithAggregatesFilter<"MerchantGroup"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MerchantGroup"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MerchantGroup"> | Date | string
  }

  export type MerchantLocationWhereInput = {
    AND?: MerchantLocationWhereInput | MerchantLocationWhereInput[]
    OR?: MerchantLocationWhereInput[]
    NOT?: MerchantLocationWhereInput | MerchantLocationWhereInput[]
    uri?: StringFilter<"MerchantLocation"> | string
    externalId?: StringNullableFilter<"MerchantLocation"> | string | null
    name?: StringFilter<"MerchantLocation"> | string
    address?: JsonFilter<"MerchantLocation">
    timezone?: StringFilter<"MerchantLocation"> | string
    latitude?: FloatFilter<"MerchantLocation"> | number
    longitude?: FloatFilter<"MerchantLocation"> | number
    media?: JsonNullableFilter<"MerchantLocation">
    groupUri?: StringFilter<"MerchantLocation"> | string
    createdAt?: DateTimeFilter<"MerchantLocation"> | Date | string
    updatedAt?: DateTimeFilter<"MerchantLocation"> | Date | string
    group?: XOR<MerchantGroupScalarRelationFilter, MerchantGroupWhereInput>
  }

  export type MerchantLocationOrderByWithRelationInput = {
    uri?: SortOrder
    externalId?: SortOrderInput | SortOrder
    name?: SortOrder
    address?: SortOrder
    timezone?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    media?: SortOrderInput | SortOrder
    groupUri?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    group?: MerchantGroupOrderByWithRelationInput
  }

  export type MerchantLocationWhereUniqueInput = Prisma.AtLeast<{
    uri?: string
    AND?: MerchantLocationWhereInput | MerchantLocationWhereInput[]
    OR?: MerchantLocationWhereInput[]
    NOT?: MerchantLocationWhereInput | MerchantLocationWhereInput[]
    externalId?: StringNullableFilter<"MerchantLocation"> | string | null
    name?: StringFilter<"MerchantLocation"> | string
    address?: JsonFilter<"MerchantLocation">
    timezone?: StringFilter<"MerchantLocation"> | string
    latitude?: FloatFilter<"MerchantLocation"> | number
    longitude?: FloatFilter<"MerchantLocation"> | number
    media?: JsonNullableFilter<"MerchantLocation">
    groupUri?: StringFilter<"MerchantLocation"> | string
    createdAt?: DateTimeFilter<"MerchantLocation"> | Date | string
    updatedAt?: DateTimeFilter<"MerchantLocation"> | Date | string
    group?: XOR<MerchantGroupScalarRelationFilter, MerchantGroupWhereInput>
  }, "uri">

  export type MerchantLocationOrderByWithAggregationInput = {
    uri?: SortOrder
    externalId?: SortOrderInput | SortOrder
    name?: SortOrder
    address?: SortOrder
    timezone?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    media?: SortOrderInput | SortOrder
    groupUri?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MerchantLocationCountOrderByAggregateInput
    _avg?: MerchantLocationAvgOrderByAggregateInput
    _max?: MerchantLocationMaxOrderByAggregateInput
    _min?: MerchantLocationMinOrderByAggregateInput
    _sum?: MerchantLocationSumOrderByAggregateInput
  }

  export type MerchantLocationScalarWhereWithAggregatesInput = {
    AND?: MerchantLocationScalarWhereWithAggregatesInput | MerchantLocationScalarWhereWithAggregatesInput[]
    OR?: MerchantLocationScalarWhereWithAggregatesInput[]
    NOT?: MerchantLocationScalarWhereWithAggregatesInput | MerchantLocationScalarWhereWithAggregatesInput[]
    uri?: StringWithAggregatesFilter<"MerchantLocation"> | string
    externalId?: StringNullableWithAggregatesFilter<"MerchantLocation"> | string | null
    name?: StringWithAggregatesFilter<"MerchantLocation"> | string
    address?: JsonWithAggregatesFilter<"MerchantLocation">
    timezone?: StringWithAggregatesFilter<"MerchantLocation"> | string
    latitude?: FloatWithAggregatesFilter<"MerchantLocation"> | number
    longitude?: FloatWithAggregatesFilter<"MerchantLocation"> | number
    media?: JsonNullableWithAggregatesFilter<"MerchantLocation">
    groupUri?: StringWithAggregatesFilter<"MerchantLocation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MerchantLocation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MerchantLocation"> | Date | string
  }

  export type MerchantGroupCreateInput = {
    uri: string
    externalId?: string | null
    name: string
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: MerchantLocationCreateNestedManyWithoutGroupInput
  }

  export type MerchantGroupUncheckedCreateInput = {
    uri: string
    externalId?: string | null
    name: string
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: MerchantLocationUncheckedCreateNestedManyWithoutGroupInput
  }

  export type MerchantGroupUpdateInput = {
    uri?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: MerchantLocationUpdateManyWithoutGroupNestedInput
  }

  export type MerchantGroupUncheckedUpdateInput = {
    uri?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: MerchantLocationUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type MerchantGroupCreateManyInput = {
    uri: string
    externalId?: string | null
    name: string
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MerchantGroupUpdateManyMutationInput = {
    uri?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerchantGroupUncheckedUpdateManyInput = {
    uri?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerchantLocationCreateInput = {
    uri: string
    externalId?: string | null
    name: string
    address: JsonNullValueInput | InputJsonValue
    timezone: string
    latitude: number
    longitude: number
    media?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    group: MerchantGroupCreateNestedOneWithoutLocationsInput
  }

  export type MerchantLocationUncheckedCreateInput = {
    uri: string
    externalId?: string | null
    name: string
    address: JsonNullValueInput | InputJsonValue
    timezone: string
    latitude: number
    longitude: number
    media?: NullableJsonNullValueInput | InputJsonValue
    groupUri: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MerchantLocationUpdateInput = {
    uri?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: JsonNullValueInput | InputJsonValue
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    media?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: MerchantGroupUpdateOneRequiredWithoutLocationsNestedInput
  }

  export type MerchantLocationUncheckedUpdateInput = {
    uri?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: JsonNullValueInput | InputJsonValue
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    media?: NullableJsonNullValueInput | InputJsonValue
    groupUri?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerchantLocationCreateManyInput = {
    uri: string
    externalId?: string | null
    name: string
    address: JsonNullValueInput | InputJsonValue
    timezone: string
    latitude: number
    longitude: number
    media?: NullableJsonNullValueInput | InputJsonValue
    groupUri: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MerchantLocationUpdateManyMutationInput = {
    uri?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: JsonNullValueInput | InputJsonValue
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    media?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerchantLocationUncheckedUpdateManyInput = {
    uri?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: JsonNullValueInput | InputJsonValue
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    media?: NullableJsonNullValueInput | InputJsonValue
    groupUri?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MerchantLocationListRelationFilter = {
    every?: MerchantLocationWhereInput
    some?: MerchantLocationWhereInput
    none?: MerchantLocationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MerchantLocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MerchantGroupCountOrderByAggregateInput = {
    uri?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    logo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MerchantGroupMaxOrderByAggregateInput = {
    uri?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    logo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MerchantGroupMinOrderByAggregateInput = {
    uri?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    logo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MerchantGroupScalarRelationFilter = {
    is?: MerchantGroupWhereInput
    isNot?: MerchantGroupWhereInput
  }

  export type MerchantLocationCountOrderByAggregateInput = {
    uri?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    timezone?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    media?: SortOrder
    groupUri?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MerchantLocationAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type MerchantLocationMaxOrderByAggregateInput = {
    uri?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    timezone?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    groupUri?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MerchantLocationMinOrderByAggregateInput = {
    uri?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    timezone?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    groupUri?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MerchantLocationSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type MerchantLocationCreateNestedManyWithoutGroupInput = {
    create?: XOR<MerchantLocationCreateWithoutGroupInput, MerchantLocationUncheckedCreateWithoutGroupInput> | MerchantLocationCreateWithoutGroupInput[] | MerchantLocationUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: MerchantLocationCreateOrConnectWithoutGroupInput | MerchantLocationCreateOrConnectWithoutGroupInput[]
    createMany?: MerchantLocationCreateManyGroupInputEnvelope
    connect?: MerchantLocationWhereUniqueInput | MerchantLocationWhereUniqueInput[]
  }

  export type MerchantLocationUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<MerchantLocationCreateWithoutGroupInput, MerchantLocationUncheckedCreateWithoutGroupInput> | MerchantLocationCreateWithoutGroupInput[] | MerchantLocationUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: MerchantLocationCreateOrConnectWithoutGroupInput | MerchantLocationCreateOrConnectWithoutGroupInput[]
    createMany?: MerchantLocationCreateManyGroupInputEnvelope
    connect?: MerchantLocationWhereUniqueInput | MerchantLocationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MerchantLocationUpdateManyWithoutGroupNestedInput = {
    create?: XOR<MerchantLocationCreateWithoutGroupInput, MerchantLocationUncheckedCreateWithoutGroupInput> | MerchantLocationCreateWithoutGroupInput[] | MerchantLocationUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: MerchantLocationCreateOrConnectWithoutGroupInput | MerchantLocationCreateOrConnectWithoutGroupInput[]
    upsert?: MerchantLocationUpsertWithWhereUniqueWithoutGroupInput | MerchantLocationUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: MerchantLocationCreateManyGroupInputEnvelope
    set?: MerchantLocationWhereUniqueInput | MerchantLocationWhereUniqueInput[]
    disconnect?: MerchantLocationWhereUniqueInput | MerchantLocationWhereUniqueInput[]
    delete?: MerchantLocationWhereUniqueInput | MerchantLocationWhereUniqueInput[]
    connect?: MerchantLocationWhereUniqueInput | MerchantLocationWhereUniqueInput[]
    update?: MerchantLocationUpdateWithWhereUniqueWithoutGroupInput | MerchantLocationUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: MerchantLocationUpdateManyWithWhereWithoutGroupInput | MerchantLocationUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: MerchantLocationScalarWhereInput | MerchantLocationScalarWhereInput[]
  }

  export type MerchantLocationUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<MerchantLocationCreateWithoutGroupInput, MerchantLocationUncheckedCreateWithoutGroupInput> | MerchantLocationCreateWithoutGroupInput[] | MerchantLocationUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: MerchantLocationCreateOrConnectWithoutGroupInput | MerchantLocationCreateOrConnectWithoutGroupInput[]
    upsert?: MerchantLocationUpsertWithWhereUniqueWithoutGroupInput | MerchantLocationUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: MerchantLocationCreateManyGroupInputEnvelope
    set?: MerchantLocationWhereUniqueInput | MerchantLocationWhereUniqueInput[]
    disconnect?: MerchantLocationWhereUniqueInput | MerchantLocationWhereUniqueInput[]
    delete?: MerchantLocationWhereUniqueInput | MerchantLocationWhereUniqueInput[]
    connect?: MerchantLocationWhereUniqueInput | MerchantLocationWhereUniqueInput[]
    update?: MerchantLocationUpdateWithWhereUniqueWithoutGroupInput | MerchantLocationUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: MerchantLocationUpdateManyWithWhereWithoutGroupInput | MerchantLocationUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: MerchantLocationScalarWhereInput | MerchantLocationScalarWhereInput[]
  }

  export type MerchantGroupCreateNestedOneWithoutLocationsInput = {
    create?: XOR<MerchantGroupCreateWithoutLocationsInput, MerchantGroupUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: MerchantGroupCreateOrConnectWithoutLocationsInput
    connect?: MerchantGroupWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MerchantGroupUpdateOneRequiredWithoutLocationsNestedInput = {
    create?: XOR<MerchantGroupCreateWithoutLocationsInput, MerchantGroupUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: MerchantGroupCreateOrConnectWithoutLocationsInput
    upsert?: MerchantGroupUpsertWithoutLocationsInput
    connect?: MerchantGroupWhereUniqueInput
    update?: XOR<XOR<MerchantGroupUpdateToOneWithWhereWithoutLocationsInput, MerchantGroupUpdateWithoutLocationsInput>, MerchantGroupUncheckedUpdateWithoutLocationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MerchantLocationCreateWithoutGroupInput = {
    uri: string
    externalId?: string | null
    name: string
    address: JsonNullValueInput | InputJsonValue
    timezone: string
    latitude: number
    longitude: number
    media?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MerchantLocationUncheckedCreateWithoutGroupInput = {
    uri: string
    externalId?: string | null
    name: string
    address: JsonNullValueInput | InputJsonValue
    timezone: string
    latitude: number
    longitude: number
    media?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MerchantLocationCreateOrConnectWithoutGroupInput = {
    where: MerchantLocationWhereUniqueInput
    create: XOR<MerchantLocationCreateWithoutGroupInput, MerchantLocationUncheckedCreateWithoutGroupInput>
  }

  export type MerchantLocationCreateManyGroupInputEnvelope = {
    data: MerchantLocationCreateManyGroupInput | MerchantLocationCreateManyGroupInput[]
  }

  export type MerchantLocationUpsertWithWhereUniqueWithoutGroupInput = {
    where: MerchantLocationWhereUniqueInput
    update: XOR<MerchantLocationUpdateWithoutGroupInput, MerchantLocationUncheckedUpdateWithoutGroupInput>
    create: XOR<MerchantLocationCreateWithoutGroupInput, MerchantLocationUncheckedCreateWithoutGroupInput>
  }

  export type MerchantLocationUpdateWithWhereUniqueWithoutGroupInput = {
    where: MerchantLocationWhereUniqueInput
    data: XOR<MerchantLocationUpdateWithoutGroupInput, MerchantLocationUncheckedUpdateWithoutGroupInput>
  }

  export type MerchantLocationUpdateManyWithWhereWithoutGroupInput = {
    where: MerchantLocationScalarWhereInput
    data: XOR<MerchantLocationUpdateManyMutationInput, MerchantLocationUncheckedUpdateManyWithoutGroupInput>
  }

  export type MerchantLocationScalarWhereInput = {
    AND?: MerchantLocationScalarWhereInput | MerchantLocationScalarWhereInput[]
    OR?: MerchantLocationScalarWhereInput[]
    NOT?: MerchantLocationScalarWhereInput | MerchantLocationScalarWhereInput[]
    uri?: StringFilter<"MerchantLocation"> | string
    externalId?: StringNullableFilter<"MerchantLocation"> | string | null
    name?: StringFilter<"MerchantLocation"> | string
    address?: JsonFilter<"MerchantLocation">
    timezone?: StringFilter<"MerchantLocation"> | string
    latitude?: FloatFilter<"MerchantLocation"> | number
    longitude?: FloatFilter<"MerchantLocation"> | number
    media?: JsonNullableFilter<"MerchantLocation">
    groupUri?: StringFilter<"MerchantLocation"> | string
    createdAt?: DateTimeFilter<"MerchantLocation"> | Date | string
    updatedAt?: DateTimeFilter<"MerchantLocation"> | Date | string
  }

  export type MerchantGroupCreateWithoutLocationsInput = {
    uri: string
    externalId?: string | null
    name: string
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MerchantGroupUncheckedCreateWithoutLocationsInput = {
    uri: string
    externalId?: string | null
    name: string
    logo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MerchantGroupCreateOrConnectWithoutLocationsInput = {
    where: MerchantGroupWhereUniqueInput
    create: XOR<MerchantGroupCreateWithoutLocationsInput, MerchantGroupUncheckedCreateWithoutLocationsInput>
  }

  export type MerchantGroupUpsertWithoutLocationsInput = {
    update: XOR<MerchantGroupUpdateWithoutLocationsInput, MerchantGroupUncheckedUpdateWithoutLocationsInput>
    create: XOR<MerchantGroupCreateWithoutLocationsInput, MerchantGroupUncheckedCreateWithoutLocationsInput>
    where?: MerchantGroupWhereInput
  }

  export type MerchantGroupUpdateToOneWithWhereWithoutLocationsInput = {
    where?: MerchantGroupWhereInput
    data: XOR<MerchantGroupUpdateWithoutLocationsInput, MerchantGroupUncheckedUpdateWithoutLocationsInput>
  }

  export type MerchantGroupUpdateWithoutLocationsInput = {
    uri?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerchantGroupUncheckedUpdateWithoutLocationsInput = {
    uri?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerchantLocationCreateManyGroupInput = {
    uri: string
    externalId?: string | null
    name: string
    address: JsonNullValueInput | InputJsonValue
    timezone: string
    latitude: number
    longitude: number
    media?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MerchantLocationUpdateWithoutGroupInput = {
    uri?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: JsonNullValueInput | InputJsonValue
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    media?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerchantLocationUncheckedUpdateWithoutGroupInput = {
    uri?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: JsonNullValueInput | InputJsonValue
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    media?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerchantLocationUncheckedUpdateManyWithoutGroupInput = {
    uri?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: JsonNullValueInput | InputJsonValue
    timezone?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    media?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}