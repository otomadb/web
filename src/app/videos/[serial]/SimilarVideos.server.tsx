import "server-only";

import clsx from "clsx";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

import { SimilarVideo } from "./SimilarVideo";

export async function SimilarVideos({ videoId }: { videoId: string }) {
  const result = await fetchGql(
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
    { id: videoId },
    { next: { revalidate: 0 } }
  );

  if (isErr(result)) {
    throw new Error("Failed to fetch similar videos");
  }

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
