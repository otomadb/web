import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.graphql",
  documents: ["{app,components}/**/*.ts{,x}"],
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
  },
};

export default config;
