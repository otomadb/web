import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import React from "react";

import { graphql } from "~/gql";

import { RegistrationsListItem } from "./RegistrationsListItem";

export const Query = graphql(`
  query UserMylistPage_RegistrationsList_Fetch($id: ID!) {
    getMylist(id: $id) {
      registrations(first: 20, orderBy: { createdAt: DESC }) {
        nodes {
          id
          ...UserMylistPage_RegistrationsListItem
        }
      }
    }
  }
`);
export const RegistrationsList = async ({
  className,
  fetcher,
}: {
  className?: string;
  fetcher: Promise<ResultOf<typeof Query>>;
}) => {
  const { getMylist } = await fetcher;

  return (
    <div className={clsx(className, ["flex", ["flex-col"], ["gap-y-4"]])}>
      {getMylist.registrations.nodes.map((registration) => (
        <RegistrationsListItem key={registration.id} fragment={registration} />
      ))}
    </div>
  );
};
