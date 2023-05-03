import clsx from "clsx";
import { GraphQLClient } from "graphql-request";
import { cache } from "react";

import { CommonVideoContainer } from "~/components/CommonVideoContainer";
import { graphql } from "~/gql";

export const getVideos = cache(async () => {
  const result = await new GraphQLClient(process.env.GRAPHQL_API_ENDPOINT, {
    next: {
      revalidate: 120,
    },
  }).request(
    graphql(`
      query AboutPage_RecentVideosSection_VideosList {
        findVideos(first: 6) {
          nodes {
            id
            ...CommonVideoContainer
          }
        }
      }
    `)
  );
  return result.findVideos.nodes;
});

export default async function RecentVideoListSC() {
  const nodes = await getVideos();

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
        {nodes.map((node) => (
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
