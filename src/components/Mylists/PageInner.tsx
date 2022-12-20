"use client";

import "client-only";

import clsx from "clsx";
import React from "react";

import { FragmentType, getFragment as useFragment } from "~/gql";
import {
  MylistPage_RegistrationsSectionFragmentDoc,
  MylistPage_RootFragmentDoc,
} from "~/gql/graphql";

import { DetailsSection } from "./Details";
import { RegistrationsSection } from "./Registrations";

export const PageInner: React.FC<{
  mylistId: string;
  fragment: FragmentType<typeof MylistPage_RootFragmentDoc>;
}> = ({ fragment, mylistId }) => {
  const mylist = useFragment(MylistPage_RootFragmentDoc, fragment);
  const registrations = useFragment(
    MylistPage_RegistrationsSectionFragmentDoc,
    mylist
  );

  return (
    <div>
      <DetailsSection mylistId={mylistId} fallback={mylist} />
      <RegistrationsSection
        className={clsx(["mt-2"])}
        mylistId={mylistId}
        fallback={registrations}
      />
    </div>
  );
};
