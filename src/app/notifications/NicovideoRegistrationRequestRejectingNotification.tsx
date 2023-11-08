"use client";

import clsx from "clsx";

import { DateTime } from "~/components/DateTime";
import Pictogram from "~/components/Pictogram";
import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

import { LinkNicovideoRegistrationRequest } from "../requests/nicovideo/[sourceId]/Link";
import { LinkUser } from "../users/[name]/Link";

export const Fragment = graphql(`
  fragment NotificationsPage_NicovideoRegistrationRequestRejectingNotification on NicovideoRegistrationRequestRejectingNotification {
    watched
    createdAt
    rejecting {
      rejectedBy {
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
  fragment: FragmentType<typeof Fragment>;
}) {
  const {
    createdAt,
    rejecting: { rejectedBy, request },
  } = useFragment(Fragment, props.fragment);

  return (
    <div className={clsx(className, "@container")} style={style}>
      <div
        className={clsx([
          "flex w-full items-center gap-x-2 border px-4 py-2 @[768px]:gap-x-4",
        ])}
      >
        <div className={clsx("flex grow items-center gap-x-1")}>
          <Pictogram icon="reject" className={clsx("h-4 w-4 text-red-500")} />
          <p className={clsx("text-sm text-slate-900")}>
            あなたの動画登録リクエスト
            <LinkNicovideoRegistrationRequest fragment={request}>
              <span className={clsx("font-bold")}>{request.title}</span>
              <span className={clsx()}>({request.sourceId})</span>
            </LinkNicovideoRegistrationRequest>
            は棄却されました。
          </p>
        </div>
        <div className={clsx("flex shrink-0 items-center")}>
          <LinkUser fragment={rejectedBy}>
            <UserIcon fragment={rejectedBy} size={32} />
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
