"use client";

import clsx from "clsx";

import { CoolImage } from "~/components/CoolImage";
import { ExternalLinkPictogram } from "~/components/Pictogram";
import { FragmentType, graphql, useFragment } from "~/gql";

import { TagButton, TagButtonFragment } from "../../../CommonTag/Button";

export const BilibiliOriginalSourceFragment = graphql(`
  fragment BilibiliForm_OriginalSource on BilibiliOriginalSource {
    sourceId
    title
    url
    thumbnailUrl(scale: LARGE)
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
export default function BilibiliOriginalSource({
  className,
  removeTag,
  appendTag,
  appendSemitag,
  removeSemitag,
  isSelectingSemitag,
  isSelectingTag,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof BilibiliOriginalSourceFragment>;

  isSelectingTag(tagId: string): boolean;
  appendTag(a: {
    tagId: string;
    fragment: FragmentType<typeof TagButtonFragment>;
  }): void;
  removeTag(tagId: string): void;

  isSelectingSemitag(name: string): boolean;
  appendSemitag(name: string): void;
  removeSemitag(name: string): void;
}) {
  const fragment = useFragment(BilibiliOriginalSourceFragment, props.fragment);

  return (
    <div className={clsx(className, "flex flex-col gap-y-2")}>
      <div className={clsx("flex gap-x-4")}>
        <div className={clsx("flex shrink-0 flex-col gap-y-4")}>
          <CoolImage
            className={clsx("h-[64px] w-[96px]")}
            src={fragment.thumbnailUrl}
            width={96}
            height={64}
            alt={`${fragment.sourceId}のサムネイル`}
            unoptimized={true}
          />
        </div>
        <div className={clsx("flex grow flex-col py-2")}>
          <div className={clsx("text-sm font-bold text-snow-primary")}>
            {fragment.title}
          </div>
          <div className={clsx("mt-auto flex gap-x-2")}>
            <a
              href={fragment.url}
              target="_blank"
              className={clsx(
                ["flex items-center gap-x-1"],
                ["text-snow-darker hover:text-vivid-primary"]
              )}
            >
              <ExternalLinkPictogram className={clsx("h-4 w-4")} />
              <span className={clsx("font-mono text-sm")}>
                {fragment.sourceId}
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className={clsx("grid grid-cols-2 gap-2")}>
        {fragment.tags.map((originalTag) => (
          <div
            key={originalTag.name}
            className={clsx("flex flex-col items-start gap-y-1")}
          >
            <div
              role="button"
              className={clsx(
                "text-xs",
                "text-left",
                "text-snow-darker",
                "font-bold"
              )}
              onClick={(e) => {
                e.preventDefault();
                if (isSelectingSemitag(originalTag.name))
                  removeSemitag(originalTag.name);
                else appendSemitag(originalTag.name);
              }}
            >
              {originalTag.name}
            </div>
            <div className={clsx("grow")}>
              {originalTag.searchTags.items.length === 0 && (
                <div className={clsx("select-none text-xs text-snow-darkest")}>
                  候補なし
                </div>
              )}
              {originalTag.searchTags.items.length >= 1 && (
                <div
                  className={clsx(
                    "flex flex-wrap items-start gap-x-1 gap-y-0.5"
                  )}
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
                      selected={isSelectingTag(item.tag.id)}
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
