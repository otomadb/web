import clsx from "clsx";
import { Suspense } from "react";

import YoutubeRequestLink from "~/app/requests/youtube/[sourceId]/Link";
import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

import ListItem from "./RequestsListItem2";

const Inner = async () => {
  const result = await fetchGql(
    graphql(`
      query MyTopPage_YoutubeRequestsList {
        findUncheckedYoutubeRegistrationRequests(input: { first: 18 }) {
          nodes {
            id
            sourceId
            ...MyTopPage_RequestsListItem
          }
        }
      }
    `),
    {}
  );

  if (isErr(result)) throw new Error("Failed to fetch recent requests");

  const { findUncheckedYoutubeRegistrationRequests } = result.data;

  return (
    <div
      className={clsx(
        ["@container"],
        ["bg-slate-950"],
        ["border", "border-slate-800"],
        ["py-4"],
        ["flex", "gap-x-2"],
        [
          "overflow-x-scroll",
          "scroll-smooth",
          "snap-x",
          "snap-mandatory",
          "scroll-pl-4",
        ]
      )}
    >
      {findUncheckedYoutubeRegistrationRequests.nodes.map((node) => (
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
            PageLink={({ children, ...props }) => (
              <YoutubeRequestLink sourceId={node.sourceId} {...props}>
                {children}
              </YoutubeRequestLink>
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default async function YoutubeRequestsList({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={clsx(className)} style={style}>
      <Suspense fallback={<span>リクエストを取得中です</span>}>
        <Inner />
      </Suspense>
    </div>
  );
}
