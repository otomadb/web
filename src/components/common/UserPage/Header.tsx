import clsx from "clsx";
import React from "react";

import { UserIcon2 } from "~/components/common/UserIcon";
import { getFragment, graphql } from "~/gql";
import {
  Component_UserIconFragmentDoc,
  UserPageLayout_HeaderFragment,
} from "~/gql/graphql";

graphql(`
  fragment UserPageLayout_Header on User {
    ...Component_UserIcon
    name
    displayName
  }
`);
export const Header: React.FC<{
  className?: string;
  fragment?: UserPageLayout_HeaderFragment;
}> = ({ className, fragment }) => {
  return (
    <header
      className={clsx(
        className,
        ["flex", "items-center"],
        ["h-48"],
        ["bg-sky-100"]
      )}
    >
      <div
        className={clsx(
          ["px-12"],
          ["container", "max-w-screen-lg", "mx-auto"],
          ["flex", "items-center"]
        )}
      >
        <div className={clsx(["w-[96px]", "h-[96px]"])}>
          {fragment && (
            <UserIcon2
              size={96}
              fragment={
                getFragment(Component_UserIconFragmentDoc, fragment) ||
                undefined
              }
            />
          )}
        </div>
        <div className={clsx(["ml-4"])}>
          <p className={clsx(["text-xl"], ["text-slate-900"])}>
            {fragment?.displayName}
          </p>
          <p className={clsx(["text-base"], ["text-slate-600"], ["font-mono"])}>
            {fragment?.name && `@${fragment.name}`}
          </p>
        </div>
      </div>
    </header>
  );
};
