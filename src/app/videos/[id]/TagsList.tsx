"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { Fragment } from "react";

import { graphql } from "~/gql";
import { useAccessToken } from "~/hooks/useAccessToken";
import { useGraphQLClient } from "~/hooks/useGraphQLClient";

import { Tag } from "./Tag";
import { TagType } from "./types";

const UntagVideoMutationDocument = graphql(`
  mutation UntagVideo($input: UntagVideoInput!) {
    untagVideo(input: $input) {
      video {
        id
        title
      }
      tag {
        id
        name
      }
    }
  }
`);

export const RemovableTag: React.FC<{
  className?: string;
  id: string;
  name: string;
  context: string | null;
  // type: string;
  handleRemove(): void;
}> = ({
  className,
  name,
  context,
  // type,
  handleRemove,
}) => {
  return (
    <div
      className={clsx(
        className,
        ["flex", ["items-center"]],
        [
          "border",
          "border-gray-200",
          /*[
            "border-l-4",
            {
              "border-l-character-400": type === "CHARACTER",
              "border-l-class-400": type === "CLASS",
              "border-l-music-400": type === "MUSIC",
              "border-l-copyright-400": type === "COPYRIGHT",
            },
          ], */
        ],
        ["shadow-sm"],
        ["rounded"],
        ["overflow-hidden"]
      )}
    >
      <div
        className={clsx(
          ["px-1.5", "py-0.5"],
          ["flex"],
          ["items-center"],
          ["whitespace-nowrap"]
        )}
      >
        <span className={clsx(["text-slate-800"], ["text-xs"])}>{name}</span>
        {context && (
          <span className={clsx(["ml-0.5"], ["text-slate-500"], ["text-xs"])}>
            ({context})
          </span>
        )}
      </div>
      <button
        className={clsx(
          ["group"],
          ["bg-red-400", "hover:bg-red-600"],
          ["px-0.5"],
          ["py-0.5"]
        )}
        onClick={() => {
          handleRemove();
        }}
      >
        <XMarkIcon
          className={clsx(
            ["w-4"],
            ["h-4"],
            ["text-red-50", "group-hover:text-red-100"]
          )}
        />
      </button>
    </div>
  );
};

export const TagsList: React.FC<{
  className?: string;
  tags: TagType[];
  edit: boolean;
  videoId: string;
  updateTags(): void;
}> = ({ className, videoId, tags, edit, updateTags }) => {
  const gqlClient = useGraphQLClient();
  const [accessToken] = useAccessToken();

  return (
    <div className={className}>
      {/*<div className={clsx(["mt-2"], ["flex"], ["gap-x-2"], ["gap-y-2"])}>
        {tags
          .map(({ type }) => type)
          .filter((v1, i, arr) => i === arr.findIndex((v2) => v1 === v2))
          .map((type) => (
            <div key={type} className={clsx(["flex"])}>
              <span
                className={clsx(["text-xs"], ["select-all"], {
                  "text-copyright-400": type === "COPYRIGHT",
                  "text-character-400": type === "CHARACTER",
                  "text-class-400": type === "CLASS",
                  "text-music-400": type === "MUSIC",
                })}
              >
                {type}
              </span>
            </div>
          ))}
      </div>*/}
      <div
        className={clsx(
          // ["mt-2"],
          ["flex", "flex-wrap"],
          ["gap-x-1"],
          ["gap-y-1"]
        )}
      >
        {tags.map(({ id, name, explicitParent }) => (
          <Fragment key={id}>
            {!edit && (
              <Tag id={id} name={name} contextName={explicitParent?.name} />
            )}
            {edit && (
              <RemovableTag
                id={id}
                name={name}
                context={null}
                handleRemove={async () => {
                  await gqlClient.request(
                    UntagVideoMutationDocument,
                    { input: { tagId: id, videoId } },
                    { Authorization: `Bearer ${accessToken}` }
                  );
                  updateTags();
                }}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
