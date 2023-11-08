import clsx from "clsx";
import React from "react";

import { UserIcon } from "~/components/UserIcon";
import { graphql } from "~/gql";
import { UserPageLayout_HeaderFragment } from "~/gql/graphql";

graphql(`
  fragment UserPageLayout_Header on User {
    ...UserIcon
    name
    displayName
  }
`);
export const Header: React.FC<{
  className?: string;
  fragment?: UserPageLayout_HeaderFragment;
}> = ({ className, fragment }) => {
  return (
    <header className={clsx(className, ["flex h-48 items-center bg-sky-100"])}>
      <div
        className={clsx([
          "container mx-auto flex max-w-screen-lg items-center px-12",
        ])}
      >
        <div className={clsx("h-[96px] w-[96px]")}>
          {fragment && <UserIcon size={96} fragment={fragment || undefined} />}
        </div>
        <div className={clsx("ml-4")}>
          <p className={clsx("text-xl text-slate-900")}>
            {fragment?.displayName}
          </p>
          <p className={clsx("font-mono text-base text-slate-600")}>
            {fragment?.name && `@${fragment.name}`}
          </p>
        </div>
      </div>
    </header>
  );
};
