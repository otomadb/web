"use client";
import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";

import ToggleTagButton from "./ToggleTagButton";

export const TagButton: React.FC<{
  className?: string;
  tagId: string;
}> = ({ className, tagId }) => {
  const [{ data }] = useQuery({
    query: graphql(`
      query RegisterNicovideoPage_RegisterForm_Confirm_Tag($id: ID!) {
        getTag(id: $id) {
          ...RegisterNicovideoPage_RequestFormPart_ToggleTagButton
        }
      }
    `),
    variables: { id: tagId },
    requestPolicy: "cache-first",
  });

  if (!data) return null;
  return <ToggleTagButton className={clsx(className)} fragment={data.getTag} />;
};
