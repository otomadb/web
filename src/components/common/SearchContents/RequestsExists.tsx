"use client";
import clsx from "clsx";
import React from "react";

import { LinkNicovideoRegistrationRequest } from "~/app/requests/nicovideo/[sourceId]/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

import { UserIcon } from "../../UserIcon";
import { CoolImage } from "../CoolImage";

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
      className={clsx(
        className,
        ["px-2"],
        ["py-2"],
        ["flex", ["gap-x-4"]],
        ["hover:bg-sky-300/50", "focus:bg-sky-400/50"]
      )}
      fragment={fragment}
      onClick={(e) => {
        e.currentTarget.blur();
      }}
    >
      <div className={clsx(["flex-shrink-0"])}>
        <CoolImage
          className={clsx(["w-36"], ["h-18"])}
          src={fragment.thumbnailUrl}
          alt={fragment.sourceId}
          width={196}
          height={128}
        />
      </div>
      <div
        className={clsx(["flex-grow"], ["flex", "flex-col", "justify-center"])}
      >
        <div className={clsx(["flex"])}>
          <p className={clsx(["text-slate-500"], ["text-xs"])}>
            <span className={clsx(["font-mono"])}>{fragment.sourceId}</span>
            は既にリクエストされています。
          </p>
        </div>
        <div className={clsx(["flex"])}>
          <p className={clsx(["text-slate-900"], ["text-sm"], ["font-bold"])}>
            {fragment.title}
          </p>
        </div>
        <div className={clsx(["mt-2"], ["flex-grow"], ["flex"])}>
          <UserIcon size={24} fragment={fragment.requestedBy} />
          <div className={clsx(["ml-1"])}>
            <span className={clsx(["text-xs"])}>
              {fragment.requestedBy.name}
            </span>
          </div>
        </div>
      </div>
    </LinkNicovideoRegistrationRequest>
  );
};
