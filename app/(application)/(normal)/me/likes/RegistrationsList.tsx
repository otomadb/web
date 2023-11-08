"use client";

import "client-only";

import { useQuery } from "urql";

import { RegistrationsList as Presentation } from "~/app/(application)/users/[name]/mylists/[id]/RegistrationsList";
import { graphql } from "~/gql";

export const RegistrationsList: React.FC = () => {
  const [{ data }] = useQuery({
    query: graphql(`
      query YouLikePage_RegistrationsList {
        whoami {
          id
          likes {
            ...UserMylistPage_RegistrationsList
            id
          }
        }
      }
    `),
  });

  if (!data?.whoami?.likes) return null;
  return <Presentation fragment={data.whoami.likes} />;
};
