import Link from "next/link";
import React, { ComponentProps } from "react";

export const VideoLink: React.FC<
  { videoId: string } & Omit<ComponentProps<typeof Link>, "href">
> = ({ children, videoId, ...props }) => (
  <Link
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    href={`/videos/${videoId.split(":").at(1)!}`}
    {...props}
  >
    {children}
  </Link>
);

export const TagLink: React.FC<
  { tagId: string } & Omit<ComponentProps<typeof Link>, "href">
> = ({ children, tagId, ...props }) => (
  <Link
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    href={`/tags/${tagId.split(":").at(1)!}`}
    {...props}
  >
    {children}
  </Link>
);

export const UserLink: React.FC<
  { name: string } & Omit<ComponentProps<typeof Link>, "href">
> = ({ children, name, ...props }) => (
  <Link href={`/users/${name}`} {...props}>
    {children}
  </Link>
);
