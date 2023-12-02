"use client";

import clsx from "clsx";
import { useQuery } from "urql";

import { VideoThumbnail } from "~/components/VideoThumbnail";
import { graphql } from "~/gql";

import { MadPageLink } from "../../mads/[serial]/Link";
import MyLikesPageLink from "./(user)/likes/Link";

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
      className={clsx(
        className,
        "rounded-lg border border-obsidian-primary bg-obsidian-darker p-4 @container/likes"
      )}
    >
      <div className={clsx("flex items-center px-4")}>
        <p className={clsx("grow text-base font-bold text-snow-primary")}>
          いいねした動画
        </p>
        <MyLikesPageLink
          className={clsx("text-xs text-snow-darker hover:underline")}
        >
          もっと見る
        </MyLikesPageLink>
      </div>
      <div className={clsx("mt-2 flex", "flex-col", "items-stretch")}>
        {fetching && (
          <div className={clsx("px-4 py-2 text-center text-snow-darker")}>
            いいね欄を取得中です
          </div>
        )}
        <div
          className={clsx(
            "grid grid-cols-1 gap-2 @w128/likes:grid-cols-3 @w240/likes:grid-cols-6"
          )}
        >
          {data?.whoami.likes?.registrations.nodes.map((like) => (
            <div
              key={like.id}
              className={clsx(
                "flex flex-row gap-x-4 rounded border border-obsidian-lighter bg-obsidian-primary px-4 py-2 @w128/likes:flex-col @w128/likes:px-2 @w128/likes:py-1"
              )}
            >
              <MadPageLink fragment={like.video}>
                <VideoThumbnail
                  className={clsx(
                    "h-16 w-24 @w128/likes:h-24 @w128/likes:w-full @w192/likes:h-28 @w240/likes:h-32"
                  )}
                  fragment={like.video}
                  imageSize="medium"
                />
              </MadPageLink>
              <div className={clsx("grow py-1 @w128/likes:mt-1")}>
                <MadPageLink
                  fragment={like.video}
                  className={clsx(
                    "line-clamp-1 text-sm font-bold text-vivid-primary @w128/likes:text-xs hover:underline"
                  )}
                >
                  {like.video.title}
                </MadPageLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
