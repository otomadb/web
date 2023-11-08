"use client";

import clsx from "clsx";
import { useQuery } from "urql";

import { LinkVideo } from "~/app/mads/[serial]/Link";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { graphql } from "~/gql";

import { YouLikesPageLink } from "./likes/Link";

export default function RecentLikes({ className }: { className?: string }) {
  const [{ data, fetching }] = useQuery({
    query: graphql(`
      query MyTopPage_RecentLikes {
        whoami {
          id
          likes {
            registrations(first: 6) {
              nodes {
                id
                video {
                  ...VideoThumbnail
                  ...Link_Video
                  id
                  title
                }
              }
            }
          }
        }
      }
    `),
  });

  return (
    <section
      className={clsx(className, ["bg-background-deeper p-4 @container/likes"])}
    >
      <div className={clsx("flex items-center px-4")}>
        <p className={clsx(["grow text-base  font-bold text-text-primary"])}>
          いいねした動画
        </p>
        <YouLikesPageLink className={clsx("text-xs text-text-muted")}>
          もっと見る
        </YouLikesPageLink>
      </div>
      <div className={clsx("mt-2 flex flex-col items-stretch")}>
        {fetching && (
          <div className={clsx(["px-4 py-2 text-center text-text-muted"])}>
            いいね欄を取得中です
          </div>
        )}
        <div
          className={clsx([
            "grid",
            "gap-x-2",
            "gap-y-2",
            ["grid-cols-1 @w128/likes:grid-cols-3 @w240/likes:grid-cols-6"],
          ])}
        >
          {data?.whoami.likes?.registrations.nodes.map((like) => (
            <div
              key={like.id}
              className={clsx(
                [
                  "flex flex-row gap-x-4 bg-background-primary @w128/likes:flex-col",
                ],
                [["px-4 py-2 @w128/likes:px-2 @w128/likes:py-1"]],
                ["rounded"]
              )}
            >
              <LinkVideo fragment={like.video}>
                <VideoThumbnail
                  className={clsx(
                    ["w-24 @w128/likes:w-full"],
                    [
                      "h-16",
                      "@w128/likes:h-24",
                      "@w192/likes:h-28",
                      "@w240/likes:h-32",
                    ]
                  )}
                  fragment={like.video}
                  imageSize="medium"
                />
              </LinkVideo>
              <div className={clsx("grow py-1 @w128/likes:mt-1")}>
                <LinkVideo
                  fragment={like.video}
                  className={clsx([
                    ["line-clamp-1 text-sm @w128/likes:text-xs"],
                    "font-bold text-accent-primary hover:underline",
                  ])}
                >
                  {like.video.title}
                </LinkVideo>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
