import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.GRAPHQL_SCHEMA_PATH || "./schema.graphql",
  documents: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.graphql"],
  generates: {
    ...(!process.env.CI && {
      "schema.graphql": {
        plugins: ["schema-ast"],
      },
    }),
    "src/gql/": {
      preset: "client",
      plugins: [
        {
          "@graphql-codegen/typescript-urql-graphcache": {},
        },
        {
          "graphql-codegen-typescript-mock-data": {
            terminateCircularRelationships: true,
          },
        },
      ],
      config: {
        dedupeFragments: true, // https://zenn.dev/link/comments/94104de0ddecfc
        scalars: {
          DateTime: "string",
        },
      },
      presetConfig: {
        fragmentMasking: {
          unmaskFunctionName: "getFragment",
        },
      },
    },
  },
};

export default config;
