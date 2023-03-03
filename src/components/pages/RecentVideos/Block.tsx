import clsx from "clsx";
import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

import { Video } from "./Video";

const Fragment = graphql(`
  fragment InfiniteVideosGrid_Block on VideoConnection {
    nodes {
      id
      ...InfiniteVideosGrid_Video
    }
  }
`);
export const Block: React.FC<{
  fragment: FragmentType<typeof Fragment>;
}> = ({ fragment }) => {
  const { nodes } = useFragment(Fragment, fragment);
  return (
    <div className={clsx(["@container/row"])}>
      <div
        className={clsx([
          "grid",
          [
            "grid-cols-1",
            "@[384px]/row:grid-cols-2",
            "@[512px]/row:grid-cols-3",
            "@[768px]/row:grid-cols-4",
            "@[1024px]/row:grid-cols-6",
            "@[1536px]/row:grid-cols-8",
          ],
          ["gap-x-2"],
          ["gap-y-2"],
        ])}
      >
        {nodes.map((video) => (
          <Video fragment={video} key={video.id} />
        ))}
      </div>
    </div>
  );
};
