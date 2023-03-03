import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.graphql",
  documents: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.graphql"],
  generates: {
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
      presetConfig: {},
    },
  },
};

export default config;
