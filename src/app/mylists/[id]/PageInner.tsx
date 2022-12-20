"use client";

import "client-only";

import clsx from "clsx";
import { notFound } from "next/navigation";
import React, { useEffect } from "react";
import { useQuery } from "urql";

import { FragmentType, getFragment as useFragment } from "~/gql";
import {
  MylistPage_RegistrationsSectionFragmentDoc,
  MylistPage_RootFragmentDoc,
  MylistPageDocument,
} from "~/gql/graphql";

import { DetailsSection } from "./Details";
import { RegistrationsSection } from "./Registrations";

export const CheckPrivate: React.FC<{ mylistId: string }> = ({ mylistId }) => {
  const [result] = useQuery({
    query: MylistPageDocument,
    variables: { id: `mylist:${mylistId}` },
  });
  const { data } = result;

  useEffect(() => {
    if (data && data.findMylist === null) notFound();
  }, [data]);

  if (!data || !data.findMylist) return <div>Checking</div>;
  return <PageInner mylistId={mylistId} fragment={data.findMylist} />;
};

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
