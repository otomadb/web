import clsx from "clsx";

import { CommonVideoContainer } from "~/components/CommonVideoContainer";
import { graphql } from "~/gql";
import { fetchGql3 } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

export default async function RecentVideoListSC() {
  const result = await fetchGql3(
    graphql(`
      query AboutPage_RecentVideosSection_VideosList {
        findVideos(first: 6) {
          nodes {
            id
            ...CommonVideoContainer
          }
        }
      }
    `),
    {}
  );

  if (isErr(result)) throw new Error("Failed to fetch recent videos");

  const { findVideos } = result.data;

  return (
    <div className={clsx(["@container"])}>
      <div
        className={clsx(
          ["w-full"],
          [
            "grid",
            [
              "grid-cols-1",
              "@[512px]:grid-cols-2",
              "@[768px]:grid-cols-3",
              "@[1024px]:grid-cols-6",
            ],
            ["gap-x-2"],
          ]
        )}
      >
        {findVideos.nodes.map((node) => (
          <div key={node.id} className={clsx()}>
            <CommonVideoContainer
              fragment={node}
              className={clsx(["h-full"])}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
