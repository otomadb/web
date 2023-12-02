import "server-only";

import { GraphQLClient } from "graphql-request";
import { RequestConfig } from "graphql-request/build/esm/types";

export const makeGraphQLClient = (config: RequestConfig = {}) =>
  new GraphQLClient(process.env.GRAPHQL_API_ENDPOINT, config);
