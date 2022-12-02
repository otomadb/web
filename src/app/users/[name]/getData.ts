import "server-only";

import gqlRequest from "graphql-request";

import { graphql } from "~/gql";

const UserPageQueryDocument = graphql(`
  query UserPage($name: String!) {
    user(name: $name) {
      id
      name
      displayName
      icon
    }
  }
`);

export const getData = async (name: string) => {
  const { user } = await gqlRequest(
    new URL("/graphql", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
    UserPageQueryDocument,
    { name }
  );

  return {
    id: user.id,
    name: user.name,
    displayName: user.displayName,
    icon: user.icon,
  };
};
