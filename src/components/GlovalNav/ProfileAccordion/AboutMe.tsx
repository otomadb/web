"use client";
import clsx from "clsx";
import React from "react";

import { MyPageLink } from "~/app/me/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment GlobalNav_Profile_Accordion_AboutMe on User {
    name
    displayName
  }
`);
export default function AboutMe({
  ...props
}: {
  fragment: FragmentType<typeof Fragment>;
}) {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <MyPageLink
      className={clsx(["block"], ["py-3"], ["px-4"], ["bg-white/75"])}
    >
      <div className={clsx(["text-slate-900"], ["text-sm"], ["font-bold"])}>
        {fragment.displayName}
      </div>
      <div className={clsx(["text-slate-700"], ["text-xs"])}>
        @{fragment.name}
      </div>
    </MyPageLink>
  );
}
