"use client";
import clsx from "clsx";
import React from "react";

import { CommonTag } from "~/components/common/Tag";
import { graphql } from "~/gql";
import { RegisterNicovideoPage_RequestFragment } from "~/gql/graphql";

graphql(`
  fragment RegisterNicovideoPage_Request on NicovideoRegistrationRequest {
    id
    title
    checked
    taggings {
      id
      tag {
        id
        ...CommonTag
      }
    }
    semitaggings {
      id
      name
      note
    }
  }
`);
export const Request: React.FC<{
  className?: string;
  fragment: RegisterNicovideoPage_RequestFragment;
  toggleTag: (id: string) => void;
  toggleSemitag: (name: string) => void;
}> = ({ className, fragment, toggleTag, toggleSemitag }) => {
  return (
    <div
      className={clsx(
        className,
        ["flex", "gap-x-4"],
        ["border"],
        ["rounded-md"],
        ["px-4", "py-4"]
      )}
    >
      <div
        className={clsx(
          ["flex-shrink-0"],
          ["w-72"],
          ["flex", "flex-col", "gap-y-4"]
        )}
      >
        <div className={clsx(["flex", "flex-col", "gap-y-1"])}>
          <div className={clsx(["text-xs"])}>タイトル</div>
          <div className={clsx(["text-sm", "font-bold"])}>{fragment.title}</div>
        </div>
      </div>
      <div className={clsx(["flex-grow"], ["flex", "flex-col"])}>
        <div className={clsx(["flex-grow"], ["flex", "flex-col"])}>
          <div className={clsx(["text-xs"])}>タグ</div>
          <div className={clsx(["mt-1"], ["flex", ["gap-x-2"], ["gap-y-2"]])}>
            {fragment.taggings.map((tagging) => (
              <div key={tagging.id}>
                <button
                  type="button"
                  onClick={() => {
                    toggleTag(tagging.tag.id);
                  }}
                  className={clsx(["flex"])}
                >
                  <CommonTag
                    className={clsx(["text-xs"], ["px-1"], ["py-0.5"])}
                    fragment={tagging.tag}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className={clsx(["flex-grow"], ["flex", "flex-col"])}>
          <div className={clsx(["text-xs"])}>仮タグ</div>
          <div className={clsx(["mt-1"], ["flex", ["gap-x-2"], ["gap-y-2"]])}>
            {fragment.semitaggings.map((semitagging) => (
              <div key={semitagging.id}>
                <button
                  type="button"
                  onClick={() => {
                    toggleSemitag(semitagging.name);
                  }}
                  className={clsx(
                    ["flex"],
                    ["text-sm"],
                    ["bg-white"],
                    ["border", "border-gray-200"],
                    ["rounded"],
                    ["px-2", "py-0.5"]
                  )}
                >
                  {semitagging.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
