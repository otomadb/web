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

export const TagLink: React.FC<{
  tagId: string;
  className?: string;
  children?: ReactNode;
  onClick?: ComponentProps<typeof Link>["onClick"];
}> = ({ className, children, tagId }) => (
  <Link
    className={clsx(className)}
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    href={`/tags/${tagId.split(":").at(1)!}`}
  >
    {children}
  </Link>
);

export const UserLink: React.FC<{
  name: string;
  className?: string;
  children?: ReactNode;
  onClick?: ComponentProps<typeof Link>["onClick"];
}> = ({ className, children, name }) => (
  <Link className={clsx(className)} href={`/users/${name}`}>
    {children}
  </Link>
);
