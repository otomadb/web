"use client";
import clsx from "clsx";
import { Fragment, useCallback } from "react";
import { useEffectOnce } from "react-use";

import NicovideoRegistrationRequestAcceptingNotification from "~/app/[locale]/(application)/notifications/NicovideoRegistrationRequestAccepting";
import NicovideoRegistrationRequestRejectingNotification from "~/app/[locale]/(application)/notifications/NicovideoRegistrationRequestRejecting";
import { FragmentType, graphql, useFragment } from "~/gql";

export const NotificationsSegmentFragment = graphql(`
  fragment NotificationPage_NotificationsSegment on NotificationConnection {
    nodes {
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
    pageInfo {
      hasNextPage
      endCursor
    }
  }
`);
export default function NotificationsSegment({
  className,
  style,
  update,
  watched,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof NotificationsSegmentFragment>;
  update: undefined | ((more: string) => void);
  watched(ids: string[]): void;
}) {
  const { nodes, pageInfo } = useFragment(
    NotificationsSegmentFragment,
    props.fragment
  );

  useEffectOnce(() => {
    watched(nodes.map((e) => e.id));
  });

  const showmore = useCallback(() => {
    if (!update) return null;
    if (!pageInfo.hasNextPage || !pageInfo.endCursor) return null;

    update(pageInfo.endCursor);
  }, [pageInfo, update]);

  return (
    <div>
      <div
        style={style}
        className={clsx(className, "flex w-full flex-col gap-y-1")}
      >
        {nodes.map((node) => (
          <Fragment key={node.id}>
            {node.__typename ===
            "NicovideoRegistrationRequestAcceptingNotification" ? (
              <NicovideoRegistrationRequestAcceptingNotification
                fragment={node}
              />
            ) : node.__typename ===
              "NicovideoRegistrationRequestRejectingNotification" ? (
              <NicovideoRegistrationRequestRejectingNotification
                fragment={node}
              />
            ) : (
              <></>
            )}
          </Fragment>
        ))}
      </div>
      {!!showmore && (
        <button
          type="button"
          onClick={() => showmore()}
          className={clsx(
            "mt-2 w-full border border-obsidian-lighter p-2 text-center text-snow-primary"
          )}
        >
          もっと見る
        </button>
      )}
    </div>
  );
}
