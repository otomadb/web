import Link from "next/link";
import React, { ComponentProps } from "react";

export type SearchParams = { sourceId?: string };

export const NicovideoRequestPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & SearchParams
> = ({ children, sourceId, ...props }) => {
  return (
    <Link
      href={
        sourceId
          ? `/request/nicovideo?sourceId=${sourceId}`
          : "/request/nicovideo"
      }
      {...props}
    >
      {children}
    </Link>
  );
};
