"use client";

import clsx from "clsx";

import { FragmentType, graphql, useFragment } from "~/gql";

import { CoolImage } from "../CoolImage";
import { Fragment as TagButtonFragment, TagButton } from "./TagButton";

export const Fragment = graphql(`
  fragment RegisterFromNicovideoForm_OriginalSource on NicovideoOriginalSource {
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
export default function Source({
  className,
  selectingTagId,
  removeTag,
  appendTag,
  selectingSemitagNames,
  appendSemitag,
  removeSemitag,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;

  selectingTagId: string[];
  appendTag(a: {
    tagId: string;
    fragment: FragmentType<typeof TagButtonFragment>;
  }): void;
  removeTag(tagId: string): void;

  selectingSemitagNames: string[];
  appendSemitag(name: string): void;
  removeSemitag(name: string): void;
}) {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div className={clsx(className, ["flex", "flex-col", "gap-y-2"])}>
      <div className={clsx(["flex"])}>
        <div
          className={clsx(["flex-shrink-0"], ["flex", "flex-col", "gap-y-4"])}
        >
          <CoolImage
            className={clsx(["w-[96px]"], ["h-[64px]"])}
            src={fragment.thumbnailUrl}
            width={96}
            height={64}
            alt={`${fragment.sourceId}のサムネイル`}
            unoptimized={true}
          />
        </div>
        <div className={clsx(["flex-grow"], ["flex", "flex-col"], ["gap-y-4"])}>
          <div className={clsx(["text-sm", "font-bold"])}>{fragment.title}</div>
        </div>
      </div>
      <div className={clsx(["grid", "grid-cols-2", "gap-y-1"])}>
        {fragment.tags.map((originalTag) => (
          <div
            key={originalTag.name}
            className={clsx(
              ["flex", "flex-wrap", "items-center"],
              ["gap-x-2", "gap-y-2"]
            )}
          >
            <div
              role="button"
              className={clsx([
                "text-xs",
                "text-left",
                "text-slate-400",
                "font-bold",
              ])}
              onClick={(e) => {
                e.preventDefault();
                if (selectingSemitagNames.includes(originalTag.name))
                  removeSemitag(originalTag.name);
                else appendSemitag(originalTag.name);
              }}
            >
              {originalTag.name}
            </div>
            <div className={clsx(["flex-grow"])}>
              {originalTag.searchTags.items.length === 0 && (
                <div
                  className={clsx(["text-xs", "select-none", "text-slate-500"])}
                >
                  候補なし
                </div>
              )}
              {originalTag.searchTags.items.length >= 1 && (
                <div
                  className={clsx([
                    "flex",
                    "flex-wrap",
                    "items-start",
                    "gap-x-1",
                    "gap-y-0.5",
                  ])}
                >
                  {originalTag.searchTags.items.map((item) => (
                    <TagButton
                      key={item.tag.id}
                      fragment={item.tag}
                      tagId={item.tag.id}
                      append={(f) =>
                        appendTag({ tagId: item.tag.id, fragment: f })
                      }
                      remove={() => removeTag(item.tag.id)}
                      selected={selectingTagId.includes(item.tag.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
