import "server-only";

import clsx from "clsx";

import { CommonVideoContainer } from "~/components/CommonVideoContainer";
import { FragmentType, graphql, useFragment } from "~/gql";
import { fetchGql } from "~/gql/fetch";

export const Fragment = graphql(`
  fragment HomePage_RecentVideosSection_VideosList_Presentation on Query {
    findVideos(first: 18) {
      nodes {
        id
        ...CommonVideoContainer
      }
    }
  }
`);
export const Presentation: React.FC<{
  fragment: FragmentType<typeof Fragment>;
}> = ({ ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

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
      {fragment.findVideos.nodes.map((node) => (
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
};

export async function RecentVideosList() {
  const data = await fetchGql(
    graphql(`
      query HomePage_RecentVideosSection_VideosList {
        ...HomePage_RecentVideosSection_VideosList_Presentation
      }
    `),
    {},
    { next: { revalidate: 0 } }
  );

  return <Presentation fragment={data} />;
}
