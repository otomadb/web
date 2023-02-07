import clsx from "clsx";
import Image from "next/image";
import React, { ReactNode } from "react";

import { graphql } from "~/gql";
import { Component_ThumbnailFragment } from "~/gql/graphql";

import { LinkVideo } from "./Link";

graphql(`
  fragment Component_Thumbnail on Video {
    title
    serial
    thumbnailUrl
  }
`);

export const Thumbnail: React.FC<{
  className?: string;
  fragment: Component_ThumbnailFragment;
  Wrapper?: React.FC<{ children: ReactNode; className?: string }>;
  width: number;
  height: number;
}> = ({
  className,
  fragment,
  width = 256,
  height = 192,
  Wrapper = (props) => <LinkVideo serial={fragment.serial} {...props} />,
}) => {
  const { title, thumbnailUrl } = fragment;

  return (
    <Wrapper
      className={clsx(
        className,
        ["block"],
        ["flex", "justify-center"],
        ["rounded-lg"],
        ["overflow-hidden"],
        ["relative"]
      )}
    >
      <Image
        className={clsx(
          ["z-0"],
          ["absolute"],
          ["inset-0"],
          ["w-full", "h-full"],
          ["object-cover", "object-center"],
          ["blur-md", "brightness-75", "scale-125"]
        )}
        src={thumbnailUrl}
        width={width}
        height={height}
        alt={title}
        priority={true}
      />
      <Image
        className={clsx(
          ["z-1"],
          ["relative"],
          ["w-auto", "h-auto"],
          ["object-scale-down"]
        )}
        src={thumbnailUrl}
        width={width}
        height={height}
        alt={title}
        priority={true}
      />
    </Wrapper>
  );
};
