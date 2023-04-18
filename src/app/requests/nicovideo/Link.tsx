import Link from "next/link";
import React, { ComponentProps } from "react";

export type SearchParams = { after?: string };

export const AllNicovideoRequestsPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & { params?: SearchParams }
> = ({ children, params, ...props }) => {
  return (
    <Link
      href={`/requests/nicovideo?${new URLSearchParams(params).toString()}`}
      {...props}
    >
      {children}
    </Link>
  );
};
