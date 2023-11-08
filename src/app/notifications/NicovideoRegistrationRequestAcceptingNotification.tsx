"use client";

import clsx from "clsx";

import { LinkVideo } from "~/app/mads/[serial]/Link";
import { DateTime } from "~/components/DateTime";
import Pictogram from "~/components/Pictogram";
import { UserIcon } from "~/components/UserIcon";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

import { LinkNicovideoRegistrationRequest } from "../requests/nicovideo/[sourceId]/Link";
import { LinkUser } from "../users/[name]/Link";

export const Fragment = graphql(`
  fragment NotificationsPage_NicovideoRegistrationRequestAcceptingNotification on NicovideoRegistrationRequestAcceptingNotification {
    watched
    createdAt
    accepting {
      acceptedBy {
        ...Link_User
        ...UserIcon
        id
      }
      request {
        ...Link_NicovideoRegistrationRequest
        id
        sourceId
        title
      }
      video {
        ...Link_Video
        ...VideoThumbnail
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
  fragment: FragmentType<typeof Fragment>;
}) {
  const {
    createdAt,
    accepting: { acceptedBy, request, video },
  } = useFragment(Fragment, props.fragment);

  return (
    <div className={clsx(className, "@container")} style={style}>
      <div
        className={clsx([
          "flex w-full items-center gap-x-2 border px-4 py-2 @[768px]:gap-x-4",
        ])}
      >
        <div className={clsx("flex grow items-center gap-x-1")}>
          <Pictogram icon="accept" className={clsx("h-4 w-4 text-teal-500")} />
          <p className={clsx("text-sm text-slate-900")}>
            あなたの動画登録リクエスト
            <LinkNicovideoRegistrationRequest fragment={request}>
              <span className={clsx("font-bold")}>{request.title}</span>
              <span className={clsx()}>({request.sourceId})</span>
            </LinkNicovideoRegistrationRequest>
            は
            <LinkVideo
              fragment={video}
              className={clsx("font-mono font-bold text-blue-500")}
            >
              受理されました。
            </LinkVideo>
          </p>
        </div>
        <div className={clsx("flex shrink-0 items-center")}>
          <LinkVideo fragment={video}>
            <VideoThumbnail
              fragment={video}
              className={clsx("h-[48px] w-[72px]")}
              imageSize="small"
            />
          </LinkVideo>
        </div>
        <div className={clsx("flex shrink-0 items-center")}>
          <LinkUser fragment={acceptedBy}>
            <UserIcon fragment={acceptedBy} size={32} />
          </LinkUser>
        </div>
        <div className={clsx("flex shrink-0 items-center")}>
          <p className={clsx("text-xs text-slate-600")}>
            <DateTime date={createdAt} />
          </p>
        </div>
      </div>
    </div>
  );
}
