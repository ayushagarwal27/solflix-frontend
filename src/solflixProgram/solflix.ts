/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solflix.json`.
 */
export type Solflix = {
  "address": "BFpFTmDwDNygSW9iL1UErkpDGTDiJFcjZh73DJ1vRu47",
  "metadata": {
    "name": "solflix",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "accessResource",
      "discriminator": [
        105,
        212,
        130,
        207,
        4,
        156,
        24,
        176
      ],
      "accounts": [
        {
          "name": "accessor",
          "writable": true,
          "signer": true
        },
        {
          "name": "maker",
          "writable": true
        },
        {
          "name": "admin",
          "writable": true
        },
        {
          "name": "accessAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  99,
                  99,
                  101,
                  115,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "resource_account.seed",
                "account": "create"
              },
              {
                "kind": "account",
                "path": "accessor"
              }
            ]
          }
        },
        {
          "name": "resourceAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  114,
                  101,
                  97,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "resource_account.creator",
                "account": "create"
              },
              {
                "kind": "account",
                "path": "resource_account.seed",
                "account": "create"
              }
            ]
          }
        },
        {
          "name": "config",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createResource",
      "discriminator": [
        42,
        4,
        153,
        170,
        163,
        159,
        188,
        194
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "createAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  114,
                  101,
                  97,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              },
              {
                "kind": "arg",
                "path": "seed"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "numOfDays",
          "type": "u32"
        },
        {
          "name": "resourceKey",
          "type": "string"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "seed",
          "type": "string"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "access",
      "discriminator": [
        117,
        154,
        108,
        210,
        202,
        83,
        96,
        222
      ]
    },
    {
      "name": "config",
      "discriminator": [
        155,
        12,
        170,
        224,
        30,
        250,
        204,
        130
      ]
    },
    {
      "name": "create",
      "discriminator": [
        157,
        216,
        244,
        173,
        66,
        21,
        151,
        114
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "priceCantBeZero",
      "msg": "Price must be greater than 0"
    },
    {
      "code": 6001,
      "name": "incorrectSizeOfResourceKey",
      "msg": "Resource key size must be between 6 to 50 character length"
    },
    {
      "code": 6002,
      "name": "incorrectNumOfDays",
      "msg": "Number of days must be between 1 to 365 days"
    },
    {
      "code": 6003,
      "name": "incorrectSeedSize",
      "msg": "Seed size must be 31"
    }
  ],
  "types": [
    {
      "name": "access",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "consumer",
            "type": "pubkey"
          },
          {
            "name": "purchaseTime",
            "type": "i64"
          },
          {
            "name": "numOfDaysValid",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "resourceKey",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "config",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "chargePercentage",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "create",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "numOfDays",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "seed",
            "type": "string"
          },
          {
            "name": "resourceKey",
            "type": "string"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          }
        ]
      }
    }
  ]
};
