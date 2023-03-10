import Link from "next/link";
import qs from "query-string";
import React, { ComponentProps } from "react";

export type SearchParams = { after?: string };

export const AllNicovideoRequestsPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & SearchParams
> = ({ children, after, ...props }) => {
  return (
    <Link href={`/requests/nicovideo?${qs.stringify({ after })}`} {...props}>
      {children}
    </Link>
  );
};
