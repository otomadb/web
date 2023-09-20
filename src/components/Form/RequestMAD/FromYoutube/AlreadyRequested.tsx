"use client";
import "client-only";

import clsx from "clsx";
import Image from "next/image";
import React from "react";

import YoutubeRequestLink from "~/app/requests/youtube/[sourceId]/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment RequestMADFromYoutubeForm_AlreadyRequested on YoutubeRegistrationRequest {
    sourceId
    checked
    thumbnailUrl
  }
`);
export default function AlreadyRequested({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof Fragment>;
}) {
  const fragment = useFragment(Fragment, props.fragment);
  return (
    <div className={clsx(className, ["flex", "gap-x-4"])} style={style}>
      <YoutubeRequestLink
        className={clsx(["flex-shrink-0"])}
        sourceId={fragment.sourceId}
      >
        <Image
          width={260}
          height={200}
          src={fragment.thumbnailUrl}
          alt={fragment.sourceId}
          priority
        />
      </YoutubeRequestLink>
      <div>
        <p className={clsx(["text-sm"], ["text-slate-400"])}>
          <YoutubeRequestLink
            className={clsx(["font-bold"], ["text-slate-300"])}
            sourceId={fragment.sourceId}
          >
            {fragment.sourceId}
          </YoutubeRequestLink>
          は既にリクエストされています。
        </p>
      </div>
    </div>
  );
}
