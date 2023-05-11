import clsx from "clsx";

import { CommonVideoContainer } from "~/components/CommonVideoContainer";
import { graphql } from "~/gql";
import { getClient } from "~/gql/client";

export default async function RecentVideoListSC() {
  const result = await getClient().query({
    query: graphql(`
      query MyTopPage_RecentVideosSection_VideosList {
        findVideos(first: 18) {
          nodes {
            id
            ...CommonVideoContainer
          }
        }
      }
    `),
    context: {
      fetchOptions: { next: { revalidate: 0 } },
    },
  });

  const { findVideos } = result.data;

  return (
    <div
      className={clsx(
        ["@container"],
        ["bg-slate-200"],
        ["w-full"],
        ["py-4"],
        ["flex", ["gap-x-4"]],
        [
          "overflow-x-scroll",
          "scroll-smooth",
          "snap-x",
          "snap-mandatory",
          "scroll-pl-4",
        ]
      )}
    >
      {findVideos.nodes.map((node) => (
        <div
          key={node.id}
          className={clsx(
            ["first:ml-4", "last:mr-4"],
            ["snap-start"],
            ["flex-shrink-0"],
            [
              "w-full",
              "@[512px]:w-1/2",
              "@[640px]:w-1/3",
              "@[768px]:w-1/4",
              "@[1024px]:w-1/6",
            ]
          )}
        >
          <CommonVideoContainer fragment={node} className={clsx(["h-full"])} />
        </div>
      ))}
    </div>
  );
}
