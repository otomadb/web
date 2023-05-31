"use client";
import "client-only";

import clsx from "clsx";
import React, { useEffect } from "react";

import { CoolImage } from "~/components/CoolImage";
import { FragmentType, graphql, useFragment } from "~/gql";

import {
  useSetSourceId,
  useSetThumbnailUrl,
  useSetTitle,
  useToggleSemitag,
} from "./RegisterContext";
import { TagButton } from "./TagButton";

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
            ...RegisterNicovideoPage_TagButton
            id
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
  const setTitle = useSetTitle();
  const setThumbnailUrl = useSetThumbnailUrl();
  const setSourceId = useSetSourceId();
  const toggleSemitag = useToggleSemitag();

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
      <div className={clsx(["flex-shrink-0"], ["flex", "flex-col", "gap-y-4"])}>
        <CoolImage
          className={clsx(["w-48"], ["h-36"])}
          src={fragment.thumbnailUrl}
          width={192}
          height={144}
          alt={`${fragment.sourceId}のサムネイル`}
          unoptimized={true}
        />
      </div>
      <div className={clsx(["flex-grow"], ["flex", "flex-col"], ["gap-y-4"])}>
        <div className={clsx(["text-sm", "font-bold"])}>{fragment.title}</div>
        <div
          className={clsx(["grid", "grid-cols-1", ["gap-x-1"], ["gap-y-1"]])}
        >
          {fragment.tags.map((tag) => (
            <div
              key={tag.name}
              className={clsx(
                ["flex", "flex-wrap", "items-center"],
                ["gap-x-2", "gap-y-1"]
              )}
            >
              <div className={clsx(["flex-shrink-0"], ["flex"])}>
                <button
                  type="button"
                  className={clsx([
                    "text-xs",
                    "text-left",
                    "text-slate-700",
                    "font-bold",
                  ])}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSemitag(tag.name);
                  }}
                >
                  {tag.name}
                </button>
              </div>
              <div className={clsx(["flex-grow"])}>
                {tag.searchTags.items.length === 0 && (
                  <div
                    className={clsx([
                      "text-xs",
                      "select-none",
                      "text-slate-500",
                    ])}
                  >
                    候補なし
                  </div>
                )}
                <div
                  className={clsx([
                    "flex",
                    "flex-wrap",
                    "items-start",
                    "gap-x-1",
                    "gap-y-0.5",
                  ])}
                >
                  {tag.searchTags.items.map((item) => (
                    <TagButton key={item.tag.id} tagId={item.tag.id} />
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
