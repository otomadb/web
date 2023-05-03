import clsx from "clsx";
import { GraphQLClient } from "graphql-request";

import { CommonVideoContainer } from "~/components/CommonVideoContainer";
import { graphql } from "~/gql";

export default async function RecentVideoListSC() {
  const result = await new GraphQLClient(process.env.GRAPHQL_API_ENDPOINT, {
    next: {
      revalidate: 60,
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

  const { findVideos } = result;

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
