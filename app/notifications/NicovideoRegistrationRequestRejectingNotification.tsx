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
            icon="reject"
            className={clsx(["w-4", "h-4"], ["text-red-500"])}
          />
          <p className={clsx(["text-sm", "text-slate-900"])}>
            あなたの動画登録リクエスト
            <LinkNicovideoRegistrationRequest fragment={request}>
              <span className={clsx(["font-bold"])}>{request.title}</span>
              <span className={clsx()}>({request.sourceId})</span>
            </LinkNicovideoRegistrationRequest>
            は棄却されました。
          </p>
        </div>
        <div className={clsx(["shrink-0"], ["flex", "items-center"])}>
          <LinkUser fragment={rejectedBy}>
            <UserIcon fragment={rejectedBy} size={32} />
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
