import clsx from "clsx";
import React, { ReactNode } from "react";

import { MylistTitle } from "~/components/MylistTitle";
import { UserIcon } from "~/components/UserIcon";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment UserMylistsPage_MylistsListItem on Mylist {
    ...MylistTitle
    ...MylistLinkSwitch
    id
    isLikeList
    range
    holder {
      ...UserIcon
      name
      displayName
    }
    registrations(first: 5, orderBy: { createdAt: DESC }) {
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
export const MylistListItem: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
  Link: React.FC<{ className?: string; children: ReactNode }>;
}> = ({ className, Link, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  const { holder, registrations } = fragment;
  return (
    <div
      className={clsx(className, [
        "group/mylist flex items-center rounded border border-slate-300 bg-slate-100 px-4 py-3",
      ])}
    >
      <div className={clsx("grow flex-col")}>
        <div>
          <Link>
            <MylistTitle fragment={fragment} />
          </Link>
        </div>
        <div className={clsx("mt-1 flex items-center")}>
          <UserIcon fragment={holder} size={24} />
          <div className={clsx("ml-1 text-xs")}>
            <span className={clsx("text-slate-900")}>{holder.displayName}</span>
            <span className={clsx("ml-1 font-mono text-slate-600")}>
              @{holder.name}
            </span>
          </div>
        </div>
        <div className={clsx("mt-1 flex items-center gap-x-2")}>
          <div className={clsx("text-xs text-slate-600")}>{fragment.range}</div>
        </div>
      </div>
      <div
        className={clsx([
          "relative w-[512px] overflow-hidden rounded border border-slate-300 bg-slate-200 px-4 py-2",
        ])}
      >
        <div className={clsx("z-0 flex h-[72px] gap-x-2")}>
          {registrations.nodes.map(({ id, video }) => (
            <div key={id}>
              <VideoThumbnail
                className={clsx("h-full w-[96px]")}
                fragment={video}
                imageSize="small"
              />
            </div>
          ))}
        </div>
        <div
          className={clsx([
            "absolute inset-0 z-1 flex items-end bg-gradient-to-r from-transparent to-slate-200 px-4 py-2",
          ])}
        >
          <p className={clsx("text-xs text-slate-700")}>
            {registrations.nodes.length === 0 && (
              <>登録されている動画はありません。</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
