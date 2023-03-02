import Link from "next/link";
import { stringify } from "querystring";
import React, { ComponentProps } from "react";

export type SearchParams = { after?: string };

export const RecentVideosLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & SearchParams
> = ({ children, after, ...props }) => {
  return (
    <Link href={`/recent/videos?${stringify({ after })}`} {...props}>
      {children}
    </Link>
  );
};
