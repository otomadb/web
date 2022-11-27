"use client";
import "client-only";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useContext, useMemo, useState } from "react";
import useSWR from "swr";

import { graphql } from "~/gql";
import { gqlClient } from "~/gql/client";

import { FormContext } from "./Form";

export const TagInfoQueryDocument = graphql(`
  query TagInfo($id: ID!) {
    tag(id: $id) {
      id
      name
      type
    }
  }
`);

export const Registration: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { tags: candidateTagsSet, primaryTitle } = useContext(FormContext);
  const candidateTags = useMemo(
    () => Array.from(candidateTagsSet),
    [candidateTagsSet]
  );

  return (
    <div className={clsx(className)}>
      <span>{primaryTitle}</span>
      <div>
        {[...candidateTags].map((id) => (
          <SelfTag key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

export const SelfTag: React.FC<{ className?: string; id: string }> = ({
  className,
  id,
}) => {
  const [tag, setTag] = useState<null | {
    id: string;
    name: string;
    type: string;
  }>(null);
  const { isValidating } = useSWR(
    [TagInfoQueryDocument, id],
    (doc, id) => gqlClient.request(doc, { id }),
    {
      onSuccess(data) {
        const { tag } = data;
        setTag({ id: tag.id, name: tag.name, type: tag.type });
      },
    }
  );

  if (!tag && isValidating)
    return (
      <div className={clsx(className)}>
        <ArrowPathIcon className={clsx(["animate-spin"], ["w-4"], ["h-4"])} />
      </div>
    );
  if (!tag) return <span>???</span>;

  return (
    <div className={clsx(className)}>
      <span>{tag.id}</span>
      <span>{tag.name}</span>
      <span>{tag.type}</span>
    </div>
  );
};
