"use client";
import React, { ComponentProps } from "react";
import { useQuery } from "urql";

import { getFragment as useFragment, graphql } from "~/gql";
import {
  RegisterNicovideoPage_ExactTagDocument,
  RegisterNicovideoPage_InnerTagFragmentDoc,
} from "~/gql/graphql";

import { TagInner } from "./TagInner";

graphql(`
  query RegisterNicovideoPage_ExactTag($id: ID!) {
    tag(id: $id) {
      id
      ...RegisterNicovideoPage_InnerTag
    }
  }
`);

export const RegisterTag: React.FC<
  {
    className?: string;
    tagId: string;
  } & Omit<ComponentProps<typeof TagInner>, "className" | "fragment">
> = ({ ...props }) => {
  const [result] = useQuery({
    query: RegisterNicovideoPage_ExactTagDocument,
    variables: { id: props.tagId },
  });
  const tag = useFragment(
    RegisterNicovideoPage_InnerTagFragmentDoc,
    result.data?.tag
  );
  return <TagInner tag={tag || undefined} {...props} />;
};
