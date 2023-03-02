import "server-only";

import clsx from "clsx";

import { LinkTag } from "~/app/tags/[serial]/Link";
import { LinkVideo } from "~/app/videos/[serial]/Link";
import { CommonTag } from "~/components/common/Tag";
import { VideoThumbnail } from "~/components/common/Thumbnail";
import { getFragment, graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { CommonTagFragmentDoc, VideoThumbnailFragmentDoc } from "~/gql/graphql";

export async function RecentVideosList() {
  const { findVideos } = await fetchGql(
    graphql(`
      query TopPage_RecentRegisteredVideos {
        findVideos(input: { limit: 8, order: { createdAt: DESC } }) {
          nodes {
            id
            title
            ...VideoThumbnail
            ...Link_Video
            taggings(input: { limit: 5 }) {
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
                fragment={getFragment(VideoThumbnailFragmentDoc, node)}
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
                        fragment={getFragment(
                          CommonTagFragmentDoc,
                          tagging.tag
                        )}
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
