"use client";
import clsx from "clsx";
import React from "react";

import { CoolImage2 } from "~/components/CoolImage";
import { FragmentType, graphql, useFragment } from "~/gql";

import { RequestPageLinkSwitch } from "../../../RequestPageLinkSwitch";

export const AlreadyRequestedFragment = graphql(`
  fragment InputSourceForm_AlreadyRequested on RegistrationRequest {
    title
    thumbnailUrl
    ...RequestLinkSwitch
  }
`);
export default function AlreadyRequested({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof AlreadyRequestedFragment>;
}) {
  const f = useFragment(AlreadyRequestedFragment, props.fragment);
  const { thumbnailUrl, title } = f;

  return (
    <div className={clsx(className, "flex flex-col gap-y-2")} style={style}>
      <p className={clsx("text-sm font-bold text-snow-primary")}>
        既にリクエスト済みです
      </p>
      <div
        className={clsx(
          "overflow-hidden rounded border border-obsidian-lighter bg-obsidian-primary"
        )}
      >
        <RequestPageLinkSwitch fragment={f} className={clsx("block")}>
          <CoolImage2
            width={96}
            height={64}
            alt={title}
            src={thumbnailUrl}
            className={clsx("h-32")}
          />
        </RequestPageLinkSwitch>
        <div className={clsx("flex flex-col gap-y-2 p-2")}>
          <RequestPageLinkSwitch
            fragment={f}
            className={clsx(
              "line-clamp-1 text-xs font-bold text-snow-primary hover:text-vivid-primary hover:underline"
            )}
          >
            {f.title}
          </RequestPageLinkSwitch>
        </div>
      </div>
    </div>
  );
}
