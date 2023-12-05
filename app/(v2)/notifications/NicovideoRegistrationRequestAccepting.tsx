"use client";

import clsx from "clsx";

import { MadPageLink } from "~/app/(v2)/mads/[serial]/Link";
import { NicovideoRegistrationRequestLink } from "~/app/(v2)/requests/nicovideo/[sourceId]/Link";
import UserPageLink from "~/app/(v2)/users/[name]/Link";
import CommonMadBlock from "~/components/CommonMadBlock";
import Pictogram from "~/components/Pictogram";
import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

import NotificationWrapper from "./NotificationWrapper";

export const NicovideoRegistrationRequestAcceptingFragment = graphql(`
  fragment NotificationsPage_NicovideoRegistrationRequestAcceptingNotification on NicovideoRegistrationRequestAcceptingNotification {
    ...NotificationsPage_NotificationWrapper
    watched
    accepting {
      acceptedBy {
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
      video {
        ...Link_Video
        ...CommonMadBlock
        ...CommonMadBlock_LikeSwitch
        id
      }
    }
  }
`);
export default function NicovideoRegistrationRequestAcceptingNotification({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof NicovideoRegistrationRequestAcceptingFragment>;
}) {
  const fragment = useFragment(
    NicovideoRegistrationRequestAcceptingFragment,
    props.fragment
  );
  const {
    accepting: { acceptedBy, request, video },
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
          className={clsx(className, "text-teal-500")}
        />
      )}
      Title={({ ...props }) => (
        <p {...props}>
          動画登録リクエストが
          <MadPageLink
            fragment={video}
            className={clsx(
              "font-mono font-bold text-vivid-primary hover:underline"
            )}
          >
            受理されました。
          </MadPageLink>
        </p>
      )}
    >
      <div className={clsx("flex gap-x-4")}>
        <CommonMadBlock
          fragment={video}
          likeable={video}
          classNames={clsx("w-64 shrink-0")}
        />
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
              受理した編集者
            </div>
            <div className={clsx("flex items-center gap-x-2")}>
              <UserPageLink fragment={acceptedBy}>
                <UserIcon fragment={acceptedBy} size={24} />
              </UserPageLink>
              <UserPageLink
                fragment={acceptedBy}
                className={clsx(
                  "text-sm text-snow-primary hover:text-vivid-primary hover:underline"
                )}
              >
                {acceptedBy.displayName}
              </UserPageLink>
            </div>
          </div>
        </div>
      </div>
    </NotificationWrapper>
  );
}
