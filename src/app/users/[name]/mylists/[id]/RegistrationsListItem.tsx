import { PencilIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/app/videos/[serial]/Link";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { CommonTag } from "~/components/CommonTag";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment UserMylistPage_RegistrationsListItem on MylistRegistration {
    id
    note
    video {
      ...VideoThumbnail
      id
      title
      ...Link_Video
      taggings(first: 5) {
        nodes {
          id
          tag {
            ...CommonTag
          }
        }
      }
    }
  }
`);
export const RegistrationsListItem: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  const { video, note } = fragment;

  return (
    <LinkVideo
      fragment={fragment.video}
      className={clsx(
        className,
        ["@container/registration"],
        ["group/registration"],
        ["border", "border-slate-300"],
        ["bg-slate-100"],
        ["rounded"],
        ["py-3"],
        ["px-4"],
        ["flex"]
      )}
    >
      <VideoThumbnail
        fragment={video}
        className={clsx(
          ["flex-shrink-0"],
          ["w-[144px]", "@[1024px]/registration:w-[112px]"],
          ["h-[108px]", "@[1024px]/registration:h-[84px]"],
          ["border", "border-slate-400"]
        )}
        width={144}
        height={108}
      />
      <div className={clsx(["flex-grow"], ["px-4"], ["flex", "flex-col"])}>
        <div className={clsx()}>
          <p className={clsx(["text-base"], ["text-slate-900"])}>
            {video.title}
          </p>
        </div>
        <div
          className={clsx(
            ["mt-1"],
            ["flex", ["flex-wrap"], ["gap-x-1"], ["gap-y-1"]]
          )}
        >
          {video.taggings.nodes.map((tagging) => (
            <CommonTag
              key={tagging.id}
              className={clsx(["text-xs"], ["px-1"], ["py-0.5"])}
              fragment={tagging.tag}
            />
          ))}
        </div>
        {note && note !== "" && (
          <div
            className={clsx(
              ["mt-2"],
              ["px-2"],
              ["py-2"],
              ["rounded"],
              ["bg-slate-200"]
            )}
          >
            <p>
              <PencilIcon
                className={clsx(
                  ["float-left"],
                  ["w-4"],
                  ["h-4"],
                  ["text-slate-400"]
                )}
              />
              <div className={clsx(["text-xs"], ["text-slate-700"])}>
                {note}
              </div>
            </p>
          </div>
        )}
      </div>
    </LinkVideo>
  );
};
