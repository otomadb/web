"use client";
import clsx from "clsx";
import React from "react";

import { NicovideoRegisterPageLink } from "~/app/editor/nicovideo/Link";
import { LinkUser as UserLink } from "~/app/users/[name]/Link";
import { CommonTag2 } from "~/components/CommonTag";
import { CoolImage } from "~/components/CoolImage";
import { ExternalLinkIcon, PlusIcon } from "~/components/Icons";
import useHasRole from "~/components/useHasRole";
import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

import { LinkNicovideoRegistrationRequest as NicovideoRegistrationRequestLink } from "./[sourceId]/Link";

export const Fragment = graphql(`
  fragment NicovideoRequestsPage_RequestsListItem on NicovideoRegistrationRequest {
    ...Link_NicovideoRegistrationRequest
    title
    thumbnailUrl
    sourceId
    originalUrl
    taggings {
      id
      tag {
        ...CommonTag
      }
    }
    semitaggings {
      id
      name
    }
    requestedBy {
      ...Link_User
      ...UserIcon
      id
      displayName
    }
  }
`);
export default function RequestsListItem({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof Fragment>;
}) {
  const fragment = useFragment(Fragment, props.fragment);
  const registarable = useHasRole();

  return (
    <div
      className={clsx(
        className,
        ["relative"],
        ["flex", "gap-x-4"],
        ["bg-slate-950"],
        ["px-4", "py-2"]
      )}
      style={style}
    >
      <NicovideoRegistrationRequestLink
        className={clsx(["flex-shrink-0"], ["flex"])}
        fragment={fragment}
      >
        <CoolImage
          alt={fragment.title}
          src={fragment.thumbnailUrl}
          width={128}
          height={96}
          unoptimized={true}
          className={clsx(["w-[128px]", "h-[96px]"])}
        />
      </NicovideoRegistrationRequestLink>
      <div className={clsx(["flex-grow"], ["flex", "flex-col", "gap-y-2"])}>
        <NicovideoRegistrationRequestLink
          fragment={fragment}
          className={clsx([
            "text-md",
            "font-bold",
            "text-slate-300",
            "line-clamp-2",
          ])}
        >
          {fragment.title}
        </NicovideoRegistrationRequestLink>
        <div className={clsx(["flex", "gap-x-2", "items-center"])}>
          <div className={clsx(["text-xs", "text-slate-500"])}>タグ</div>
          <div className={clsx(["flex", "gap-x-1"])}>
            {fragment.taggings.map(({ id, tag }) => (
              <div key={id}>
                <CommonTag2 size="xs" fragment={tag} />
              </div>
            ))}
          </div>
        </div>
        <div className={clsx(["flex", "gap-x-2", "items-center"])}>
          <div className={clsx(["text-xs", "text-slate-500"])}>仮タグ</div>
          <div className={clsx(["flex", "gap-x-1"])}>
            {fragment.semitaggings.map(({ id, name }) => (
              <div
                key={id}
                className={clsx(
                  ["px-0.5", "py-0.25"],
                  ["text-xs"],
                  ["text-slate-400"],
                  ["border", "border-slate-700", "rounded-sm"],
                  ["bg-slate-900"]
                )}
              >
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          ["flex-shrink-0"],
          ["w-1/5"],
          ["flex", "flex-col", "justify-center", "gap-y-4"]
        )}
      >
        <div className={clsx(["flex", "gap-x-2", "items-center"])}>
          <UserLink fragment={fragment.requestedBy}>
            <UserIcon size={24} fragment={fragment.requestedBy} />
          </UserLink>
          <UserLink
            className={clsx(["text-sm"], ["text-slate-400"])}
            fragment={fragment.requestedBy}
          >
            {fragment.requestedBy.displayName}
          </UserLink>
        </div>
        <div className={clsx(["flex", "gap-x-2"])}>
          <a
            href={fragment.originalUrl}
            target="_blank"
            className={clsx(["text-slate-400", "hover:text-sky-400"])}
          >
            <ExternalLinkIcon className={clsx(["w-6", "h-6"])} />
          </a>
          <NicovideoRegisterPageLink
            sourceId={fragment.sourceId}
            className={clsx([
              "text-slate-400",
              "aria-disabled:text-slate-700",
              "hover:text-sky-400",
            ])}
            aria-disabled={!registarable}
          >
            <PlusIcon className={clsx(["w-6", "h-6"])} />
          </NicovideoRegisterPageLink>
        </div>
      </div>
    </div>
  );
}
