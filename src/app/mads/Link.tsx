import Link from "next/link";
import React, { ComponentProps } from "react";

export type SearchParams = { after?: string };

export const AllVideosPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & SearchParams
> = ({ children, after, ...props }) => {
  const param = new URLSearchParams(after ? { after } : {}).toString();

  return (
    <Link href={param === "" ? `/mads` : `/mads?${param}`} {...props}>
      {children}
    </Link>
  );
};
