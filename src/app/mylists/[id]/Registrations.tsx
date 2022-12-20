"use client";

import "client-only";

import clsx from "clsx";
import React, { useMemo } from "react";
import { useQuery } from "urql";

import { Registeration } from "~/components/Mylists/Registrations/Registeration";
import { getFragment as useFragment, graphql } from "~/gql";
import {
  MylistPage_RegistrationsSection_RegistrationFragmentDoc,
  MylistPage_RegistrationsSectionDocument,
  MylistPage_RegistrationsSectionFragment,
  MylistPage_RegistrationsSectionFragmentDoc,
} from "~/gql/graphql";

graphql(`
  fragment MylistPage_RegistrationsSection on Mylist {
    registrations(input: { limit: 24 }) {
      nodes {
        id
        ...MylistPage_RegistrationsSection_Registration
      }
    }
  }

  query MylistPage_RegistrationsSection($id: ID!) {
    mylist(id: $id) {
      ...MylistPage_RegistrationsSection
    }
  }
`);

export const useRegistrations = ({
  id,
  fallback,
}: {
  id: string;
  fallback: MylistPage_RegistrationsSectionFragment;
}) => {
  const [result] = useQuery({
    query: MylistPage_RegistrationsSectionDocument,
    variables: { id },
  });
  const fragment = useFragment(
    MylistPage_RegistrationsSectionFragmentDoc,
    result.data?.mylist
  );
  const { registrations } = useMemo(
    () => fragment || fallback,
    [fragment, fallback]
  );

  return registrations;
};

export const RegistrationsSection: React.FC<{
  className?: string;
  mylistId: string;
  fallback: MylistPage_RegistrationsSectionFragment;
}> = ({ className, mylistId, fallback }) => {
  const registration = useRegistrations({ fallback, id: mylistId });

  const nodes = useFragment(
    MylistPage_RegistrationsSection_RegistrationFragmentDoc,
    registration.nodes
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
