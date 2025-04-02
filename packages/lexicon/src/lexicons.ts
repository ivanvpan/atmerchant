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
    description: 'todo',
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
              type: 'ref',
              ref: 'lex:xyz.noshdelivery.merchant.merchant',
            },
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
          required: ['name', 'catalog'],
          properties: {
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 128,
            },
            catalog: {
              type: 'ref',
              ref: 'lex:xyz.noshdelivery.catalog.catalog',
            },
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
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 128,
            },
            category: {
              type: 'array',
              description: 'References to all categories this item belongs to',
              items: {
                type: 'ref',
                ref: 'lex:xyz.noshdelivery.catalog.category',
              },
            },
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
  XyzNoshdeliveryCatalogItem: 'xyz.noshdelivery.catalog.item',
  XyzNoshdeliveryMerchantMerchant: 'xyz.noshdelivery.merchant.merchant',
} as const
