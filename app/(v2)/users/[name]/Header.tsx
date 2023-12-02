import clsx from "clsx";
import React from "react";

import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

import UserPageLink from "./Link";

const Fragment = graphql(`
  fragment UserPage_Header on User {
    ...UserIcon
    ...Link_User
    name
    displayName
  }
`);
export default function Header({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}) {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <header
      className={clsx(className, "flex h-48 items-center bg-obsidian-primary")}
    >
      <div
        className={clsx(
          "mx-auto flex w-full max-w-screen-lg items-center gap-x-8 px-12"
        )}
      >
        <div className={clsx("h-[96px] w-[96px]")}>
          <UserIcon size={96} fragment={fragment} />
        </div>
        <div className={clsx("")}>
          <h1 className={clsx("text-xl font-bold text-snow-primary")}>
            <UserPageLink fragment={fragment}>
              {fragment.displayName}
            </UserPageLink>
          </h1>
          <p className={clsx("font-mono text-base text-snow-darker")}>
            @{fragment.name}
          </p>
        </div>
      </div>
    </header>
  );
}
