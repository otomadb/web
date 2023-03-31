import clsx from "clsx";
import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { ListItem } from "./RequestsListItem";

export const Fragment = graphql(`
  fragment HomePage_RecentNicovideoRequestsSection_RequestsList_Presentation on Query {
    findNicovideoRegistrationRequests(first: 18, checked: false) {
      nodes {
        id
        ...HomePage_RecentNicovideoRequestsSection_RequestsListItem
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
        ["flex", "gap-x-4"],
        [
          "overflow-x-scroll",
          "scroll-smooth",
          "snap-x",
          "snap-mandatory",
          "scroll-pl-4",
        ]
      )}
    >
      {fragment.findNicovideoRegistrationRequests.nodes.map((node) => (
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
          <ListItem
            key={node.id}
            fragment={node}
            className={clsx(["h-full"])}
          />
        </div>
      ))}
    </div>
  );
};

export default async function RequestsList() {
  const data = await fetchGql(
    graphql(`
      query HomePage_RecentNicovideoRequestsSection_RequestsList {
        ...HomePage_RecentNicovideoRequestsSection_RequestsList_Presentation
      }
    `),
    {},
    { next: { revalidate: 0 } }
  );

  if (!data) return null;
  return <Presentation fragment={data} />;
}
