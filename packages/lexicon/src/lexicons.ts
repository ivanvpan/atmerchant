/**
 * GENERATED CODE - DO NOT MODIFY
 */
import {
  LexiconDoc,
  Lexicons,
  ValidationError,
  ValidationResult,
} from '@atproto/lexicon'
import { $Typed, is$typed, maybe$typed } from './util.js'

export const schemaDict = {
  XyzNoshdeliveryCatalogCatalog: {
    lexicon: 1,
    id: 'xyz.noshdelivery.catalog.catalog',
    description:
      'Merchant can have multiple catalogs with disjoint or overlaping schedules. Categories have catalogs as their roots.',
    defs: {
      main: {
        type: 'record',
        key: 'tid',
        record: {
          type: 'object',
          required: ['merchant'],
          properties: {
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 128,
            },
            merchant: {
              type: 'string',
              format: 'at-uri',
            },
            availabilityPeriods: {
              type: 'array',
              items: {
                type: 'ref',
                ref: 'lex:xyz.noshdelivery.catalog.catalog#availabilityPeriod',
              },
            },
          },
        },
      },
      availabilityPeriod: {
        type: 'object',
        properties: {
          start: {
            type: 'ref',
            ref: 'lex:xyz.noshdelivery.catalog.catalog#availabilityTimeOfDay',
          },
          end: {
            type: 'ref',
            ref: 'lex:xyz.noshdelivery.catalog.catalog#availabilityTimeOfDay',
          },
          daysOfWeek: {
            type: 'array',
            items: {
              type: 'string',
              enum: [
                'MONDAY',
                'TUESDAY',
                'WEDNESDAY',
                'THURSDAY',
                'FRIDAY',
                'SATURDAY',
                'SUNDAY',
              ],
            },
          },
        },
      },
      availabilityTimeOfDay: {
        type: 'object',
        properties: {
          localHour: {
            type: 'integer',
            minimum: 0,
            maximum: 23,
          },
          localMinute: {
            type: 'integer',
            minimum: 0,
            maximum: 59,
          },
        },
      },
    },
  },
  XyzNoshdeliveryCatalogCategory: {
    lexicon: 1,
    id: 'xyz.noshdelivery.catalog.category',
    description: 'todo',
    defs: {
      main: {
        type: 'record',
        key: 'tid',
        record: {
          type: 'object',
          required: ['name', 'parentCatalogOrCategory'],
          properties: {
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 128,
            },
            parentCatalogOrCategory: {
              type: 'ref',
              ref: 'lex:xyz.noshdelivery.catalog.category#catalogOrCategoryRefWithOrdinal',
            },
          },
        },
      },
      catalogOrCategoryRefWithOrdinal: {
        type: 'object',
        required: ['categoryOrCatalog'],
        properties: {
          categoryOrCatalog: {
            type: 'string',
            format: 'at-uri',
          },
          ordinal: {
            type: 'integer',
            default: 999999999,
            description:
              'The order in which this item should appear in the category.',
          },
        },
      },
    },
  },
  XyzNoshdeliveryCatalogDefs: {
    lexicon: 1,
    id: 'xyz.noshdelivery.catalog.defs',
    defs: {
      price: {
        type: 'object',
        required: ['currency', 'amount'],
        properties: {
          currency: {
            type: 'string',
            maxLength: 3,
          },
          amount: {
            type: 'integer',
            description:
              'The amount in the smallest unit of the currency. For example cents',
            minimum: 0,
          },
        },
      },
    },
  },
  XyzNoshdeliveryCatalogItem: {
    lexicon: 1,
    id: 'xyz.noshdelivery.catalog.item',
    description: 'todo',
    defs: {
      main: {
        type: 'record',
        key: 'tid',
        record: {
          type: 'object',
          required: ['name', 'price', 'categories'],
          properties: {
            sku: {
              type: 'string',
              maxLength: 64,
            },
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 128,
            },
            categories: {
              type: 'array',
              description:
                'References to all categories this item is included in.',
              items: {
                type: 'ref',
                ref: 'lex:xyz.noshdelivery.catalog.item#categoryRefWithOrdinal',
              },
            },
            price: {
              type: 'ref',
              ref: 'lex:xyz.noshdelivery.catalog.defs#price',
            },
          },
        },
      },
      categoryRefWithOrdinal: {
        type: 'object',
        required: ['category'],
        properties: {
          category: {
            type: 'string',
            format: 'at-uri',
          },
          ordinal: {
            type: 'integer',
            default: 999999999,
            description:
              'The order in which this item should appear in the category.',
          },
        },
      },
    },
  },
  XyzNoshdeliveryMerchantMerchant: {
    lexicon: 1,
    id: 'xyz.noshdelivery.merchant.merchant',
    description: 'todo',
    defs: {
      main: {
        type: 'record',
        key: 'tid',
        record: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 128,
            },
          },
        },
      },
    },
  },
} as const satisfies Record<string, LexiconDoc>

export const schemas = Object.values(schemaDict) satisfies LexiconDoc[]
export const lexicons: Lexicons = new Lexicons(schemas)

export function validate<T extends { $type: string }>(
  v: unknown,
  id: string,
  hash: string,
  requiredType: true,
): ValidationResult<T>
export function validate<T extends { $type?: string }>(
  v: unknown,
  id: string,
  hash: string,
  requiredType?: false,
): ValidationResult<T>
export function validate(
  v: unknown,
  id: string,
  hash: string,
  requiredType?: boolean,
): ValidationResult {
  return (requiredType ? is$typed : maybe$typed)(v, id, hash)
    ? lexicons.validate(`${id}#${hash}`, v)
    : {
        success: false,
        error: new ValidationError(
          `Must be an object with "${hash === 'main' ? id : `${id}#${hash}`}" $type property`,
        ),
      }
}

export const ids = {
  XyzNoshdeliveryCatalogCatalog: 'xyz.noshdelivery.catalog.catalog',
  XyzNoshdeliveryCatalogCategory: 'xyz.noshdelivery.catalog.category',
  XyzNoshdeliveryCatalogDefs: 'xyz.noshdelivery.catalog.defs',
  XyzNoshdeliveryCatalogItem: 'xyz.noshdelivery.catalog.item',
  XyzNoshdeliveryMerchantMerchant: 'xyz.noshdelivery.merchant.merchant',
} as const
