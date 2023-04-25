"use client";

import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { VideoThumbnail } from "~/components/VideoThumbnail";
import { graphql } from "~/gql";

import { LinkVideo } from "../videos/[serial]/Link";

export default function RecentLikes({ className }: { className?: string }) {
  const [{ data, fetching }] = useQuery({
    query: graphql(`
      query MyTopPage_RecentLikes {
        whoami {
          id
          likes {
            registrations(first: 5) {
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
    <div className={clsx(className, ["flex", "flex-col", "items-stretch"])}>
      {!data?.whoami && fetching && <p>いいね欄を取得中です</p>}
      <div className={clsx(["flex", "flex-col", "gap-y-2"])}>
        {data?.whoami.likes?.registrations.nodes.map((like) => (
          <div key={like.id} className={clsx(["flex", "gap-x-2"])}>
            <LinkVideo fragment={like.video}>
              <VideoThumbnail
                className={clsx(["flex-shrink-0"], ["w-[96px]", "h-[64px]"])}
                width={96}
                height={64}
                fragment={like.video}
              />
            </LinkVideo>
            <div className={clsx(["flex-grow"], ["py-1"])}>
              <LinkVideo fragment={like.video} className={clsx(["text-sm"])}>
                {like.video.title}
              </LinkVideo>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
