import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";

import CommonTagLink from "~/components/CommonTagLink";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import { MadPageLink } from "./Link";

const SimilarVideosQuery = graphql(`
  query VideoPage_SimilarVideosSection($id: ID!) {
    getVideo(id: $id) {
      similarVideos(input: { limit: 12 }) {
        items {
          to {
            ...Link_Video
            ...VideoThumbnail
            id
            title
            taggings(first: 3) {
              nodes {
                id
                tag {
                  ...CommonTagLink
                }
              }
            }
          }
        }
      }
    }
  }
`);

export function SimilarVideosPresentation({
  className,
  data,
}: {
  className?: string;
  data: ResultOf<typeof SimilarVideosQuery>;
}) {
  const { similarVideos } = data.getVideo;
  return (
    <div className={clsx(className, "@container")}>
      {similarVideos.items.length === 0 && (
        <p className={clsx("text-sm text-snow-darkest")}>
          似ている動画を見つけられませんでした。
        </p>
      )}
      <div
        className={clsx(
          "grid w-full grid-cols-1 gap-x-2 gap-y-4 @[384px]:grid-cols-2 @[512px]:grid-cols-3 @[768px]:grid-cols-4 @[768px]:gap-x-4 @[1024px]:grid-cols-6 @[1536px]:grid-cols-8"
        )}
      >
        {similarVideos.items.map((item) => (
          <div
            key={item.to.id}
            className={clsx(
              "shrink-0 overflow-hidden rounded border border-obsidian-lighter bg-obsidian-primary"
            )}
          >
            <MadPageLink fragment={item.to} className={clsx(["block"])}>
              <VideoThumbnail
                fragment={item.to}
                className={clsx("h-32 w-full")}
                imageSize="medium"
              />
            </MadPageLink>
            <div className={clsx("flex flex-col gap-y-2 p-2")}>
              <MadPageLink
                fragment={item.to}
                className={clsx(
                  "line-clamp-1 text-xs font-bold text-snow-primary hover:text-vivid-primary hover:underline"
                )}
              >
                {item.to.title}
              </MadPageLink>
              <div className={clsx([])}>
                {item.to.taggings.nodes.length === 0 && (
                  <div className={clsx("text-xxs text-slate-500")}>
                    タグ付けがありません
                  </div>
                )}
                <div className={clsx("flex flex-wrap gap-0.5")}>
                  {item.to.taggings.nodes.map((tagging) => (
                    <CommonTagLink
                      key={tagging.id}
                      fragment={tagging.tag}
                      size="xs"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function SimilarVideos({
  videoId,
  ...props
}: {
  className?: string;
  videoId: string;
}) {
  return (
    <SimilarVideosPresentation
      {...props}
      data={await makeGraphQLClient({}).request(SimilarVideosQuery, {
        id: videoId,
      })}
    />
  );
}
