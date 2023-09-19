"use client";
import "client-only";

import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { LinkNicovideoRegistrationRequest } from "~/app/requests/nicovideo/[sourceId]/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment RequestMADFromNicovideoForm_AlreadyRequested on NicovideoRegistrationRequest {
    ...Link_NicovideoRegistrationRequest
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
      <LinkNicovideoRegistrationRequest
        className={clsx(["flex-shrink-0"])}
        fragment={fragment}
      >
        <Image
          width={260}
          height={200}
          src={fragment.thumbnailUrl}
          alt={fragment.sourceId}
          priority
        />
      </LinkNicovideoRegistrationRequest>
      <div>
        <p className={clsx(["text-sm"], ["text-slate-400"])}>
          <LinkNicovideoRegistrationRequest
            className={clsx(["font-bold"], ["text-slate-300"])}
            fragment={fragment}
          >
            {fragment.sourceId}
          </LinkNicovideoRegistrationRequest>
          は既にリクエストされています。
        </p>
      </div>
    </div>
  );
}
