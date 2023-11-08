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
      className={clsx(className, [
        "relative flex justify-center overflow-hidden rounded-lg",
      ])}
    >
      <Image
        className={clsx([
          "absolute inset-0 z-0 h-full w-full scale-125 object-cover object-center blur-md brightness-75",
        ])}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={true}
        unoptimized={unoptimized}
      />
      <Image
        className={clsx(["relative z-1 h-auto w-auto object-scale-down"])}
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

export const CoolImage2: React.FC<{
  className?: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  unoptimized?: boolean;
  style?: React.CSSProperties;
}> = ({ className, src, alt, width, height, style, unoptimized = true }) => {
  return (
    <div
      className={clsx(
        className,
        ["flex justify-center"]
        // ["rounded-lg overflow-hidden relative"]
      )}
      style={style}
    >
      <Image
        className={clsx([
          "absolute inset-0 z-0 h-full w-full scale-125 object-cover object-center blur-md brightness-75",
        ])}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={true}
        unoptimized={unoptimized}
      />
      <Image
        className={clsx(["relative z-1 h-auto w-auto object-scale-down"])}
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
