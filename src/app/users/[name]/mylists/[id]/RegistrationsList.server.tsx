import clsx from "clsx";
import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { RegistrationsListItem } from "./RegistrationsListItem";

const Fragment = graphql(`
  fragment UserMylistPage_RegistrationsList on Mylist {
    id
  }
`);
export const RegistrationsList = async ({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}) => {
  const fragment = useFragment(Fragment, props.fragment);

  const { getMylist } = await fetchGql(
    graphql(`
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
    `),
    { id: fragment.id }
  );

  return (
    <div className={clsx(className, ["flex", ["flex-col"], ["gap-y-4"]])}>
      {getMylist.registrations.nodes.map((registration) => (
        <RegistrationsListItem key={registration.id} fragment={registration} />
      ))}
    </div>
  );
};
