"use client";

import clsx from "clsx";
import React, { useEffect } from "react";

import { LinkUser as UserLink } from "~/app/users/[name]/Link";
import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

import { useSetRequestId } from "./RequestContext";
import { TagButton } from "./TagButton";
import ToggleSemitagButton from "./ToggleSemitagButton";

export const Fragment = graphql(`
  fragment RegisterNicovideoPage_Request_Exists on NicovideoRegistrationRequest {
    id
    title
    checked
    requestedBy {
      ...Link_User
      ...UserIcon
      id
      displayName
    }
    taggings {
      id
      tag {
        ...RegisterNicovideoPage_TagButton
        id
      }
    }
    semitaggings {
      id
      ...RegisterNicovideoPage_RequestFormPart_ToggleSemitagButton
    }
  }
`);
export const RequestExists: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  const setNicovideoRequestId = useSetRequestId();

  useEffect(
    () => {
      setNicovideoRequestId(fragment.id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fragment.id]
  );

  return (
    <div className={clsx(className, ["flex", "flex-col", "gap-y-2"])}>
      <div className={clsx(["flex", "flex-col", "gap-y-1"])}>
        <p className={clsx(["text-sm", "text-slate-900"])}>
          <span className={clsx(["font-bold", "text-slate-700"])}>
            {fragment.title}
          </span>
          としてリクエストされています
        </p>
        <div
          className={clsx(["flex-grow"], ["flex", "gap-x-1", "items-center"])}
        >
          <UserLink fragment={fragment.requestedBy}>
            <UserIcon size={24} fragment={fragment.requestedBy} />
          </UserLink>
          <UserLink
            className={clsx(["text-xxs"], ["text-slate-700"])}
            fragment={fragment.requestedBy}
          >
            {fragment.requestedBy.displayName}
          </UserLink>
        </div>
      </div>
      <div className={clsx(["flex-grow"], ["flex", "flex-col"])}>
        <div className={clsx(["text-xs"])}>タグ</div>
        <div
          className={clsx(
            ["mt-1"],
            ["flex", ["gap-x-1"], ["gap-y-0.5"], "flex-wrap"]
          )}
        >
          {fragment.taggings.map((tagging) => (
            <TagButton key={tagging.id} tagId={tagging.tag.id} />
          ))}
        </div>
      </div>
      <div className={clsx(["flex-grow"], ["flex", "flex-col"])}>
        <div className={clsx(["text-xs"])}>仮タグ</div>
        <div
          className={clsx(
            ["mt-1"],
            ["flex", ["gap-x-1"], ["gap-y-0.5"], "flex-wrap"]
          )}
        >
          {fragment.semitaggings.map((semitagging) => (
            <ToggleSemitagButton key={semitagging.id} fragment={semitagging} />
          ))}
        </div>
      </div>
    </div>
  );
};
