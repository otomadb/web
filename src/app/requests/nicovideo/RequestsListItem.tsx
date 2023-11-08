"use client";
import clsx from "clsx";
import React from "react";

import { LinkUser as UserLink } from "~/app/users/[name]/Link";
import { CommonTag2 } from "~/components/CommonTag";
import { CoolImage } from "~/components/CoolImage";
import { useOpenRegisterFromNicovideoWithId } from "~/components/FormModal";
import Pictogram from "~/components/Pictogram";
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
  const openRegisterForm = useOpenRegisterFromNicovideoWithId();

  return (
    <div
      className={clsx(className, [
        "relative flex gap-x-4 bg-slate-950 px-4 py-2",
      ])}
      style={style}
    >
      <NicovideoRegistrationRequestLink
        className={clsx("flex shrink-0 self-center")}
        fragment={fragment}
      >
        <CoolImage
          alt={fragment.title}
          src={fragment.thumbnailUrl}
          width={128}
          height={96}
          unoptimized={true}
          className={clsx("h-[96px] w-[128px]")}
        />
      </NicovideoRegistrationRequestLink>
      <div className={clsx("flex grow flex-col gap-y-2")}>
        <NicovideoRegistrationRequestLink
          fragment={fragment}
          className={clsx([
            "text-base ",
            "font-bold",
            "text-slate-300",
            "line-clamp-2",
          ])}
        >
          {fragment.title}
        </NicovideoRegistrationRequestLink>
        <div className={clsx("flex items-center gap-x-2")}>
          <div className={clsx("shrink-0 text-xs text-slate-500")}>タグ</div>
          {fragment.taggings.length === 0 && (
            <div className={clsx("shrink-0 text-xs text-slate-400")}>なし</div>
          )}
          {fragment.taggings.length > 0 && (
            <div className={clsx("flex flex-wrap gap-1")}>
              {fragment.taggings.map(({ id, tag }) => (
                <div key={id}>
                  <CommonTag2 size="xs" fragment={tag} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={clsx("flex items-center gap-x-2")}>
          <div className={clsx("shrink-0 text-xs text-slate-500")}>仮タグ</div>
          {fragment.semitaggings.length === 0 && (
            <div className={clsx("shrink-0 text-xs text-slate-400")}>なし</div>
          )}
          {fragment.semitaggings.length > 0 && (
            <div className={clsx("flex flex-wrap gap-1")}>
              {fragment.semitaggings.map(({ id, name }) => (
                <div
                  key={id}
                  className={clsx([
                    "rounded-sm border border-slate-700 bg-slate-900 px-0.5 py-0.25 text-xs text-slate-400",
                  ])}
                >
                  <span>{name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        className={clsx(["flex w-1/5 shrink-0 flex-col gap-y-4 self-center"])}
      >
        <div className={clsx("flex items-center gap-x-2")}>
          <UserLink fragment={fragment.requestedBy}>
            <UserIcon size={24} fragment={fragment.requestedBy} />
          </UserLink>
          <UserLink
            className={clsx("text-sm text-slate-400")}
            fragment={fragment.requestedBy}
          >
            {fragment.requestedBy.displayName}
          </UserLink>
        </div>
        <div className={clsx("flex gap-x-2")}>
          <a
            href={fragment.originalUrl}
            target="_blank"
            className={clsx("text-slate-400 hover:text-sky-400")}
          >
            <Pictogram icon="external-link" className={clsx("h-6 w-6")} />
          </a>
          <button
            role="button"
            className={clsx([
              "text-slate-400 hover:text-sky-400 disabled:text-slate-700",
            ])}
            disabled={!registarable}
            onClick={() => openRegisterForm(fragment.sourceId)}
          >
            <Pictogram icon="plus" className={clsx("h-6 w-6")} />
          </button>
        </div>
      </div>
    </div>
  );
}
