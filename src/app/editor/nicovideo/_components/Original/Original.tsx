"use client";
import "client-only";

import clsx from "clsx";
import Image from "next/image";
import React, { useContext, useEffect } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

import { RegisterContext } from "../Context";
import ToggleTagButton from "../ToggleTagButton";

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
            ...RegisterNicovideoPage_RequestFormPart_ToggleTagButton
          }
        }
      }
    }
  }
`);
export const Original: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  const { setTitle, setThumbnailUrl, setSourceId } =
    useContext(RegisterContext);

  useEffect(
    () => {
      setTitle(fragment.title);
      setThumbnailUrl(fragment.thumbnailUrl);
      setSourceId(fragment.sourceId);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fragment]
  );

  return (
    <div className={clsx(className, ["flex", "gap-x-4"])}>
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
            <div
              key={tag.name}
              className={clsx(["flex", "flex-col", "gap-y-1"])}
            >
              <div className={clsx(["text-sm"])}>{tag.name}</div>
              {tag.searchTags.items.length === 0 && (
                <div className={clsx(["text-xs", "select-none"])}>候補なし</div>
              )}
              <div
                className={clsx([
                  "flex",
                  "flex-col",
                  "items-start",
                  "gap-y-0.5",
                ])}
              >
                {tag.searchTags.items.map((item, i) => (
                  <ToggleTagButton key={i} fragment={item.tag} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
