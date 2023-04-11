import clsx from "clsx";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

import { ListItem } from "./RequestsListItem";

export default async function RequestsListSC() {
  const result = await fetchGql(
    graphql(`
      query MyTopPage_RecentNicovideoRequestsSection_RequestsList {
        findNicovideoRegistrationRequests(first: 18, checked: false) {
          nodes {
            id
            ...HomePage_RecentNicovideoRequestsSection_RequestsListItem
          }
        }
      }
    `),
    {}
  );

  if (isErr(result)) throw new Error("Failed to fetch recent requests");

  const { findNicovideoRegistrationRequests } = result.data;

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
      {findNicovideoRegistrationRequests.nodes.map((node) => (
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
}
