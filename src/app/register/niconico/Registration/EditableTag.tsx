"use client";
import "client-only";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";
import { RegisterNiconicoPage_TagInfoDocument } from "~/gql/graphql";

graphql(`
  query RegisterNiconicoPage_TagInfo($id: ID!) {
    tag(id: $id) {
      id
      name
      type
    }
  }
`);

export const EditableTag: React.FC<{ className?: string; id: string }> = ({
  className,
  id,
}) => {
  const [result] = useQuery({
    query: RegisterNiconicoPage_TagInfoDocument,
    variables: { id },
  });
  const { data, fetching } = result;

  return (
    <div className={clsx(className)}>
      {data && (
        <>
          <span>{data.tag.name}</span>
          <span>{data.tag.type}</span>
        </>
      )}
      {fetching && (
        <ArrowPathIcon className={clsx(["animate-spin"], ["w-4"], ["h-4"])} />
      )}
    </div>
  );
};
