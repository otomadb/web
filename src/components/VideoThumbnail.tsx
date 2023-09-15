import Image from "next/image";
import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

const imageSizes = {
  small: { width: 160, height: 90 },
  medium: { width: 400, height: 225 },
  large: { width: 800, height: 450 },
};
export const Fragment = graphql(`
  fragment VideoThumbnail on Video {
    serial
    title
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
    <Image
      className={className}
      src={`/mads/${fragment.serial}/thumbnail`}
      alt={fragment.title}
      width={imageSizes[imageSize].width}
      height={imageSizes[imageSize].height}
      unoptimized={false}
    />
  );
};
