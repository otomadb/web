"use client";

import "client-only";

import { notFound } from "next/navigation";
import React, { useEffect } from "react";
import { useQuery } from "urql";

import { FragmentType, getFragment } from "~/gql";
import { MylistPage_RootFragmentDoc, MylistPageDocument } from "~/gql/graphql";

export const ExistsCheck: React.FC<{ mylistId: string }> = ({ mylistId }) => {
  const [result] = useQuery({
    query: MylistPageDocument,
    variables: { id: `mylist:${mylistId}` },
  });
  const { data } = result;

  useEffect(() => {
    if (data && data.findMylist === null) notFound();
  }, [data]);

  if (!data || !data.findMylist) return <div>Checking</div>;
  return <PageInner mylistId={mylistId} fallback={data.findMylist} />;
};

export const PageInner: React.FC<{
  mylistId: string;
  fallback: FragmentType<typeof MylistPage_RootFragmentDoc>;
}> = ({ fallback }) => {
  const mylist = getFragment(MylistPage_RootFragmentDoc, fallback);

  return <div>{mylist.id}</div>;
};
