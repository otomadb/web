"use client";
import React from "react";

import CommonTag from "~/components/CommonTag";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment RegisterTagPage_SucceededToast on RegisterTagSucceededPayload {
    tag {
      ...CommonTag
    }
  }
`);
export const SucceededToast: React.FC<{
  fragment: FragmentType<typeof Fragment>;
}> = ({ ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  return (
    <>
      <CommonTag size="small" fragment={fragment.tag} />
      を登録しました．
    </>
  );
};
