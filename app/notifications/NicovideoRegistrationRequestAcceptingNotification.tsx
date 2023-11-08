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
    <div className={clsx(className, ["@container"])} style={style}>
      <div
        className={clsx(
          ["w-full"],
          ["flex", ["gap-x-2", "@[768px]:gap-x-4"], "items-center"],
          ["px-4", "py-2"],
          ["border"]
        )}
      >
        <div className={clsx(["grow"], ["flex", "items-center", "gap-x-1"])}>
          <Pictogram
            icon="accept"
            className={clsx(["w-4", "h-4"], ["text-teal-500"])}
          />
          <p className={clsx(["text-sm", "text-slate-900"])}>
            あなたの動画登録リクエスト
            <LinkNicovideoRegistrationRequest fragment={request}>
              <span className={clsx(["font-bold"])}>{request.title}</span>
              <span className={clsx()}>({request.sourceId})</span>
            </LinkNicovideoRegistrationRequest>
            は
            <LinkVideo
              fragment={video}
              className={clsx(["font-bold", "text-blue-500", "font-mono"])}
            >
              受理されました。
            </LinkVideo>
          </p>
        </div>
        <div className={clsx(["shrink-0"], ["flex", "items-center"])}>
          <LinkVideo fragment={video}>
            <VideoThumbnail
              fragment={video}
              className={clsx(["w-[72px]", "h-[48px]"])}
              imageSize="small"
            />
          </LinkVideo>
        </div>
        <div className={clsx(["shrink-0"], ["flex", "items-center"])}>
          <LinkUser fragment={acceptedBy}>
            <UserIcon fragment={acceptedBy} size={32} />
          </LinkUser>
        </div>
        <div className={clsx(["shrink-0"], ["flex", "items-center"])}>
          <p className={clsx(["text-xs", "text-slate-600"])}>
            <DateTime date={createdAt} />
          </p>
        </div>
      </div>
    </div>
  );
}
