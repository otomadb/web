"use client";
import { notFound } from "next/navigation";
import React, { useEffect } from "react";
import { useQuery } from "urql";

import { PageInner } from "~/components/Mylists/PageInner";
import { MylistPageDocument } from "~/gql/graphql";

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
