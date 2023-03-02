import clsx from "clsx";
import React from "react";

import { UserIcon } from "~/components/common/UserIcon";
import { VideoThumbnail } from "~/components/common/VideoThumbnail";
import { getFragment, graphql } from "~/gql";
import {
  MylistPageCommon_LinkSwitchFragmentDoc,
  UserMylistsPage_LargeMylistListItemFragment,
} from "~/gql/graphql";

import { MylistLinkSwitch } from "../LinkSwitch";

graphql(`
  fragment UserMylistsPage_LargeMylistListItem on Mylist {
    ...MylistPageCommon_LinkSwitch
    id
    title
    isLikeList
    range
    holder {
      id
      name
      displayName
      icon
      ...UserIcon
    }
    registrations(input: { limit: 5, order: { createdAt: DESC } }) {
      nodes {
        id
        video {
          ...VideoThumbnail
          id
        }
      }
    }
  }
`);
export const LargeMylistListItem: React.FC<{
  className?: string;
  fragment: UserMylistsPage_LargeMylistListItemFragment;
}> = ({ className, fragment }) => {
  const { isLikeList, title, holder, registrations } = fragment;

  return (
    <MylistLinkSwitch
      fragment={getFragment(MylistPageCommon_LinkSwitchFragmentDoc, fragment)}
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
          <UserIcon fragment={holder} size={24} />
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
              <VideoThumbnail
                className={clsx(["w-[96px]"], ["h-full"])}
                fragment={video}
                width={96}
                height={72}
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
    </MylistLinkSwitch>
  );
};
