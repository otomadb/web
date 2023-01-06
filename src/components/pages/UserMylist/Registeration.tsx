import { PencilIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/components/common/Link";
import { Tag } from "~/components/common/Tag";
import { Thumbnail } from "~/components/common/Thumbnail";
import { getFragment, graphql } from "~/gql";
import {
  Component_TagFragmentDoc,
  Component_ThumbnailFragmentDoc,
  MylistPage_RegistrationFragment,
} from "~/gql/graphql";

graphql(`
  fragment MylistPage_Registration on MylistRegistration {
    id
    note
    video {
      id
      title
      ...Component_Thumbnail
      tags(input: { limit: 5 }) {
        id
        ...Component_Tag
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
      videoId={video.id}
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
      <Thumbnail
        fragment={getFragment(Component_ThumbnailFragmentDoc, video)}
        className={clsx(
          ["flex-shrink-0"],
          ["w-[144px]", "@[1024px]/registration:w-[112px]"],
          ["h-[108px]", "@[1024px]/registration:h-[84px]"],
          ["border", "border-slate-400"]
        )}
        width={144}
        height={108}
        Wrapper={(props) => <div {...props} />}
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
          {video.tags.map((tag) => (
            <Tag
              key={tag.id}
              tag={getFragment(Component_TagFragmentDoc, tag)}
              Wrapper={(props) => <div {...props} />}
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
