"use client";
import "client-only";

import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { CommonTag } from "~/components/CommonTag";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment RegisterNicovideoPage_OriginalSource on NicovideoOriginalSource {
    sourceId
    title
    thumbnailUrl
    tags {
      name
      searchTags(input: { limit: 3 }) {
        items {
          tag {
            id
            ...CommonTag
          }
        }
      }
    }
  }
`);
export const OriginalSource: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
  toggleTag: (id: string) => void;
}> = ({ className, toggleTag, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
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
        <div className={clsx(["flex", "flex-col", "gap-y-1"])}>
          <div className={clsx(["text-xs"])}>サムネイル</div>
          <div className={clsx()}>
            <Image
              className={clsx(["object-scale-down"], ["w-48"])}
              src={fragment.thumbnailUrl}
              width={260}
              height={200}
              alt={`${fragment.sourceId}のサムネイル`}
            />
          </div>
        </div>
      </div>
      <div className={clsx(["flex-grow"], ["flex", "flex-col"])}>
        <div className={clsx(["text-xs"])}>タグ</div>
        <div
          className={clsx(
            ["mt-1"],
            ["grid", ["grid-cols-3"], ["gap-x-2"], ["gap-y-2"]]
          )}
        >
          {fragment.tags.map((tag) => (
            <div key={tag.name}>
              <div className={clsx(["text-sm"])}>{tag.name}</div>
              <div className={clsx(["mt-1"])}>
                {tag.searchTags.items.length === 0 && (
                  <div>
                    <div className={clsx(["text-xs", "select-none"])}>
                      候補なし
                    </div>
                  </div>
                )}
                <div
                  className={clsx([
                    "flex",
                    "flex-col",
                    "items-stretch",
                    "gap-y-1",
                  ])}
                >
                  {tag.searchTags.items.map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        toggleTag(item.tag.id);
                      }}
                      className={clsx(["flex"])}
                    >
                      <CommonTag
                        fragment={item.tag}
                        className={clsx(["text-xs"], ["px-1"], ["py-0.5"])}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
