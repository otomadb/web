"use client";

import clsx from "clsx";
import React, { useEffect } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";

import NicovideoRegistrationRequestAcceptingNotification from "./NicovideoRegistrationRequestAcceptingNotification";
import NicovideoRegistrationRequestRejectingNotification from "./NicovideoRegistrationRequestRejectingNotification";

export const Query = graphql(`
  query NotificationsPage_NotificationsListBlock($after: String) {
    notifications(first: 20, after: $after) {
      edges {
        cursor
        node {
          __typename
          id
          ... on NicovideoRegistrationRequestAcceptingNotification {
            ...NotificationsPage_NicovideoRegistrationRequestAcceptingNotification
          }
          ... on NicovideoRegistrationRequestRejectingNotification {
            ...NotificationsPage_NicovideoRegistrationRequestRejectingNotification
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);
export default function NotificationsListBlock({
  className,
  style,
  after,
  pushCursor,
}: {
  className?: string;
  style?: React.CSSProperties;
  after: string | null;
  pushCursor: (cursor: string) => void;
}) {
  const [{ data, fetching }] = useQuery({
    query: Query,
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
    <div style={style} className={clsx(className)}>
      {fetching && <div>Loading...</div>}
      <ul className={clsx(["w-full"], ["flex", "flex-col", "gap-y-1"])}>
        {data?.notifications.edges.map(({ cursor, node }) => (
          <li key={cursor}>
            {node.__typename ===
              "NicovideoRegistrationRequestAcceptingNotification" && (
              <NicovideoRegistrationRequestAcceptingNotification
                fragment={node}
              />
            )}
            {node.__typename ===
              "NicovideoRegistrationRequestRejectingNotification" && (
              <NicovideoRegistrationRequestRejectingNotification
                fragment={node}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
