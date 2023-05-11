import clsx from "clsx";

import { CommonVideoContainer } from "~/components/CommonVideoContainer";
import { graphql } from "~/gql";
import { getClient } from "~/gql/client";

export default async function RecentVideoListSC() {
  const { data } = await getClient().query({
    query: graphql(`
      query AboutPage_RecentVideosSection_VideosList {
        findVideos(first: 6) {
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
        {data.findVideos.nodes.map((node) => (
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
