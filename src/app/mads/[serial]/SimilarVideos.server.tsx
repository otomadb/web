import "server-only";

import { useSuspenseQuery_experimental } from "@apollo/client";
import clsx from "clsx";

import { graphql } from "~/gql";

import { SimilarVideo } from "./SimilarVideo";

export function SimilarVideos({ videoId }: { videoId: string }) {
  const result = useSuspenseQuery_experimental(
    graphql(`
      query VideoPage_SimilarVideosSection($id: ID!) {
        getVideo(id: $id) {
          id
          similarVideos(input: { limit: 12 }) {
            items {
              ...VideoPage_SimilarVideos_Video
            }
          }
        }
      }
    `),
    { variables: { id: videoId } }
  );

  const { getVideo } = result.data;

  return (
    <div className={clsx(["@container"])}>
      {getVideo.similarVideos.items.length === 0 && (
        <span>動画が存在しません。</span>
      )}
      <div
        className={clsx(
          ["w-full"],
          [
            "grid",
            [
              "grid-cols-1",
              "@[384px]:grid-cols-2",
              "@[512px]:grid-cols-3",
              "@[768px]:grid-cols-4",
              "@[1024px]:grid-cols-6",
              "@[1536px]:grid-cols-8",
            ],
          ],
          ["gap-x-2", "@[768px]:gap-x-4"],
          ["gap-y-2", "@[768px]:gap-x-4"]
        )}
      >
        {getVideo.similarVideos.items.map((item, i) => (
          <SimilarVideo key={i} fragment={item} />
        ))}
      </div>
    </div>
  );
}
