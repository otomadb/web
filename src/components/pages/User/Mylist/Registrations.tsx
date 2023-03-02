"use client";

import "client-only";

import clsx from "clsx";
import React from "react";

import { getFragment as useFragment, graphql } from "~/gql";
import {
  MylistPage_RegistrationFragmentDoc,
  UserMylistPage_RegistrationsFragment,
} from "~/gql/graphql";

import { Registeration } from "./Registeration";

graphql(`
  fragment UserMylistPage_Registrations on Mylist {
    registrations(input: { order: { createdAt: DESC } }) {
      nodes {
        id
        ...MylistPage_Registration
      }
    }
  }
`);

export const Registrations: React.FC<{
  className?: string;
  fallback: UserMylistPage_RegistrationsFragment;
}> = ({ className, fallback }) => {
  const nodes = useFragment(
    MylistPage_RegistrationFragmentDoc,
    fallback.registrations.nodes
  );

  return (
    <section className={clsx(className)}>
      <div className={clsx(["flex", ["flex-col"], ["gap-y-4"]])}>
        {nodes.map((registration) => (
          <Registeration key={registration.id} registration={registration} />
        ))}
      </div>
    </section>
  );
};
