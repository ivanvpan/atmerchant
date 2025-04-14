/**
 * GENERATED CODE - DO NOT MODIFY
 */
import {
  type LexiconDoc,
  Lexicons,
  ValidationError,
  type ValidationResult,
} from '@atproto/lexicon'
import { type $Typed, is$typed, maybe$typed } from './util.js'

export const schemaDict = {
  XyzNoshdeliveryV0CatalogCatalog: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.catalog.catalog',
    description:
      'Merchant can have multiple catalogs with disjoint or overlaping schedules. Collections are nested with catalogs at the roots.',
    defs: {
      main: {
        type: 'record',
        key: 'tid',
        record: {
          type: 'object',
          required: ['merchantLocation', 'name', 'availabilityPeriods'],
          properties: {
            externalId: {
              type: 'string',
              maxLength: 64,
            },
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 128,
            },
            merchantLocation: {
              type: 'string',
              format: 'at-uri',
            },
            availabilityPeriods: {
              type: 'array',
              items: {
                type: 'ref',
                ref: 'lex:xyz.noshdelivery.v0.catalog.defs#availabilityPeriod',
              },
            },
            childCollections: {
              type: 'array',
              description:
                'Pkeys of xyz.noshdelivery.v0.catalog.collection records that belong in this catalog. Ordered in the way they will be presented.',
              items: {
                type: 'string',
                format: 'tid',
              },
            },
          },
        },
      },
    },
  },
  XyzNoshdeliveryV0CatalogCollection: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.catalog.collection',
    description: 'todo',
    defs: {
      main: {
        type: 'record',
        key: 'tid',
        record: {
          type: 'object',
          required: ['name'],
          properties: {
            externalId: {
              type: 'string',
              description:
                'An external ID that can be used to identify this object in an external system such as a warehousing system',
              maxLength: 64,
            },
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 128,
            },
            childCollections: {
              type: 'array',
              items: {
                type: 'string',
                format: 'at-uri',
              },
            },
            media: {
              type: 'ref',
              ref: 'lex:xyz.noshdelivery.v0.media.defs#mediaView',
            },
            items: {
              type: 'array',
              description:
                'Pkeys of xyz.noshdelivery.v0.catalog.item records that are in this collection. Ordered in the way they will be presented.',
              items: {
                type: 'string',
                format: 'tid',
              },
            },
          },
        },
      },
    },
  },
  XyzNoshdeliveryV0CatalogDefs: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.catalog.defs',
    defs: {
      priceMoney: {
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
              'The amount in the smallest unit of the currency. For example cents.',
            minimum: 0,
          },
        },
      },
      catalogView: {
        type: 'object',
        required: ['uri', 'name'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          externalId: {
            type: 'string',
            maxLength: 64,
          },
          name: {
            type: 'string',
            minLength: 1,
            maxLength: 128,
          },
          availabilityPeriods: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:xyz.noshdelivery.v0.catalog.defs#availabilityPeriod',
            },
          },
          childCollections: {
            type: 'array',
            description:
              'Pkeys of xyz.noshdelivery.v0.catalog.collection records that belong in this catalog. Ordered in the way they will be presented.',
            items: {
              type: 'string',
              format: 'tid',
            },
          },
        },
      },
      collectionView: {
        type: 'object',
        required: ['uri', 'name'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          externalId: {
            type: 'string',
            maxLength: 64,
          },
          name: {
            type: 'string',
            minLength: 1,
            maxLength: 128,
          },
          media: {
            type: 'ref',
            ref: 'lex:xyz.noshdelivery.v0.media.defs#mediaView',
          },
          childCollections: {
            type: 'array',
            description:
              'Pkeys of xyz.noshdelivery.v0.catalog.collection records that belong in this catalog. Ordered in the way they will be presented.',
            items: {
              type: 'string',
              format: 'tid',
            },
          },
          items: {
            type: 'array',
            description:
              'Pkeys of xyz.noshdelivery.v0.catalog.item records that belong in this collection. Ordered in the way they will be presented.',
            items: {
              type: 'string',
              format: 'tid',
            },
          },
        },
      },
      itemView: {
        type: 'object',
        required: ['uri', 'name'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          externalId: {
            type: 'string',
            maxLength: 64,
          },
          suspended: {
            type: 'boolean',
            description: 'The item is currently suspended from ordering',
            default: false,
          },
          name: {
            type: 'string',
            minLength: 1,
            maxLength: 128,
          },
          description: {
            type: 'string',
            maxLength: 1024,
          },
          media: {
            type: 'ref',
            ref: 'lex:xyz.noshdelivery.v0.media.defs#mediaView',
          },
          priceMoney: {
            type: 'ref',
            ref: 'lex:xyz.noshdelivery.v0.catalog.defs#priceMoney',
          },
          modifiersGroups: {
            type: 'array',
            description:
              'Pkeys of xyz.noshdelivery.v0.catalog.modifierGroup records that belong in this collection. Ordered in the way they will be presented.',
            items: {
              type: 'string',
              format: 'tid',
            },
          },
        },
      },
      modifierGroupView: {
        type: 'object',
        required: [
          'uri',
          'name',
          'minimumSelection',
          'maximumSelection',
          'maximumOfEachModifier',
        ],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          externalId: {
            type: 'string',
            maxLength: 64,
          },
          availableForSale: {
            type: 'boolean',
            description:
              'The modifier group is currently available for ordering, whether it is suspended by store or not scheduled to be available at this time',
            default: true,
          },
          suspended: {
            type: 'boolean',
            description:
              'The modifier group is currently suspended from ordering',
            default: false,
          },
          name: {
            type: 'string',
            minLength: 1,
            maxLength: 128,
          },
          description: {
            type: 'string',
            maxLength: 256,
          },
          media: {
            type: 'ref',
            ref: 'lex:xyz.noshdelivery.v0.media.defs#mediaView',
          },
          minimumSelection: {
            type: 'integer',
            description:
              'Minimum number of options that must be selected from this group. 0 means it is optional.',
            minimum: 0,
            default: 0,
          },
          maximumSelection: {
            type: 'integer',
            description:
              'Maximum number of options that can be selected from this group. 1 means it is a single select.',
            minimum: 1,
            default: 1,
          },
          maximumOfEachModifier: {
            type: 'integer',
            description:
              'Quantity of each modifier you can at most select. For example if you were selecting a dozen donuts with at most 3 of each variety this would be set to 3 with maximum and minimum selections to 1and2. 0 means no limit up to group maximum.',
            default: 1,
          },
          modifiers: {
            type: 'array',
            description:
              'Pkeys of xyz.noshdelivery.v0.catalog.modifier records that belong in this collection. Ordered in the way they will be presented.',
            items: {
              type: 'string',
              format: 'tid',
            },
          },
        },
      },
      modifierView: {
        type: 'object',
        required: ['uri', 'name', 'priceMoney'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          externalId: {
            type: 'string',
            maxLength: 64,
          },
          availableForSale: {
            type: 'boolean',
            description:
              'The item is currently available for ordering at this location',
            default: true,
          },
          name: {
            type: 'string',
            minLength: 1,
            maxLength: 128,
          },
          description: {
            type: 'string',
            maxLength: 256,
          },
          priceMoney: {
            type: 'ref',
            ref: 'lex:xyz.noshdelivery.v0.catalog.defs#priceMoney',
          },
          childModifierGroups: {
            type: 'array',
            description:
              'Pkeys of xyz.noshdelivery.v0.catalog.modifierGroup records that are children of this modifier. Ordered in the way they will be presented.',
            items: {
              type: 'string',
              format: 'tid',
            },
          },
        },
      },
      availabilityPeriod: {
        type: 'object',
        properties: {
          start: {
            type: 'ref',
            ref: 'lex:xyz.noshdelivery.v0.catalog.defs#availabilityTimeOfDay',
          },
          end: {
            type: 'ref',
            ref: 'lex:xyz.noshdelivery.v0.catalog.defs#availabilityTimeOfDay',
          },
          dayOfWeek: {
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
  XyzNoshdeliveryV0CatalogGetShallowCatalogView: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.catalog.getShallowCatalogView',
    defs: {
      main: {
        type: 'query',
        description:
          'Get a view of all catalogs with categories and items, but no modifiers. This is a reasonable call only on smaller catalogs such as restaurant menus.',
        parameters: {
          type: 'params',
          required: [],
          properties: {
            locationUri: {
              type: 'string',
              description: 'The URI of the merchant whose catalogs to get.',
              format: 'at-uri',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['merchantLocation', 'shallowCatalogView'],
            properties: {
              merchantLocation: {
                type: 'string',
                format: 'at-uri',
              },
              shallowCatalogView: {
                type: 'ref',
                ref: 'lex:xyz.noshdelivery.v0.catalog.getShallowCatalogView#shallowCatalogView',
              },
            },
          },
        },
      },
      shallowCatalogView: {
        type: 'object',
        required: ['catalogs', 'collections', 'items'],
        properties: {
          catalogs: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:xyz.noshdelivery.v0.catalog.defs#catalogView',
            },
          },
          collections: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:xyz.noshdelivery.v0.catalog.defs#collectionView',
            },
          },
          items: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:xyz.noshdelivery.v0.catalog.defs#itemView',
            },
          },
        },
      },
    },
  },
  XyzNoshdeliveryV0CatalogItem: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.catalog.item',
    defs: {
      main: {
        type: 'record',
        key: 'tid',
        record: {
          type: 'object',
          required: ['name', 'priceMoney', 'suspended'],
          properties: {
            externalId: {
              type: 'string',
              description:
                'An external ID that can be used to identify this object in an external system such as a warehousing system',
              maxLength: 64,
            },
            suspended: {
              type: 'boolean',
              description: 'The item is currently suspended from ordering',
              default: false,
            },
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 128,
            },
            description: {
              type: 'string',
              maxLength: 1024,
            },
            media: {
              type: 'ref',
              ref: 'lex:xyz.noshdelivery.v0.media.defs#mediaView',
            },
            priceMoney: {
              type: 'ref',
              ref: 'lex:xyz.noshdelivery.v0.catalog.defs#priceMoney',
            },
            modifierGroups: {
              type: 'array',
              description:
                'Pkeys of xyz.noshdelivery.v0.catalog.modifierGroup records that belong in this item. Ordered in the way they will be presented.',
              items: {
                type: 'string',
                format: 'tid',
              },
            },
          },
        },
      },
    },
  },
  XyzNoshdeliveryV0CatalogModifier: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.catalog.modifier',
    defs: {
      main: {
        type: 'record',
        key: 'tid',
        record: {
          type: 'object',
          required: ['name', 'priceMoney'],
          properties: {
            externalId: {
              type: 'string',
              description:
                'An external ID that can be used to identify this object in an external system such as a warehousing system',
              maxLength: 64,
            },
            availableForSale: {
              type: 'boolean',
              description:
                'The item is currently available for ordering at this location',
              default: true,
            },
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 128,
            },
            description: {
              type: 'string',
              maxLength: 256,
            },
            priceMoney: {
              type: 'ref',
              ref: 'lex:xyz.noshdelivery.v0.catalog.defs#priceMoney',
            },
            childModifierGroups: {
              type: 'array',
              description:
                'Pkeys of xyz.noshdelivery.v0.catalog.modifierGroup records that are children of this modifier. Ordered in the way they will be presented.',
              items: {
                type: 'string',
                format: 'tid',
              },
            },
          },
        },
      },
    },
  },
  XyzNoshdeliveryV0CatalogModifierGroup: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.catalog.modifierGroup',
    defs: {
      main: {
        type: 'record',
        key: 'tid',
        record: {
          type: 'object',
          required: ['name'],
          properties: {
            externalId: {
              type: 'string',
              description:
                'An external ID that can be used to identify this object in an external system such as a warehousing system',
              maxLength: 64,
            },
            availableForSale: {
              type: 'boolean',
              description:
                'The item is currently available for ordering at this location',
              default: true,
            },
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 128,
            },
            description: {
              type: 'string',
              maxLength: 256,
            },
            media: {
              type: 'ref',
              ref: 'lex:xyz.noshdelivery.v0.media.defs#mediaView',
            },
            minimumSelection: {
              type: 'integer',
              description:
                'Minimum number of options that must be selected from this group. 0 means it is optional.',
              minimum: 0,
              default: 0,
            },
            maximumSelection: {
              type: 'integer',
              description:
                'Maximum number of options that can be selected from this group. 1 means it is a single select (radio-button).',
              minimum: 1,
              default: 1,
            },
            maximumOfEachModifier: {
              type: 'integer',
              description:
                'Quantity of each modifier you can at most select. For example if you were selecting a dozen donuts with at most 3 of each variety this would be set to 3 with maximum and minimum selections to 1and2. 0 means no limit up to group maximum.',
              default: 1,
            },
            modifiers: {
              type: 'array',
              description:
                'Pkeys of xyz.noshdelivery.v0.catalog.modifierGroup records that belong in this item. Ordered in the way they will be presented.',
              items: {
                type: 'string',
                format: 'tid',
              },
            },
          },
        },
      },
    },
  },
  XyzNoshdeliveryV0CatalogPutCatalog: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.catalog.putCatalog',
    description: 'A catalog for a merchant location.',
    defs: {
      main: {
        type: 'procedure',
        description: 'Create or update a catalog.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['name', 'merchantLocation', 'availabilityPeriods'],
            properties: {
              externalId: {
                type: 'string',
                maxLength: 64,
              },
              name: {
                type: 'string',
                minLength: 1,
                maxLength: 128,
              },
              merchantLocation: {
                type: 'string',
                format: 'at-uri',
              },
              availabilityPeriods: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:xyz.noshdelivery.v0.catalog.defs#availabilityPeriod',
                },
              },
              childCollections: {
                type: 'array',
                description:
                  'Pkeys of xyz.noshdelivery.v0.catalog.collection records that belong in this catalog. Ordered in the way they will be presented.',
                items: {
                  type: 'string',
                  format: 'tid',
                },
              },
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['catalog'],
            properties: {
              catalog: {
                type: 'ref',
                ref: 'lex:xyz.noshdelivery.v0.catalog.defs#catalogView',
              },
            },
          },
        },
      },
    },
  },
  XyzNoshdeliveryV0CatalogPutCollection: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.catalog.putCollection',
    description: 'todo',
    defs: {
      main: {
        type: 'procedure',
        description: 'Create or update a collection.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['name'],
            properties: {
              externalId: {
                type: 'string',
                description:
                  'An external ID that can be used to identify this object in an external system such as a warehousing system',
                maxLength: 64,
              },
              name: {
                type: 'string',
                minLength: 1,
                maxLength: 128,
              },
              childCollections: {
                type: 'array',
                items: {
                  type: 'string',
                  format: 'at-uri',
                },
              },
              media: {
                type: 'ref',
                ref: 'lex:xyz.noshdelivery.v0.media.defs#mediaView',
              },
              items: {
                type: 'array',
                description:
                  'Pkeys of xyz.noshdelivery.v0.catalog.item records that are in this collection. Ordered in the way they will be presented.',
                items: {
                  type: 'string',
                  format: 'tid',
                },
              },
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['collection'],
            properties: {
              collection: {
                type: 'ref',
                ref: 'lex:xyz.noshdelivery.v0.catalog.defs#collectionView',
              },
            },
          },
        },
      },
    },
  },
  XyzNoshdeliveryV0CatalogPutItem: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.catalog.putItem',
    description: 'todo',
    defs: {
      main: {
        type: 'procedure',
        description: 'Create or update an item.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['name', 'priceMoney'],
            properties: {
              externalId: {
                type: 'string',
                description:
                  'An external ID that can be used to identify this object in an external system such as a warehousing system',
                maxLength: 64,
              },
              availableForSale: {
                type: 'boolean',
                description:
                  'The item is currently available for ordering at this location',
                default: true,
              },
              name: {
                type: 'string',
                minLength: 1,
                maxLength: 128,
              },
              description: {
                type: 'string',
                maxLength: 1024,
              },
              media: {
                type: 'ref',
                ref: 'lex:xyz.noshdelivery.v0.media.defs#mediaView',
              },
              priceMoney: {
                type: 'ref',
                ref: 'lex:xyz.noshdelivery.v0.catalog.defs#priceMoney',
              },
              modifierGroups: {
                type: 'array',
                description:
                  'Pkeys of xyz.noshdelivery.v0.catalog.modifierGroup records that belong in this item. Ordered in the way they will be presented.',
                items: {
                  type: 'string',
                  format: 'tid',
                },
              },
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['item'],
            properties: {
              item: {
                type: 'ref',
                ref: 'lex:xyz.noshdelivery.v0.catalog.defs#itemView',
              },
            },
          },
        },
      },
    },
  },
  XyzNoshdeliveryV0MediaDefs: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.media.defs',
    defs: {
      aspectRatio: {
        type: 'object',
        description:
          'width:height represents an aspect ratio. It may be approximate, and may not correspond to absolute dimensions in any given unit.',
        required: ['width', 'height'],
        properties: {
          width: {
            type: 'integer',
            minimum: 1,
          },
          height: {
            type: 'integer',
            minimum: 1,
          },
        },
      },
      mediaView: {
        type: 'array',
        description:
          'Array of media associated with a merchant or a menu object. The first item in the array is the cover in the UI.',
        items: {
          type: 'union',
          refs: [
            'lex:xyz.noshdelivery.v0.media.image#imageView',
            'lex:xyz.noshdelivery.v0.media.video#videoView',
          ],
        },
      },
    },
  },
  XyzNoshdeliveryV0MediaImage: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.media.image',
    description: 'A set of images embedded in a Bluesky record (eg, a post).',
    defs: {
      main: {
        type: 'object',
        required: ['image', 'alt'],
        properties: {
          image: {
            type: 'blob',
            description: 'The image file. Limited to 10mb.',
            accept: ['image/*'],
            maxSize: 10000000,
          },
          alt: {
            type: 'string',
            description:
              'Alt text description of the image, for accessibility.',
          },
          aspectRatio: {
            type: 'ref',
            ref: 'lex:xyz.noshdelivery.v0.media.defs#aspectRatio',
          },
        },
      },
      imageView: {
        type: 'object',
        required: ['thumb', 'fullsize', 'alt'],
        properties: {
          thumb: {
            type: 'string',
            format: 'uri',
            description:
              'Fully-qualified URL where a thumbnail of the image can be fetched. For example, CDN location provided by the App View.',
          },
          fullsize: {
            type: 'string',
            format: 'uri',
            description:
              'Fully-qualified URL where a large version of the image can be fetched. May or may not be the exact original blob. For example, CDN location provided by the App View.',
          },
          alt: {
            type: 'string',
            description:
              'Alt text description of the image, for accessibility.',
          },
          aspectRatio: {
            type: 'ref',
            ref: 'lex:xyz.noshdelivery.v0.media.defs#aspectRatio',
          },
        },
      },
    },
  },
  XyzNoshdeliveryV0MediaVideo: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.media.video',
    description: 'A video attached to a merchant or a menu object.',
    defs: {
      main: {
        type: 'object',
        required: ['video'],
        properties: {
          video: {
            type: 'blob',
            description: 'The mp4 video file. May be up to 100mb.',
            accept: ['video/mp4'],
            maxSize: 100000000,
          },
          alt: {
            type: 'string',
            description:
              'Alt text description of the video, for accessibility.',
            maxGraphemes: 1000,
            maxLength: 10000,
          },
          aspectRatio: {
            type: 'ref',
            ref: 'lex:xyz.noshdelivery.v0.media.defs#aspectRatio',
          },
        },
      },
      videoView: {
        type: 'object',
        required: ['uri', 'thumbnail'],
        properties: {
          uri: {
            type: 'string',
            format: 'cid',
          },
          thumbnail: {
            type: 'string',
            format: 'uri',
          },
          alt: {
            type: 'string',
            maxGraphemes: 1000,
            maxLength: 10000,
          },
          aspectRatio: {
            type: 'ref',
            ref: 'lex:xyz.noshdelivery.v0.media.defs#aspectRatio',
          },
        },
      },
    },
  },
  XyzNoshdeliveryV0MerchantDefs: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.merchant.defs',
    defs: {
      aspectRatio: {
        type: 'object',
        description:
          'width:height represents an aspect ratio. It may be approximate, and may not correspond to absolute dimensions in any given unit.',
        required: ['width', 'height'],
        properties: {
          width: {
            type: 'integer',
            minimum: 1,
          },
          height: {
            type: 'integer',
            minimum: 1,
          },
        },
      },
      groupView: {
        type: 'object',
        description: 'A view of a merchant group',
        required: ['tid', 'uri', 'name'],
        properties: {
          tid: {
            type: 'string',
            format: 'tid',
          },
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          externalId: {
            type: 'string',
            maxLength: 64,
          },
          name: {
            type: 'string',
            minLength: 1,
            maxLength: 128,
          },
          logo: {
            type: 'ref',
            ref: 'lex:xyz.noshdelivery.v0.media.image#imageView',
          },
        },
      },
      locationView: {
        type: 'object',
        description: 'A view of a merchant location',
        properties: {
          tid: {
            type: 'string',
            format: 'tid',
          },
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          externalId: {
            type: 'string',
            maxLength: 64,
          },
          name: {
            type: 'string',
            minLength: 1,
            maxLength: 128,
          },
          timezone: {
            type: 'string',
            maxLength: 128,
          },
          address: {
            type: 'ref',
            ref: 'lex:community.lexicon.location.address',
          },
          coordinates: {
            type: 'ref',
            ref: 'lex:community.lexicon.location.geo',
          },
        },
      },
    },
  },
  XyzNoshdeliveryV0MerchantGetGroup: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.merchant.getGroup',
    defs: {
      main: {
        type: 'query',
        description: 'Get a merchant group by tid.',
        parameters: {
          type: 'params',
          required: ['tid'],
          properties: {
            tid: {
              type: 'string',
              format: 'tid',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['group'],
            properties: {
              group: {
                type: 'ref',
                ref: 'lex:xyz.noshdelivery.v0.merchant.defs#groupView',
              },
            },
          },
        },
      },
    },
  },
  XyzNoshdeliveryV0MerchantGroup: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.merchant.group',
    description: 'A merchant group that is the parent company of locations',
    defs: {
      main: {
        type: 'record',
        key: 'tid',
        record: {
          type: 'object',
          required: ['name'],
          properties: {
            externalId: {
              type: 'string',
              maxLength: 64,
            },
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 128,
            },
            logo: {
              type: 'ref',
              ref: 'lex:xyz.noshdelivery.v0.media.image',
            },
          },
        },
      },
    },
  },
  XyzNoshdeliveryV0MerchantListGroups: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.merchant.listGroups',
    defs: {
      main: {
        type: 'query',
        description: 'Get all merchants groups. More specific filtering TDB.',
        parameters: {
          type: 'params',
          properties: {},
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['groups'],
            properties: {
              groups: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:xyz.noshdelivery.v0.merchant.defs#groupView',
                },
              },
            },
          },
        },
      },
    },
  },
  XyzNoshdeliveryV0MerchantListLocations: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.merchant.listLocations',
    defs: {
      main: {
        type: 'query',
        description: 'Get all merchants in a group.',
        parameters: {
          type: 'params',
          required: ['groupTid'],
          properties: {
            groupTid: {
              type: 'string',
              format: 'tid',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['locations'],
            properties: {
              locations: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:xyz.noshdelivery.v0.merchant.defs#locationView',
                },
              },
            },
          },
        },
      },
    },
  },
  XyzNoshdeliveryV0MerchantLocation: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.merchant.location',
    description: 'A specific physical location for a merchant.',
    defs: {
      main: {
        type: 'record',
        key: 'tid',
        record: {
          type: 'object',
          required: [
            'name',
            'timezone',
            'address',
            'coordinates',
            'parentGroup',
          ],
          properties: {
            parentGroup: {
              type: 'string',
              description:
                'The uri for the merchant group that this location belongs to.',
              format: 'at-uri',
            },
            externalId: {
              type: 'string',
              maxLength: 64,
            },
            name: {
              type: 'string',
              minLength: 1,
              maxLength: 128,
            },
            timezone: {
              type: 'string',
              maxLength: 128,
            },
            address: {
              type: 'ref',
              ref: 'lex:community.lexicon.location.address',
            },
            coordinates: {
              type: 'ref',
              ref: 'lex:community.lexicon.location.geo',
            },
            media: {
              type: 'ref',
              ref: 'lex:xyz.noshdelivery.v0.media.defs#mediaView',
            },
          },
        },
      },
    },
  },
  XyzNoshdeliveryV0MerchantPutGroup: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.merchant.putGroup',
    defs: {
      main: {
        type: 'procedure',
        description: 'Create or update a merchant group.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['name'],
            properties: {
              externalId: {
                type: 'string',
                maxLength: 64,
              },
              name: {
                type: 'string',
                minLength: 1,
                maxLength: 128,
              },
              logo: {
                type: 'ref',
                ref: 'lex:xyz.noshdelivery.v0.media.image',
              },
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['groups'],
            properties: {
              groups: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:xyz.noshdelivery.v0.merchant.defs#groupView',
                },
              },
            },
          },
        },
      },
    },
  },
  XyzNoshdeliveryV0MerchantPutLocation: {
    lexicon: 1,
    id: 'xyz.noshdelivery.v0.merchant.putLocation',
    defs: {
      main: {
        type: 'procedure',
        description: 'Create or update a merchant location.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: [
              'groupTid',
              'name',
              'address',
              'coordinates',
              'timezone',
              'parentGroup',
            ],
            properties: {
              groupTid: {
                type: 'string',
                description: 'The tid of the merchant group.',
                format: 'tid',
              },
              externalId: {
                type: 'string',
                description: 'The external id of the merchant location.',
              },
              name: {
                type: 'string',
                description: 'The name of the merchant location.',
              },
              address: {
                type: 'ref',
                ref: 'lex:community.lexicon.location.address',
              },
              coordinates: {
                type: 'ref',
                ref: 'lex:community.lexicon.location.geo',
              },
              timezone: {
                type: 'string',
                description: 'The timezone of the merchant location.',
              },
              parentGroup: {
                type: 'string',
                description: 'The uri of the merchant group.',
                format: 'at-uri',
              },
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['locations'],
            properties: {
              locations: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:xyz.noshdelivery.v0.merchant.defs#locationView',
                },
              },
            },
          },
        },
      },
    },
  },
  ComAtprotoLabelDefs: {
    lexicon: 1,
    id: 'com.atproto.label.defs',
    defs: {
      label: {
        type: 'object',
        description:
          'Metadata tag on an atproto resource (eg, repo or record).',
        required: ['src', 'uri', 'val', 'cts'],
        properties: {
          ver: {
            type: 'integer',
            description: 'The AT Protocol version of the label object.',
          },
          src: {
            type: 'string',
            format: 'did',
            description: 'DID of the actor who created this label.',
          },
          uri: {
            type: 'string',
            format: 'uri',
            description:
              'AT URI of the record, repository (account), or other resource that this label applies to.',
          },
          cid: {
            type: 'string',
            format: 'cid',
            description:
              "Optionally, CID specifying the specific version of 'uri' resource this label applies to.",
          },
          val: {
            type: 'string',
            maxLength: 128,
            description:
              'The short string name of the value or type of this label.',
          },
          neg: {
            type: 'boolean',
            description:
              'If true, this is a negation label, overwriting a previous label.',
          },
          cts: {
            type: 'string',
            format: 'datetime',
            description: 'Timestamp when this label was created.',
          },
          exp: {
            type: 'string',
            format: 'datetime',
            description:
              'Timestamp at which this label expires (no longer applies).',
          },
          sig: {
            type: 'bytes',
            description: 'Signature of dag-cbor encoded label.',
          },
        },
      },
      selfLabels: {
        type: 'object',
        description:
          'Metadata tags on an atproto record, published by the author within the record.',
        required: ['values'],
        properties: {
          values: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#selfLabel',
            },
            maxLength: 10,
          },
        },
      },
      selfLabel: {
        type: 'object',
        description:
          'Metadata tag on an atproto record, published by the author within the record. Note that schemas should use #selfLabels, not #selfLabel.',
        required: ['val'],
        properties: {
          val: {
            type: 'string',
            maxLength: 128,
            description:
              'The short string name of the value or type of this label.',
          },
        },
      },
      labelValueDefinition: {
        type: 'object',
        description:
          'Declares a label value and its expected interpretations and behaviors.',
        required: ['identifier', 'severity', 'blurs', 'locales'],
        properties: {
          identifier: {
            type: 'string',
            description:
              "The value of the label being defined. Must only include lowercase ascii and the '-' character ([a-z-]+).",
            maxLength: 100,
            maxGraphemes: 100,
          },
          severity: {
            type: 'string',
            description:
              "How should a client visually convey this label? 'inform' means neutral and informational; 'alert' means negative and warning; 'none' means show nothing.",
            knownValues: ['inform', 'alert', 'none'],
          },
          blurs: {
            type: 'string',
            description:
              "What should this label hide in the UI, if applied? 'content' hides all of the target; 'media' hides the images/video/audio; 'none' hides nothing.",
            knownValues: ['content', 'media', 'none'],
          },
          defaultSetting: {
            type: 'string',
            description: 'The default setting for this label.',
            knownValues: ['ignore', 'warn', 'hide'],
            default: 'warn',
          },
          adultOnly: {
            type: 'boolean',
            description:
              'Does the user need to have adult content enabled in order to configure this label?',
          },
          locales: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#labelValueDefinitionStrings',
            },
          },
        },
      },
      labelValueDefinitionStrings: {
        type: 'object',
        description:
          'Strings which describe the label in the UI, localized into a specific language.',
        required: ['lang', 'name', 'description'],
        properties: {
          lang: {
            type: 'string',
            description:
              'The code of the language these strings are written in.',
            format: 'language',
          },
          name: {
            type: 'string',
            description: 'A short human-readable name for the label.',
            maxGraphemes: 64,
            maxLength: 640,
          },
          description: {
            type: 'string',
            description:
              'A longer description of what the label means and why it might be applied.',
            maxGraphemes: 10000,
            maxLength: 100000,
          },
        },
      },
      labelValue: {
        type: 'string',
        knownValues: [
          '!hide',
          '!no-promote',
          '!warn',
          '!no-unauthenticated',
          'dmca-violation',
          'doxxing',
          'porn',
          'sexual',
          'nudity',
          'nsfl',
          'gore',
        ],
      },
    },
  },
  ComAtprotoRepoApplyWrites: {
    lexicon: 1,
    id: 'com.atproto.repo.applyWrites',
    defs: {
      main: {
        type: 'procedure',
        description:
          'Apply a batch transaction of repository creates, updates, and deletes. Requires auth, implemented by PDS.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['repo', 'writes'],
            properties: {
              repo: {
                type: 'string',
                format: 'at-identifier',
                description:
                  'The handle or DID of the repo (aka, current account).',
              },
              validate: {
                type: 'boolean',
                description:
                  "Can be set to 'false' to skip Lexicon schema validation of record data across all operations, 'true' to require it, or leave unset to validate only for known Lexicons.",
              },
              writes: {
                type: 'array',
                items: {
                  type: 'union',
                  refs: [
                    'lex:com.atproto.repo.applyWrites#create',
                    'lex:com.atproto.repo.applyWrites#update',
                    'lex:com.atproto.repo.applyWrites#delete',
                  ],
                  closed: true,
                },
              },
              swapCommit: {
                type: 'string',
                description:
                  'If provided, the entire operation will fail if the current repo commit CID does not match this value. Used to prevent conflicting repo mutations.',
                format: 'cid',
              },
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: [],
            properties: {
              commit: {
                type: 'ref',
                ref: 'lex:com.atproto.repo.defs#commitMeta',
              },
              results: {
                type: 'array',
                items: {
                  type: 'union',
                  refs: [
                    'lex:com.atproto.repo.applyWrites#createResult',
                    'lex:com.atproto.repo.applyWrites#updateResult',
                    'lex:com.atproto.repo.applyWrites#deleteResult',
                  ],
                  closed: true,
                },
              },
            },
          },
        },
        errors: [
          {
            name: 'InvalidSwap',
            description:
              "Indicates that the 'swapCommit' parameter did not match current commit.",
          },
        ],
      },
      create: {
        type: 'object',
        description: 'Operation which creates a new record.',
        required: ['collection', 'value'],
        properties: {
          collection: {
            type: 'string',
            format: 'nsid',
          },
          rkey: {
            type: 'string',
            maxLength: 512,
            format: 'record-key',
            description:
              'NOTE: maxLength is redundant with record-key format. Keeping it temporarily to ensure backwards compatibility.',
          },
          value: {
            type: 'unknown',
          },
        },
      },
      update: {
        type: 'object',
        description: 'Operation which updates an existing record.',
        required: ['collection', 'rkey', 'value'],
        properties: {
          collection: {
            type: 'string',
            format: 'nsid',
          },
          rkey: {
            type: 'string',
            format: 'record-key',
          },
          value: {
            type: 'unknown',
          },
        },
      },
      delete: {
        type: 'object',
        description: 'Operation which deletes an existing record.',
        required: ['collection', 'rkey'],
        properties: {
          collection: {
            type: 'string',
            format: 'nsid',
          },
          rkey: {
            type: 'string',
            format: 'record-key',
          },
        },
      },
      createResult: {
        type: 'object',
        required: ['uri', 'cid'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          validationStatus: {
            type: 'string',
            knownValues: ['valid', 'unknown'],
          },
        },
      },
      updateResult: {
        type: 'object',
        required: ['uri', 'cid'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          validationStatus: {
            type: 'string',
            knownValues: ['valid', 'unknown'],
          },
        },
      },
      deleteResult: {
        type: 'object',
        required: [],
        properties: {},
      },
    },
  },
  ComAtprotoRepoCreateRecord: {
    lexicon: 1,
    id: 'com.atproto.repo.createRecord',
    defs: {
      main: {
        type: 'procedure',
        description:
          'Create a single new repository record. Requires auth, implemented by PDS.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['repo', 'collection', 'record'],
            properties: {
              repo: {
                type: 'string',
                format: 'at-identifier',
                description:
                  'The handle or DID of the repo (aka, current account).',
              },
              collection: {
                type: 'string',
                format: 'nsid',
                description: 'The NSID of the record collection.',
              },
              rkey: {
                type: 'string',
                format: 'record-key',
                description: 'The Record Key.',
                maxLength: 512,
              },
              validate: {
                type: 'boolean',
                description:
                  "Can be set to 'false' to skip Lexicon schema validation of record data, 'true' to require it, or leave unset to validate only for known Lexicons.",
              },
              record: {
                type: 'unknown',
                description: 'The record itself. Must contain a $type field.',
              },
              swapCommit: {
                type: 'string',
                format: 'cid',
                description:
                  'Compare and swap with the previous commit by CID.',
              },
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['uri', 'cid'],
            properties: {
              uri: {
                type: 'string',
                format: 'at-uri',
              },
              cid: {
                type: 'string',
                format: 'cid',
              },
              commit: {
                type: 'ref',
                ref: 'lex:com.atproto.repo.defs#commitMeta',
              },
              validationStatus: {
                type: 'string',
                knownValues: ['valid', 'unknown'],
              },
            },
          },
        },
        errors: [
          {
            name: 'InvalidSwap',
            description:
              "Indicates that 'swapCommit' didn't match current repo commit.",
          },
        ],
      },
    },
  },
  ComAtprotoRepoDefs: {
    lexicon: 1,
    id: 'com.atproto.repo.defs',
    defs: {
      commitMeta: {
        type: 'object',
        required: ['cid', 'rev'],
        properties: {
          cid: {
            type: 'string',
            format: 'cid',
          },
          rev: {
            type: 'string',
            format: 'tid',
          },
        },
      },
    },
  },
  ComAtprotoRepoDeleteRecord: {
    lexicon: 1,
    id: 'com.atproto.repo.deleteRecord',
    defs: {
      main: {
        type: 'procedure',
        description:
          "Delete a repository record, or ensure it doesn't exist. Requires auth, implemented by PDS.",
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['repo', 'collection', 'rkey'],
            properties: {
              repo: {
                type: 'string',
                format: 'at-identifier',
                description:
                  'The handle or DID of the repo (aka, current account).',
              },
              collection: {
                type: 'string',
                format: 'nsid',
                description: 'The NSID of the record collection.',
              },
              rkey: {
                type: 'string',
                format: 'record-key',
                description: 'The Record Key.',
              },
              swapRecord: {
                type: 'string',
                format: 'cid',
                description:
                  'Compare and swap with the previous record by CID.',
              },
              swapCommit: {
                type: 'string',
                format: 'cid',
                description:
                  'Compare and swap with the previous commit by CID.',
              },
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            properties: {
              commit: {
                type: 'ref',
                ref: 'lex:com.atproto.repo.defs#commitMeta',
              },
            },
          },
        },
        errors: [
          {
            name: 'InvalidSwap',
          },
        ],
      },
    },
  },
  ComAtprotoRepoDescribeRepo: {
    lexicon: 1,
    id: 'com.atproto.repo.describeRepo',
    defs: {
      main: {
        type: 'query',
        description:
          'Get information about an account and repository, including the list of collections. Does not require auth.',
        parameters: {
          type: 'params',
          required: ['repo'],
          properties: {
            repo: {
              type: 'string',
              format: 'at-identifier',
              description: 'The handle or DID of the repo.',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: [
              'handle',
              'did',
              'didDoc',
              'collections',
              'handleIsCorrect',
            ],
            properties: {
              handle: {
                type: 'string',
                format: 'handle',
              },
              did: {
                type: 'string',
                format: 'did',
              },
              didDoc: {
                type: 'unknown',
                description: 'The complete DID document for this account.',
              },
              collections: {
                type: 'array',
                description:
                  'List of all the collections (NSIDs) for which this repo contains at least one record.',
                items: {
                  type: 'string',
                  format: 'nsid',
                },
              },
              handleIsCorrect: {
                type: 'boolean',
                description:
                  'Indicates if handle is currently valid (resolves bi-directionally)',
              },
            },
          },
        },
      },
    },
  },
  ComAtprotoRepoGetRecord: {
    lexicon: 1,
    id: 'com.atproto.repo.getRecord',
    defs: {
      main: {
        type: 'query',
        description:
          'Get a single record from a repository. Does not require auth.',
        parameters: {
          type: 'params',
          required: ['repo', 'collection', 'rkey'],
          properties: {
            repo: {
              type: 'string',
              format: 'at-identifier',
              description: 'The handle or DID of the repo.',
            },
            collection: {
              type: 'string',
              format: 'nsid',
              description: 'The NSID of the record collection.',
            },
            rkey: {
              type: 'string',
              description: 'The Record Key.',
              format: 'record-key',
            },
            cid: {
              type: 'string',
              format: 'cid',
              description:
                'The CID of the version of the record. If not specified, then return the most recent version.',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['uri', 'value'],
            properties: {
              uri: {
                type: 'string',
                format: 'at-uri',
              },
              cid: {
                type: 'string',
                format: 'cid',
              },
              value: {
                type: 'unknown',
              },
            },
          },
        },
        errors: [
          {
            name: 'RecordNotFound',
          },
        ],
      },
    },
  },
  ComAtprotoRepoImportRepo: {
    lexicon: 1,
    id: 'com.atproto.repo.importRepo',
    defs: {
      main: {
        type: 'procedure',
        description:
          'Import a repo in the form of a CAR file. Requires Content-Length HTTP header to be set.',
        input: {
          encoding: 'application/vnd.ipld.car',
        },
      },
    },
  },
  ComAtprotoRepoListMissingBlobs: {
    lexicon: 1,
    id: 'com.atproto.repo.listMissingBlobs',
    defs: {
      main: {
        type: 'query',
        description:
          'Returns a list of missing blobs for the requesting account. Intended to be used in the account migration flow.',
        parameters: {
          type: 'params',
          properties: {
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 1000,
              default: 500,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['blobs'],
            properties: {
              cursor: {
                type: 'string',
              },
              blobs: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:com.atproto.repo.listMissingBlobs#recordBlob',
                },
              },
            },
          },
        },
      },
      recordBlob: {
        type: 'object',
        required: ['cid', 'recordUri'],
        properties: {
          cid: {
            type: 'string',
            format: 'cid',
          },
          recordUri: {
            type: 'string',
            format: 'at-uri',
          },
        },
      },
    },
  },
  ComAtprotoRepoListRecords: {
    lexicon: 1,
    id: 'com.atproto.repo.listRecords',
    defs: {
      main: {
        type: 'query',
        description:
          'List a range of records in a repository, matching a specific collection. Does not require auth.',
        parameters: {
          type: 'params',
          required: ['repo', 'collection'],
          properties: {
            repo: {
              type: 'string',
              format: 'at-identifier',
              description: 'The handle or DID of the repo.',
            },
            collection: {
              type: 'string',
              format: 'nsid',
              description: 'The NSID of the record type.',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
              description: 'The number of records to return.',
            },
            cursor: {
              type: 'string',
            },
            rkeyStart: {
              type: 'string',
              description:
                'DEPRECATED: The lowest sort-ordered rkey to start from (exclusive)',
            },
            rkeyEnd: {
              type: 'string',
              description:
                'DEPRECATED: The highest sort-ordered rkey to stop at (exclusive)',
            },
            reverse: {
              type: 'boolean',
              description: 'Flag to reverse the order of the returned records.',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['records'],
            properties: {
              cursor: {
                type: 'string',
              },
              records: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:com.atproto.repo.listRecords#record',
                },
              },
            },
          },
        },
      },
      record: {
        type: 'object',
        required: ['uri', 'cid', 'value'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          value: {
            type: 'unknown',
          },
        },
      },
    },
  },
  ComAtprotoRepoPutRecord: {
    lexicon: 1,
    id: 'com.atproto.repo.putRecord',
    defs: {
      main: {
        type: 'procedure',
        description:
          'Write a repository record, creating or updating it as needed. Requires auth, implemented by PDS.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['repo', 'collection', 'rkey', 'record'],
            nullable: ['swapRecord'],
            properties: {
              repo: {
                type: 'string',
                format: 'at-identifier',
                description:
                  'The handle or DID of the repo (aka, current account).',
              },
              collection: {
                type: 'string',
                format: 'nsid',
                description: 'The NSID of the record collection.',
              },
              rkey: {
                type: 'string',
                format: 'record-key',
                description: 'The Record Key.',
                maxLength: 512,
              },
              validate: {
                type: 'boolean',
                description:
                  "Can be set to 'false' to skip Lexicon schema validation of record data, 'true' to require it, or leave unset to validate only for known Lexicons.",
              },
              record: {
                type: 'unknown',
                description: 'The record to write.',
              },
              swapRecord: {
                type: 'string',
                format: 'cid',
                description:
                  'Compare and swap with the previous record by CID. WARNING: nullable and optional field; may cause problems with golang implementation',
              },
              swapCommit: {
                type: 'string',
                format: 'cid',
                description:
                  'Compare and swap with the previous commit by CID.',
              },
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['uri', 'cid'],
            properties: {
              uri: {
                type: 'string',
                format: 'at-uri',
              },
              cid: {
                type: 'string',
                format: 'cid',
              },
              commit: {
                type: 'ref',
                ref: 'lex:com.atproto.repo.defs#commitMeta',
              },
              validationStatus: {
                type: 'string',
                knownValues: ['valid', 'unknown'],
              },
            },
          },
        },
        errors: [
          {
            name: 'InvalidSwap',
          },
        ],
      },
    },
  },
  ComAtprotoRepoStrongRef: {
    lexicon: 1,
    id: 'com.atproto.repo.strongRef',
    description: 'A URI with a content-hash fingerprint.',
    defs: {
      main: {
        type: 'object',
        required: ['uri', 'cid'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
        },
      },
    },
  },
  ComAtprotoRepoUploadBlob: {
    lexicon: 1,
    id: 'com.atproto.repo.uploadBlob',
    defs: {
      main: {
        type: 'procedure',
        description:
          'Upload a new blob, to be referenced from a repository record. The blob will be deleted if it is not referenced within a time window (eg, minutes). Blob restrictions (mimetype, size, etc) are enforced when the reference is created. Requires auth, implemented by PDS.',
        input: {
          encoding: '*/*',
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['blob'],
            properties: {
              blob: {
                type: 'blob',
              },
            },
          },
        },
      },
    },
  },
  CommunityLexiconLocationAddress: {
    lexicon: 1,
    id: 'community.lexicon.location.address',
    defs: {
      main: {
        type: 'object',
        description: 'A physical location in the form of a street address.',
        required: ['country'],
        properties: {
          country: {
            type: 'string',
            description:
              'The ISO 3166 country code. Preferably the 2-letter code.',
            minLength: 2,
            maxLength: 10,
          },
          postalCode: {
            type: 'string',
            description: 'The postal code of the location.',
          },
          region: {
            type: 'string',
            description:
              'The administrative region of the country. For example, a state in the USA.',
          },
          locality: {
            type: 'string',
            description:
              'The locality of the region. For example, a city in the USA.',
          },
          street: {
            type: 'string',
            description: 'The street address.',
          },
          name: {
            type: 'string',
            description: 'The name of the location.',
          },
        },
      },
    },
  },
  CommunityLexiconLocationGeo: {
    lexicon: 1,
    id: 'community.lexicon.location.geo',
    defs: {
      main: {
        type: 'object',
        description: 'A physical location in the form of a WGS84 coordinate.',
        required: ['latitude', 'longitude'],
        properties: {
          latitude: {
            type: 'string',
          },
          longitude: {
            type: 'string',
          },
          altitude: {
            type: 'string',
          },
          name: {
            type: 'string',
            description: 'The name of the location.',
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
  XyzNoshdeliveryV0CatalogCatalog: 'xyz.noshdelivery.v0.catalog.catalog',
  XyzNoshdeliveryV0CatalogCollection: 'xyz.noshdelivery.v0.catalog.collection',
  XyzNoshdeliveryV0CatalogDefs: 'xyz.noshdelivery.v0.catalog.defs',
  XyzNoshdeliveryV0CatalogGetShallowCatalogView:
    'xyz.noshdelivery.v0.catalog.getShallowCatalogView',
  XyzNoshdeliveryV0CatalogItem: 'xyz.noshdelivery.v0.catalog.item',
  XyzNoshdeliveryV0CatalogModifier: 'xyz.noshdelivery.v0.catalog.modifier',
  XyzNoshdeliveryV0CatalogModifierGroup:
    'xyz.noshdelivery.v0.catalog.modifierGroup',
  XyzNoshdeliveryV0CatalogPutCatalog: 'xyz.noshdelivery.v0.catalog.putCatalog',
  XyzNoshdeliveryV0CatalogPutCollection:
    'xyz.noshdelivery.v0.catalog.putCollection',
  XyzNoshdeliveryV0CatalogPutItem: 'xyz.noshdelivery.v0.catalog.putItem',
  XyzNoshdeliveryV0MediaDefs: 'xyz.noshdelivery.v0.media.defs',
  XyzNoshdeliveryV0MediaImage: 'xyz.noshdelivery.v0.media.image',
  XyzNoshdeliveryV0MediaVideo: 'xyz.noshdelivery.v0.media.video',
  XyzNoshdeliveryV0MerchantDefs: 'xyz.noshdelivery.v0.merchant.defs',
  XyzNoshdeliveryV0MerchantGetGroup: 'xyz.noshdelivery.v0.merchant.getGroup',
  XyzNoshdeliveryV0MerchantGroup: 'xyz.noshdelivery.v0.merchant.group',
  XyzNoshdeliveryV0MerchantListGroups:
    'xyz.noshdelivery.v0.merchant.listGroups',
  XyzNoshdeliveryV0MerchantListLocations:
    'xyz.noshdelivery.v0.merchant.listLocations',
  XyzNoshdeliveryV0MerchantLocation: 'xyz.noshdelivery.v0.merchant.location',
  XyzNoshdeliveryV0MerchantPutGroup: 'xyz.noshdelivery.v0.merchant.putGroup',
  XyzNoshdeliveryV0MerchantPutLocation:
    'xyz.noshdelivery.v0.merchant.putLocation',
  ComAtprotoLabelDefs: 'com.atproto.label.defs',
  ComAtprotoRepoApplyWrites: 'com.atproto.repo.applyWrites',
  ComAtprotoRepoCreateRecord: 'com.atproto.repo.createRecord',
  ComAtprotoRepoDefs: 'com.atproto.repo.defs',
  ComAtprotoRepoDeleteRecord: 'com.atproto.repo.deleteRecord',
  ComAtprotoRepoDescribeRepo: 'com.atproto.repo.describeRepo',
  ComAtprotoRepoGetRecord: 'com.atproto.repo.getRecord',
  ComAtprotoRepoImportRepo: 'com.atproto.repo.importRepo',
  ComAtprotoRepoListMissingBlobs: 'com.atproto.repo.listMissingBlobs',
  ComAtprotoRepoListRecords: 'com.atproto.repo.listRecords',
  ComAtprotoRepoPutRecord: 'com.atproto.repo.putRecord',
  ComAtprotoRepoStrongRef: 'com.atproto.repo.strongRef',
  ComAtprotoRepoUploadBlob: 'com.atproto.repo.uploadBlob',
  CommunityLexiconLocationAddress: 'community.lexicon.location.address',
  CommunityLexiconLocationGeo: 'community.lexicon.location.geo',
} as const
