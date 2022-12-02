import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.GRAPHQL_SCHEMA_PATH || "./schema.graphql",
  documents: ["src/**/*.ts", "src/**/*.tsx"],
  generates: {
    ...(!process.env.CI && {
      "schema.graphql": {
        plugins: ["schema-ast"],
      },
    }),
    "src/gql/": {
      preset: "client",
      plugins: [],
      config: {
        scalars: {
          DateTime: "string",
        },
      },
    },
  },
};

export default config;
