import clsx from "clsx";
import Image from "next/image";
import React from "react";

export const CoolImage: React.FC<{
  className?: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  unoptimized?: boolean;
}> = ({ className, src, alt, width, height, unoptimized = true }) => {
  return (
    <div
      className={clsx(
        className,
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
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={true}
        unoptimized={unoptimized}
      />
      <Image
        className={clsx(
          ["z-1"],
          ["relative"],
          ["w-auto", "h-auto"],
          ["object-scale-down"]
        )}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={true}
        unoptimized={unoptimized}
      />
    </div>
  );
};
