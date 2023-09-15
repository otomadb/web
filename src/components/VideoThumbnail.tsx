import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

import { CoolImage2 } from "./CoolImage";

export const Fragment = graphql(`
  fragment VideoThumbnail on Video {
    title
    thumbnailUrl
  }
`);
export const VideoThumbnail: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
  width?: number;
  height?: number;
}> = ({ className, width = 196, height = 128, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  return (
    <CoolImage2
      className={className}
      src={fragment.thumbnailUrl}
      alt={fragment.title}
      width={width}
      height={height}
      unoptimized={false}
    />
  );
};
