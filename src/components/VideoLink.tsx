import clsx from "clsx";
import Link from "next/link";
import React, { ComponentProps, ReactNode } from "react";

export const VideoLink: React.FC<{
  videoId: string;
  className?: string;
  children?: ReactNode;
  onClick?: ComponentProps<typeof Link>["onClick"];
}> = ({ className, children, videoId }) => (
  <Link
    className={clsx(className)}
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    href={`/videos/${videoId.split(":").at(1)!}`}
  >
    {children}
  </Link>
);
