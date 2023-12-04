"use client";

import clsx from "clsx";
import { useQuery } from "urql";

import CommonMadBlock from "~/components/CommonMadBlock";
import { graphql } from "~/gql";

import MyLikesPageLink from "../me/likes/Link";

export default function RecentLikes({ className }: { className?: string }) {
  const [{ data, fetching }] = useQuery({
    query: graphql(`
      query MyTopPage_RecentLikes {
        whoami {
          id
          likes {
            registrations(first: 8) {
              nodes {
                id
                video {
                  id
                  ...CommonMadBlock
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
      <div className={clsx("mt-2 flex flex-col items-stretch")}>
        {fetching && (
          <div className={clsx("px-4 py-2 text-center text-snow-darker")}>
            いいね欄を取得中です
          </div>
        )}
        {data?.whoami.likes && (
          <div
            className={clsx(
              "grid grid-cols-2 gap-2 @[512px]/likes:flex @[512px]/likes:overflow-x-scroll @[512px]/likes:pb-4"
            )}
          >
            {data.whoami.likes.registrations.nodes.map((node) => (
              <div key={node.id} className={clsx("shrink-0")}>
                <CommonMadBlock
                  size="small"
                  fragment={node.video}
                  classNames={clsx("h-full @[512px]/likes:w-48")}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
