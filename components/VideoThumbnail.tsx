import clsx from "clsx";
import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

import { CoolImage2 } from "./CoolImage";

const imageSizes = { small: 128, medium: 192, large: 256 };
export const Fragment = graphql(`
  fragment VideoThumbnail on Video {
    title
    thumbnailUrl
  }
`);
export const VideoThumbnail: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
  /**
   * あくまでも画像のサイズであり，`width`及び`height`は別途スタイルを当てるなどする必要があることに注意．
   */
  imageSize: keyof typeof imageSizes;
}> = ({ className, imageSize, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  return (
    <CoolImage2
      className={className}
      src={fragment.thumbnailUrl}
      alt={fragment.title}
      width={imageSizes[imageSize] * 1.5}
      height={imageSizes[imageSize]}
      unoptimized={true}
    />
  );
};

export const VideoThumbnail2: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
  /**
   * あくまでも画像のサイズであり，`width`及び`height`は別途スタイルを当てるなどする必要があることに注意．
   */
  imageSize: keyof typeof imageSizes;
}> = ({ className, imageSize, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  return (
    <CoolImage2
      className={clsx(className, "aspect-h-9 aspect-w-16")}
      src={fragment.thumbnailUrl}
      alt={fragment.title}
      width={imageSizes[imageSize] * 1.5}
      height={imageSizes[imageSize]}
      unoptimized={true}
    />
  );
};
