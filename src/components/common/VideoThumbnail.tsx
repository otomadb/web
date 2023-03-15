import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

import { CoolImage } from "./CoolImage";

const Fragment = graphql(`
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
    <CoolImage
      className={className}
      src={fragment.thumbnailUrl}
      alt={fragment.title}
      width={width}
      height={height}
    />
  );
};
