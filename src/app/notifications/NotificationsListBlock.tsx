"use client";

import clsx from "clsx";
import React, { useEffect } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";

import NicovideoRegistrationRequestAcceptingNotification from "./NicovideoRegistrationRequestAcceptingNotification";

export default function NotificationsListBlock({
  after,
  pushCursor,
}: {
  after: string | null;
  pushCursor: (cursor: string) => void;
}) {
  const [{ data, fetching }] = useQuery({
    query: graphql(`
      query NotificationsPage_NotificationsListBlock($after: String) {
        notifications(first: 20, after: $after) {
          edges {
            cursor
            node {
              __typename
              id
              ...NotificationsPage_NicovideoRegistrationRequestAcceptingNotification
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `),
    variables: { after },
  });

  useEffect(
    () => {
      if (!data) return;
      if (
        data.notifications.pageInfo.hasNextPage &&
        data.notifications.pageInfo.endCursor
      )
        pushCursor(data.notifications.pageInfo.endCursor);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  return (
    <div>
      {fetching && <div>Loading...</div>}
      <ul className={clsx(["w-full"], ["flex", "flex-col"])}>
        {data?.notifications.edges.map(({ cursor, node }) => (
          <li key={cursor}>
            {node.__typename ===
              "NicovideoRegistrationRequestAcceptingNotification" && (
              <NicovideoRegistrationRequestAcceptingNotification
                fragment={node}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
