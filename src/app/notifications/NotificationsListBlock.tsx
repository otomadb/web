"use client";

import clsx from "clsx";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "urql";

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
          watched
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

export const Mutation = graphql(`
  mutation NotificationsPage_NotificationsListBlock_Watch(
    $notificationIds: [ID!]!
  ) {
    watchNotifications(input: { notificationIds: $notificationIds }) {
      __typename
      ... on WatchNotificationsSucceededPayload {
        notifications {
          id
          watched
        }
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
  const [, watch] = useMutation(Mutation);

  useEffect(
    () => {
      if (!data) return;

      const watched = data.notifications.edges
        .filter(({ node: { watched } }) => !watched)
        .map(({ node: { id } }) => id);
      if (0 < watched.length) watch({ notificationIds: watched });

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
