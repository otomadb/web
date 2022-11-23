import { graphql } from "~/gql";
import { gqlClient } from "~/gql/client";

const GetUserQueryDocument = graphql(`
  query GetUser($name: String!) {
    user(name: $name) {
      id
      name
      displayName
      icon
    }
  }
`);

export const getData = async (name: string) => {
  const { user } = await gqlClient.request(GetUserQueryDocument, { name });

  return {
    id: user.id,
    name: user.name,
    displayName: user.displayName,
    icon: user.icon,
  };
};
