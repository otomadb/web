"use client";

import "client-only";

import { useQuery } from "urql";

import { Details as Presentation } from "~/app/(application)/users/[name]/mylists/[id]/Details";
import { graphql } from "~/gql";

export const Details: React.FC<{ mylistId: string }> = ({ mylistId }) => {
  const [{ data }] = useQuery({
    query: graphql(`
      query YouMylistPage_Details($mylistId: ID!) {
        whoami {
          id
          mylist(id: $mylistId) {
            ...UserMylistPage_Details
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
