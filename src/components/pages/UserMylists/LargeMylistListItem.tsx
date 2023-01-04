import clsx from "clsx";
import React from "react";

import { LinkUserMylist } from "~/components/common/Link";
import { Thumbnail } from "~/components/common/Thumbnail";
import { UserIcon2 } from "~/components/common/UserIcon";
import { getFragment, graphql } from "~/gql";
import {
  Component_ThumbnailFragmentDoc,
  Component_UserIconFragmentDoc,
  UserMylistsPage_LargeMylistListItemFragment,
} from "~/gql/graphql";

graphql(`
  fragment UserMylistsPage_LargeMylistListItem on Mylist {
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
export const LargeMylistListItem: React.FC<{
  className?: string;
  fragment: UserMylistsPage_LargeMylistListItemFragment;
}> = ({ className, fragment }) => {
  const { id, isLikeList, title, holder, registrations } = fragment;

  return (
    <LinkUserMylist
      userName={holder.name}
      mylistId={id}
      className={clsx(
        className,
        ["border", "border-slate-300"],
        ["bg-slate-100"],
        ["py-3"],
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
      <div
        className={clsx(
          ["relative"],
          ["w-[512px]"],
          ["overflow-hidden"],
          ["border", "border-slate-300"],
          ["bg-slate-200"],
          ["px-4"],
          ["py-2"],
          ["rounded"]
        )}
      >
        <div className={clsx(["z-0"], ["flex", "gap-x-2"], ["h-[72px]"])}>
          {registrations.nodes.map(({ id, video }) => (
            <div key={id}>
              <Thumbnail
                className={clsx(["w-[96px]"], ["h-full"])}
                fragment={getFragment(Component_ThumbnailFragmentDoc, video)}
                width={96}
                height={72}
                Wrapper={(props) => <div {...props} />}
              />
            </div>
          ))}
        </div>
        <div
          className={clsx(
            ["flex", "items-end"],
            ["z-1"],
            ["absolute"],
            ["inset-0"],
            ["px-4"],
            ["py-2"],
            ["bg-gradient-to-r", "from-transparent", "to-slate-200"]
          )}
        >
          <p className={clsx(["text-xs"], ["text-slate-700"])}>
            {registrations.nodes.length === 0 && (
              <>登録されている動画はありません。</>
            )}
          </p>
        </div>
      </div>
    </LinkUserMylist>
  );
};
