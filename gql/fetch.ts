import { getAccessToken } from "@auth0/nextjs-auth0";
import { GraphQLClient } from "graphql-request";
import { RequestConfig } from "graphql-request/build/esm/types";

export const makeGraphQLClient = (config: RequestConfig = {}) =>
  new GraphQLClient(process.env.GRAPHQL_API_ENDPOINT, config);

export const makeGraphQLClient2 = async ({
  auth = "optional",
  ...fetchOptions
}: {
  auth?: "optional" | "required";
  next?: RequestInit["next"];
}) => {
  const accessToken = await getAccessToken()
    .then(({ accessToken }) => accessToken)
    .catch((e) => {
      if (auth === "optional") return undefined;
      else throw e;
    });
  return new GraphQLClient(process.env.GRAPHQL_API_ENDPOINT, {
    ...fetchOptions,
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });
};
