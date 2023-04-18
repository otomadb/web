import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.graphql",
  documents: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.graphql"],
  generates: {
    "src/gql/": {
      preset: "client",
      config: {
        dedupeFragments: true, // https://zenn.dev/link/comments/94104de0ddecfc
        scalars: {
          DateTime: "string",
        },
      },
      presetConfig: {},
    },
    "src/gql/urql-introspection.ts": {
      plugins: [
        {
          "@graphql-codegen/urql-introspection": {},
        },
      ],
    },
    "src/gql/mock.ts": {
      plugins: [
        {
          "graphql-codegen-typescript-mock-data": {
            typesFile: "./graphql.ts",
          },
        },
      ],
    },
  },
};

export default config;
