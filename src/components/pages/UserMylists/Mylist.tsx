import clsx from "clsx";
import React from "react";

import { LinkMylist } from "~/components/common/Link";
import { Thumbnail } from "~/components/common/Thumbnail";
import { UserIcon2 } from "~/components/common/UserIcon";
import { getFragment, graphql } from "~/gql";
import {
  Component_ThumbnailFragmentDoc,
  Component_UserIconFragmentDoc,
  UserMylistsPage_MylistFragment,
} from "~/gql/graphql";

graphql(`
  fragment UserMylistsPage_Mylist on Mylist {
    id
    title
    isLikeList
    range
    holder {
      id
      name
      displayName
      icon
      ...Component_UserIcon
    }
    registrations(input: { limit: 5, order: { createdAt: DESC } }) {
      nodes {
        id
        video {
          id
          ...Component_Thumbnail
        }
      }
    }
  }
`);
export const Mylist: React.FC<{
  className?: string;
  fragment: UserMylistsPage_MylistFragment;
}> = ({ className, fragment }) => {
  const { id, isLikeList, title, holder, registrations } = fragment;

  return (
    <LinkMylist
      mylistId={id}
      className={clsx(
        className,
        ["border", "border-slate-300"],
        ["py-2"],
        ["px-4"],
        ["flex", "items-center"],
        ["rounded"],
        ["group/mylist"]
      )}
    >
      <div className={clsx(["flex-grow"], ["flex-col"])}>
        <div>
          <p className={clsx(["text-lg"])}>
            {!isLikeList && title}
            {isLikeList && `${holder.displayName}のいいね欄`}
          </p>
        </div>
        <div className={clsx(["mt-1"], ["flex", "items-center"])}>
          <UserIcon2
            fragment={getFragment(Component_UserIconFragmentDoc, holder)}
            size={24}
          />
          <div className={clsx(["ml-1"], ["text-xs"])}>
            <span className={clsx(["text-slate-900"])}>
              {holder.displayName}
            </span>
            <span className={clsx(["ml-1"], ["text-slate-600"], ["font-mono"])}>
              @{holder.name}
            </span>
          </div>
        </div>
        <div className={clsx(["mt-1"], ["flex", "items-center", "gap-x-2"])}>
          <div className={clsx(["text-xs"], ["text-slate-600"])}>
            {fragment.range}
          </div>
        </div>
      </div>
      <div>
        <div
          className={clsx(
            ["flex", "gap-x-2"],
            ["py-2"],
            ["px-4"],
            ["border", "border-slate-300"],
            ["bg-slate-100"],
            ["rounded"]
          )}
        >
          {registrations.nodes.map(({ id, video }) => (
            <div key={id}>
              <Thumbnail
                className={clsx(["w-[96px]"], ["h-[72px]"])}
                fragment={getFragment(Component_ThumbnailFragmentDoc, video)}
                width={96}
                height={72}
                Wrapper={(props) => <div {...props} />}
              />
            </div>
          ))}
        </div>
      </div>
    </LinkMylist>
  );
};
