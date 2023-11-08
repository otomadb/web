"use client";
import clsx from "clsx";
import React from "react";

import { MyPageLink } from "~/app/me/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment GlobalNav_ProfileAccordion_AboutMe on Query {
    whoami {
      name
      displayName
    }
  }
`);
export default function AboutMe({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof Fragment>;
}) {
  const { whoami } = useFragment(Fragment, props.fragment);

  return (
    <MyPageLink
      style={style}
      className={clsx(className, ["group bg-white/75 hover:bg-sky-300/75"])}
    >
      <div
        className={clsx([
          "text-sm font-bold text-slate-900 group-hover/link:text-sky-900",
        ])}
      >
        {whoami.displayName}
      </div>
      <div
        className={clsx([
          "text-xs text-slate-700 group-hover/link:text-sky-700",
        ])}
      >
        @{whoami.name}
      </div>
    </MyPageLink>
  );
}
