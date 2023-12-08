"use client";
import clsx from "clsx";
import React from "react";

import CommonMadBlock from "~/components/CommonMadBlock";
import { FragmentType, graphql, useFragment } from "~/gql";

export const AlreadyRegisteredFragment = graphql(`
  fragment InputSourceForm_AlreadyRegistered on VideoSource {
    sourceId
    video {
      id
      ...CommonMadBlock
    }
  }
`);
export default function AlreadyRegistered({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof AlreadyRegisteredFragment>;
}) {
  const { video } = useFragment(AlreadyRegisteredFragment, props.fragment);

  return (
    <div className={clsx(className, "flex flex-col gap-y-2")} style={style}>
      <p className={clsx("text-sm font-bold text-snow-primary")}>
        既に登録済みです
      </p>
      <CommonMadBlock fragment={video} size="small" />
    </div>
  );
}
