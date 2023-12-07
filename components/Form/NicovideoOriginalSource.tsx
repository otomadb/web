"use client";

import clsx from "clsx";

import { CoolImage } from "~/components/CoolImage";
import { ExternalLinkPictogram } from "~/components/Pictogram";
import { FragmentType, graphql, useFragment } from "~/gql";

import { Fragment as TagButtonFragment, TagButton } from "./TagButton";

export const NicovideoOriginalSourceFragment = graphql(`
  fragment RegisterFromNicovideoForm_OriginalSource on NicovideoOriginalSource {
    sourceId
    url
    info {
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
  }
`);
export default function NicovideoOriginalSource({
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
  fragment: FragmentType<typeof NicovideoOriginalSourceFragment>;

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
  const fragment = useFragment(NicovideoOriginalSourceFragment, props.fragment);

  return (
    <div className={clsx(className, ["flex", "flex-col", "gap-y-2"])}>
      <div className={clsx(["flex gap-x-4"])}>
        <div className={clsx(["flex shrink-0", "flex-col", "gap-y-4"])}>
          <CoolImage
            className={clsx(["h-[64px] w-[96px]"])}
            src={fragment.info.thumbnailUrl}
            width={96}
            height={64}
            alt={`${fragment.sourceId}のサムネイル`}
            unoptimized={true}
          />
        </div>
        <div className={clsx(["flex grow py-2", "flex-col"])}>
          <div className={clsx(["text-sm text-slate-300", "font-bold"])}>
            {fragment.info.title}
          </div>
          <div className={clsx(["mt-auto flex", "gap-x-2"])}>
            <a
              href={fragment.url}
              target="_blank"
              className={clsx([
                "flex items-center gap-x-1 text-slate-400 hover:text-sky-400",
              ])}
            >
              <ExternalLinkPictogram className={clsx(["w-4", "h-4"])} />
              <span className={clsx(["text-sm", "font-mono"])}>
                {fragment.sourceId}
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className={clsx(["grid", "grid-cols-2", "gap-x-2", "gap-y-2"])}>
        {fragment.info.tags.map((originalTag) => (
          <div
            key={originalTag.name}
            className={clsx(["flex", "flex-col", "items-start gap-y-1"])}
          >
            <div
              role="button"
              className={clsx(["text-left text-xs font-bold text-slate-400"])}
              onClick={(e) => {
                e.preventDefault();
                if (selectingSemitagNames.includes(originalTag.name))
                  removeSemitag(originalTag.name);
                else appendSemitag(originalTag.name);
              }}
            >
              {originalTag.name}
            </div>
            <div className={clsx(["grow"])}>
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
                    "flex flex-wrap items-start gap-x-1 gap-y-0.5",
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
