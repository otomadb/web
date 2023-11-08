import clsx from "clsx";
import { cache } from "react";

import { LinkVideo } from "~/app/mads/[serial]/Link";
import { LinkTag } from "~/app/tags/[serial]/Link";
import { CommonTag2 } from "~/components/CommonTag";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

export const getMADs = cache(async () => {
  const result = await makeGraphQLClient({ next: { revalidate: 120 } }).request(
    graphql(`
      query AboutPage_RecentVideosSection_VideosList {
        findVideos(first: 12) {
          nodes {
            id
            title
            ...Link_Video
            ...VideoThumbnail
            taggings(first: 3) {
              nodes {
                id
                tag {
                  ...CommonTag
                  ...Link_Tag
                }
              }
            }
          }
        }
      }
    `)
  );
  return result.findVideos.nodes;
});

export default async function RecentVideoListSC({
  className,
}: {
  className?: string;
}) {
  const nodes = await getMADs();

  return (
    <div
      className={clsx(
        className,
        ["flex", "items-stretch"],
        ["overflow-scroll"],
        "grid",
        "grid-cols-2",
        "sm:grid-cols-3",
        "md:grid-cols-4",
        "lg:grid-cols-6",
        "gap-x-1",
        "gap-y-1",
        "max-w-screen-2xl",
        "px-2",
        "md:px-4",
        "mx-auto"
      )}
    >
      {nodes.map((node) => (
        <div
          key={node.id}
          className={clsx(
            ["flex-shrink-0"],
            ["bg-background-primary"],
            ["border", "border-background-shallower"],
            ["overflow-hidden", "rounded-sm"]
          )}
        >
          <LinkVideo className={clsx(["flex"])} fragment={node}>
            <VideoThumbnail
              fragment={node}
              className={clsx(["w-full"], ["h-32"])}
              imageSize="large"
            />
          </LinkVideo>
          <div
            className={clsx(["px-2", "py-2"], ["flex", "flex-col", "gap-y-2"])}
          >
            <LinkVideo
              fragment={node}
              className={clsx(
                ["text-xs"],
                ["font-bold"],
                [
                  "text-text-primary",
                  "hover:text-accent-primary",
                  "hover:underline",
                ],
                ["line-clamp-1"]
              )}
            >
              {node.title}
            </LinkVideo>
            <div className={clsx([])}>
              {node.taggings.nodes.length === 0 && (
                <div className={clsx(["text-xxs"], ["text-slate-500"])}>
                  タグ付けがありません
                </div>
              )}
              <div
                className={clsx(
                  ["flex"],
                  ["flex-wrap"],
                  ["gap-x-0.5"],
                  ["gap-y-0.5"]
                )}
              >
                {node.taggings.nodes.map((tagging) => (
                  <LinkTag
                    key={tagging.id}
                    fragment={tagging.tag}
                    className={clsx(["flex"])}
                  >
                    <CommonTag2
                      size="xs"
                      fragment={tagging.tag}
                      className={clsx(["text-xxs"], ["px-1"], ["py-0.5"])}
                    />
                  </LinkTag>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
