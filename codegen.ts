import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.graphql",
  documents: ["**/*.ts", "**/*.tsx", "**/*.graphql"],
  generates: {
    "gql/": {
      preset: "client",
      config: {
        dedupeFragments: true, // https://zenn.dev/link/comments/94104de0ddecfc
        scalars: {
          DateTime: "string",
        },
      },
      presetConfig: {},
    },
    "gql/urql-introspection.ts": {
      plugins: [
        {
          "@graphql-codegen/urql-introspection": {},
        },
      ],
    },
    "gql/mock.ts": {
      plugins: [
        {
          "graphql-codegen-typescript-mock-data": {
            typesFile: "./graphql.ts",
            terminateCircularRelationships: true,
          },
        },
      ],
    },
  },
};

export default config;
