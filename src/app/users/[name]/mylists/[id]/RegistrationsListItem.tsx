import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/app/mads/[serial]/Link";
import { CommonTag } from "~/components/CommonTag";
import Pictogram from "~/components/Pictogram";
import { VideoThumbnail } from "~/components/VideoThumbnail";
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
      className={clsx(className, [
        "group/registration flex rounded border border-slate-300 bg-slate-100 px-4 py-3 @container/registration",
      ])}
    >
      <VideoThumbnail
        fragment={video}
        className={clsx([
          "h-[108px] w-[144px] shrink-0 border border-slate-400 @[1024px]/registration:h-[84px] @[1024px]/registration:w-[112px]",
        ])}
        imageSize="medium"
      />
      <div className={clsx("flex grow flex-col px-4")}>
        <div className={clsx()}>
          <p className={clsx("text-base text-slate-900")}>{video.title}</p>
        </div>
        <div className={clsx(["mt-1 flex flex-wrap gap-1"])}>
          {video.taggings.nodes.map((tagging) => (
            <CommonTag
              key={tagging.id}
              className={clsx("px-1 py-0.5 text-xs")}
              fragment={tagging.tag}
            />
          ))}
        </div>
        {note && note !== "" && (
          <div className={clsx(["mt-2 rounded bg-slate-200 p-2"])}>
            <p>
              <Pictogram
                icon="note"
                className={clsx(["float-left h-4 w-4 text-slate-400"])}
              />
              <div className={clsx("text-xs text-slate-700")}>{note}</div>
            </p>
          </div>
        )}
      </div>
    </LinkVideo>
  );
};
