"use client";
import clsx from "clsx";
import React from "react";

import { LinkNicovideoRegistrationRequest } from "~/app/requests/nicovideo/[sourceId]/Link";
import { CoolImage } from "~/components/CoolImage";
import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment SearchContents_NicovideoRequestExists on NicovideoRegistrationRequest {
    ...Link_NicovideoRegistrationRequest
    id
    title
    sourceId
    thumbnailUrl
    requestedBy {
      id
      name
      ...Link_User
      ...UserIcon
    }
  }
`);
export const RequestsExists: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <LinkNicovideoRegistrationRequest
      className={clsx(className, [
        "flex gap-x-4 p-2 hover:bg-sky-300/50 focus:bg-sky-400/50",
      ])}
      fragment={fragment}
      onClick={(e) => {
        e.currentTarget.blur();
      }}
    >
      <div className={clsx("shrink-0")}>
        <CoolImage
          className={clsx("h-18 w-36")}
          src={fragment.thumbnailUrl}
          alt={fragment.sourceId}
          width={196}
          height={128}
          unoptimized={true}
        />
      </div>
      <div className={clsx("flex grow flex-col justify-center")}>
        <div className={clsx("flex")}>
          <p className={clsx("text-xs text-slate-500")}>
            <span className={clsx("font-mono")}>{fragment.sourceId}</span>
            は既にリクエストされています。
          </p>
        </div>
        <div className={clsx("flex")}>
          <p className={clsx("text-sm font-bold text-slate-900")}>
            {fragment.title}
          </p>
        </div>
        <div className={clsx("mt-2 flex grow")}>
          <UserIcon size={24} fragment={fragment.requestedBy} />
          <div className={clsx("ml-1")}>
            <span className={clsx("text-xs")}>{fragment.requestedBy.name}</span>
          </div>
        </div>
      </div>
    </LinkNicovideoRegistrationRequest>
  );
};
