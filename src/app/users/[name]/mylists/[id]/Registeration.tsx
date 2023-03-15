import { PencilIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/app/videos/[serial]/Link";
import { CommonTag } from "~/components/common/Tag";
import { VideoThumbnail } from "~/components/common/VideoThumbnail";
import { graphql } from "~/gql";
import { MylistPage_RegistrationFragment } from "~/gql/graphql";

graphql(`
  fragment MylistPage_Registration on MylistRegistration {
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
export const Registeration: React.FC<{
  className?: string;
  registration: MylistPage_RegistrationFragment;
}> = ({ className, registration }) => {
  const { note, video } = registration;
  return (
    <LinkVideo
      fragment={registration.video}
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
