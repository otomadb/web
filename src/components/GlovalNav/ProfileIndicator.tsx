"use client";

import clsx from "clsx";
import React from "react";

import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

import { Accordion } from "./ProfileAccordion";

export const Fragment = graphql(`
  fragment GlobalNav_ProfileIndicator on User {
    id
    ...UserIcon
    ...GlobalNav_Profile_Accordion
  }
`);
export default function ProfileIndicator({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof Fragment>;
}) {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div
      style={style}
      className={clsx(className, ["relative"], ["group"], ["flex"])}
    >
      <div tabIndex={0}>
        <UserIcon
          className={clsx(["w-[32px]"], ["h-[32px]"])}
          fragment={fragment}
          size={32}
        />
      </div>
      <Accordion
        className={clsx(
          ["w-[16rem]"],
          ["invisible", "group-focus-within:visible", "group-hover:visible"],
          ["absolute"],
          ["top-full"],
          [["right-0", "xl:right-auto"], ["xl:-left-[7rem]"]],
          ["mx-auto"]
        )}
        fragment={fragment}
      />
    </div>
  );
}
