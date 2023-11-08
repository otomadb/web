"use client";

import "client-only";

import { useQuery } from "urql";

import { Details as Presentation } from "~/app/(application)/users/[name]/mylists/[id]/Details";
import { graphql } from "~/gql";

export const Details: React.FC = () => {
  const [{ data }] = useQuery({
    query: graphql(`
      query YouLikePage_Details {
        whoami {
          id
          likes {
            ...UserMylistPage_Details
            id
          }
        }
      }
    `),
  });

  if (!data?.whoami?.likes) return null;
  return <Presentation fragment={data.whoami.likes} />;
};
