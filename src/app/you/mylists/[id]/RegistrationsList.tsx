"use client";

import "client-only";

import { useQuery } from "urql";

import { RegistrationsList as Presentation } from "~/app/users/[name]/mylists/[id]/RegistrationsList";
import { graphql } from "~/gql";

export const RegistrationsList: React.FC<{ mylistId: string }> = ({
  mylistId,
}) => {
  const [{ data }] = useQuery({
    query: graphql(`
      query YouMylistPage_RegistrationsList($mylistId: ID!) {
        whoami {
          id
          mylist(id: $mylistId) {
            ...UserMylistPage_RegistrationsList
            id
          }
        }
      }
    `),
    variables: { mylistId },
  });

  if (!data?.whoami?.mylist) return null;
  return <Presentation fragment={data.whoami.mylist} />;
};
