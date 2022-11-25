import "server-only";

import { graphql } from "~/gql";
import { gqlClient } from "~/gql/client";

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
  const { user } = await gqlClient.request(UserPageQueryDocument, { name });

  return {
    id: user.id,
    name: user.name,
    displayName: user.displayName,
    icon: user.icon,
  };
};
