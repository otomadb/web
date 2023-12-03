"use client";

import clsx from "clsx";

import Pictogram from "~/components/Pictogram";
import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

import { NicovideoRegistrationRequestLink } from "../../requests/nicovideo/[sourceId]/Link";
import UserPageLink from "../../users/[name]/Link";
import NotificationWrapper from "./NotificationWrapper";

export const NicovideoRegistrationRequestRejectingFragment = graphql(`
  fragment NotificationsPage_NicovideoRegistrationRequestRejectingNotification on NicovideoRegistrationRequestRejectingNotification {
    ...NotificationsPage_NotificationWrapper
    watched
    rejecting {
      rejectedBy {
        ...Link_User
        ...UserIcon
        id
        displayName
      }
      request {
        ...Link_NicovideoRegistrationRequest
        id
        sourceId
        title
      }
    }
  }
`);
export default function NicovideoRegistrationRequestRejectingNotification({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof NicovideoRegistrationRequestRejectingFragment>;
}) {
  const fragment = useFragment(
    NicovideoRegistrationRequestRejectingFragment,
    props.fragment
  );
  const {
    rejecting: { rejectedBy, request },
  } = fragment;

  return (
    <NotificationWrapper
      style={style}
      className={className}
      fragment={fragment}
      Icon={({ className, ...props }) => (
        <Pictogram
          {...props}
          icon="accept"
          className={clsx(className, "text-rose-500")}
        />
      )}
      Title={({ ...props }) => (
        <p {...props}>動画登録リクエストが拒否されました</p>
      )}
    >
      <div className={clsx("flex gap-x-4")}>
        <div
          className={clsx(
            "flex grow flex-col gap-y-2 rounded border border-obsidian-lighter bg-obsidian-darker p-4"
          )}
        >
          <div
            className={clsx(
              "flex items-center justify-between border-l border-obsidian-lighter px-2"
            )}
          >
            <NicovideoRegistrationRequestLink
              fragment={request}
              className={clsx(
                "text-xs text-snow-darker hover:text-vivid-primary hover:underline"
              )}
            >
              リクエスト
            </NicovideoRegistrationRequestLink>
          </div>
          <div
            className={clsx(
              "flex items-center justify-between border-l border-obsidian-lighter px-2"
            )}
          >
            <div className={clsx("text-xs text-snow-darker")}>
              拒否した編集者
            </div>
            <div className={clsx("flex items-center gap-x-2")}>
              <UserPageLink fragment={rejectedBy}>
                <UserIcon fragment={rejectedBy} size={24} />
              </UserPageLink>
              <UserPageLink
                fragment={rejectedBy}
                className={clsx(
                  "text-sm text-snow-primary hover:text-vivid-primary hover:underline"
                )}
              >
                {rejectedBy.displayName}
              </UserPageLink>
            </div>
          </div>
        </div>
      </div>
    </NotificationWrapper>
  );
}
