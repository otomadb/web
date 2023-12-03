"use client";

import clsx from "clsx";
import { ComponentProps, useState } from "react";
import { useMutation, useQuery } from "urql";

import { FragmentType, graphql, useFragment } from "~/gql";

import NotificationsSegment from "./NotificationsSegment";

export const NotificationsSegmentWrapper = ({
  after,
  ...rest
}: {
  after: string;
} & Omit<ComponentProps<typeof NotificationsSegment>, "fragment">) => {
  const [{ data, fetching }] = useQuery({
    query: graphql(`
      query NotificationPage_NotificationsSegmentWrapper($after: String) {
        viewer {
          notifications(input: { first: 30, after: $after }) {
            ...NotificationPage_NotificationsSegment
          }
        }
      }
    `),
    variables: { after },
  });

  return (
    <div>
      {!data && fetching && <div>loading...</div>}
      {data?.viewer && (
        <NotificationsSegment fragment={data.viewer.notifications} {...rest} />
      )}
    </div>
  );
};

const SegmentsControllerFragment = graphql(`
  fragment NotificationPage_NotificationsSegmentsController on NotificationConnection {
    ...NotificationPage_NotificationsSegment
  }
`);
export default function NotificationsSegmentsController({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof SegmentsControllerFragment>;
}) {
  const fragment = useFragment(SegmentsControllerFragment, props.fragment);
  const [, watch] = useMutation(
    graphql(`
      mutation NotificationsPage_NotificationsSegmentsControllerWatch(
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
    `)
  );
  const [cursors, setCursors] = useState<string[]>([]);

  return (
    <div className={clsx(className)} style={style}>
      <NotificationsSegment
        fragment={fragment}
        update={
          cursors.length === 0
            ? (m) => setCursors((prev) => [...prev, m])
            : undefined
        }
        watched={(notificationIds) => watch({ notificationIds })}
      />
      {cursors.map((e, i, { length }) => (
        <NotificationsSegmentWrapper
          key={e}
          after={e}
          update={
            i === length - 1
              ? (m) => setCursors((prev) => [...prev, m])
              : undefined
          }
          watched={(ids) => {
            console.log(ids);
          }}
        />
      ))}
    </div>
  );
}
