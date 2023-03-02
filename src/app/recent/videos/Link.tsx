import Link from "next/link";
import { stringify } from "querystring";
import React, { ComponentProps } from "react";
// import { stringify } from "node:querystring";

export type SearchParams = { page?: string };

export const LinkVideo: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & SearchParams
> = ({ children, page, ...props }) => {
  return (
    <Link href={`/recent/videos?${stringify({ page })}`} {...props}>
      {children}
    </Link>
  );
};
