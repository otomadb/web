import clsx from "clsx";
import React, { ReactNode } from "react";

import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

import MyTopPageLink from "../../me/Link";
import UserPageLink from "./Link";

const UserPageHeaderFragment = graphql(`
  fragment UserPage_Header on User {
    ...UserIcon
    ...Link_User
    name
    displayName
  }
`);
export default function UserPageHeader({
  className,
  isMyPage = false,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof UserPageHeaderFragment>;
  isMyPage?: boolean;
}) {
  const fragment = useFragment(UserPageHeaderFragment, props.fragment);

  const UserLink: React.FC<{ className?: string; children?: ReactNode }> =
    isMyPage
      ? (props) => <MyTopPageLink {...props} />
      : (props) => <UserPageLink {...props} fragment={fragment} />;

  return (
    <header
      className={clsx(className, "flex h-48 items-center bg-obsidian-primary")}
    >
      <div
        className={clsx(
          "mx-auto flex w-full max-w-screen-lg items-center gap-x-8 px-12"
        )}
      >
        <UserLink className={clsx("h-[96px] w-[96px]")}>
          <UserIcon size={96} fragment={fragment} />
        </UserLink>
        <div className={clsx("")}>
          <h1 className={clsx("text-xl font-bold text-snow-primary")}>
            <UserLink>{fragment.displayName}</UserLink>
          </h1>
          <p className={clsx("font-mono text-base text-snow-darker")}>
            @{fragment.name}
          </p>
        </div>
      </div>
    </header>
  );
}
