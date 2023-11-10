"use client";
import clsx from "clsx";
import React from "react";

import CommonTag from "~/components/CommonTag";
import { CoolImage } from "~/components/CoolImage";
import { useOpenRegisterFromNicovideoWithId } from "~/components/FormModal";
import Pictogram from "~/components/Pictogram";
import useHasRole from "~/components/useHasRole";
import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

import { UserPageLink } from "../../users/[name]/Link";
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
        className={clsx(["self-center"], ["shrink-0"], ["flex"])}
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
      <div className={clsx(["grow"], ["flex", "flex-col", "gap-y-2"])}>
        <NicovideoRegistrationRequestLink
          fragment={fragment}
          className={clsx([
            " text-base",
            "font-bold",
            "text-slate-300",
            "line-clamp-2",
          ])}
        >
          {fragment.title}
        </NicovideoRegistrationRequestLink>
        <div className={clsx(["flex", "gap-x-2", "items-center"])}>
          <div className={clsx(["shrink-0"], ["text-xs", "text-slate-500"])}>
            タグ
          </div>
          {fragment.taggings.length === 0 && (
            <div className={clsx(["shrink-0"], ["text-xs", "text-slate-400"])}>
              なし
            </div>
          )}
          {fragment.taggings.length > 0 && (
            <div className={clsx(["flex", "flex-wrap", "gap-x-1", "gap-y-1"])}>
              {fragment.taggings.map(({ id, tag }) => (
                <div key={id}>
                  <CommonTag size="xs" fragment={tag} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={clsx(["flex", "gap-x-2", "items-center"])}>
          <div className={clsx(["shrink-0"], ["text-xs", "text-slate-500"])}>
            仮タグ
          </div>
          {fragment.semitaggings.length === 0 && (
            <div className={clsx(["shrink-0"], ["text-xs", "text-slate-400"])}>
              なし
            </div>
          )}
          {fragment.semitaggings.length > 0 && (
            <div className={clsx(["flex", "flex-wrap", "gap-x-1", "gap-y-1"])}>
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
          )}
        </div>
      </div>
      <div
        className={clsx(
          ["self-center"],
          ["shrink-0"],
          ["w-1/5"],
          ["flex", "flex-col", "gap-y-4"]
        )}
      >
        <div className={clsx(["flex", "gap-x-2", "items-center"])}>
          <UserPageLink fragment={fragment.requestedBy}>
            <UserIcon size={24} fragment={fragment.requestedBy} />
          </UserPageLink>
          <UserPageLink
            className={clsx(["text-sm"], ["text-slate-400"])}
            fragment={fragment.requestedBy}
          >
            {fragment.requestedBy.displayName}
          </UserPageLink>
        </div>
        <div className={clsx(["flex", "gap-x-2"])}>
          <a
            href={fragment.originalUrl}
            target="_blank"
            className={clsx(["text-slate-400", "hover:text-sky-400"])}
          >
            <Pictogram icon="external-link" className={clsx(["w-6", "h-6"])} />
          </a>
          <button
            role="button"
            className={clsx([
              "text-slate-400",
              "disabled:text-slate-700",
              "hover:text-sky-400",
            ])}
            disabled={!registarable}
            onClick={() => openRegisterForm(fragment.sourceId)}
          >
            <Pictogram icon="plus" className={clsx(["w-6", "h-6"])} />
          </button>
        </div>
      </div>
    </div>
  );
}
