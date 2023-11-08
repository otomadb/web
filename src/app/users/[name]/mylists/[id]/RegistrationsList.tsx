import clsx from "clsx";
import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

import { RegistrationsListItem } from "./RegistrationsListItem";

export const Fragment = graphql(`
  fragment UserMylistPage_RegistrationsList on Mylist {
    registrations(first: 20, orderBy: { createdAt: DESC }) {
      nodes {
        id
        ...UserMylistPage_RegistrationsListItem
      }
    }
  }
`);
export const RegistrationsList: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div className={clsx(className, "flex flex-col gap-y-4")}>
      {fragment.registrations.nodes.map((registration) => (
        <RegistrationsListItem key={registration.id} fragment={registration} />
      ))}
    </div>
  );
};
