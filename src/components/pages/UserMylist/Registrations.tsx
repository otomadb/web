"use client";

import "client-only";

import clsx from "clsx";
import React from "react";

import { getFragment, graphql } from "~/gql";
import {
  MylistPage_RegistrationFragmentDoc,
  MylistPage_RegistrationsFragment,
} from "~/gql/graphql";

import { Registeration } from "./Registeration";

graphql(`
  fragment MylistPage_Registrations on Mylist {
    registrations(input: { limit: 24 }) {
      nodes {
        id
        ...MylistPage_Registration
      }
    }
  }

  query MylistPage_UpstreamRegistrations($id: ID!) {
    mylist(id: $id) {
      ...MylistPage_Registrations
    }
  }
`);

export const Registrations: React.FC<{
  className?: string;
  fallback: MylistPage_RegistrationsFragment;
}> = ({ className, fallback }) => {
  const nodes = getFragment(
    MylistPage_RegistrationFragmentDoc,
    fallback.registrations.nodes
  );

  return (
    <section className={clsx(className)}>
      <div
        className={clsx(
          ["mt-1"],
          [
            "grid",
            ["grid-cols-1", "lg:grid-cols-2", "xl:grid-cols-3"],
            ["gap-x-2"],
            ["gap-y-2"],
          ]
        )}
      >
        {nodes.map((registration) => (
          <Registeration key={registration.id} registration={registration} />
        ))}
      </div>
    </section>
  );
};
