import "server-only";

import clsx from "clsx";

import { LinkTag } from "~/app/tags/[serial]/Link";
import { LinkVideo } from "~/app/videos/[serial]/Link";
import { CommonTag } from "~/components/common/Tag";
import { VideoThumbnail } from "~/components/common/VideoThumbnail";
import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

export async function RecentVideosList() {
  const { findVideos } = await fetchGql(
    graphql(`
      query TopPage_RecentRegisteredVideos {
        findVideos(first: 8) {
          nodes {
            id
            title
            ...VideoThumbnail
            ...Link_Video
            taggings(first: 3) {
              nodes {
                id
                tag {
                  ...Link_Tag
                  ...CommonTag
                }
              }
            }
          }
        }
      }
    `),
    {},
    { next: { revalidate: 0 } }
  );

  return (
    <div className={clsx(["flex", "flex-col"], ["gap-y-2"])}>
      {findVideos.nodes.map((node) => (
        <div
          key={node.id}
          className={clsx(
            ["flex", "gap-x-4"],
            [["px-2"], ["py-1"]],
            ["rounded"],
            ["border", "border-slate-300"]
          )}
        >
          <div>
            <LinkVideo fragment={node}>
              <VideoThumbnail
                className={clsx(["w-32"], ["h-16"])}
                fragment={node}
              />
            </LinkVideo>
          </div>
          <div
            className={clsx(
              ["flex-grow"],
              ["py-1"],
              ["flex", "flex-col", "gap-y-1"]
            )}
          >
            <div className={clsx(["flex", "flex-shrink-0"])}>
              <LinkVideo
                key={node.id}
                className={clsx(["text-xs"])}
                fragment={node}
              >
                {node.title}
              </LinkVideo>
            </div>
            <div className={clsx(["flex-grow"])}>
              {node.taggings.nodes.length === 0 && (
                <p className={clsx(["text-xs", "text-slate-400"])}>
                  タグ付けがありません。
                </p>
              )}
              <div className={clsx(["flex", "flex-wrap", "gap-x-1"])}>
                {node.taggings.nodes.map((tagging) => (
                  <div key={tagging.id} className={clsx()}>
                    <LinkTag fragment={tagging.tag}>
                      <CommonTag
                        className={clsx(["text-xs"], ["px-1"], ["py-0.5"])}
                        fragment={tagging.tag}
                      />
                    </LinkTag>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}