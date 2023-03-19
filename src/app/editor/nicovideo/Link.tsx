import Link from "next/link";
import React, { ComponentProps } from "react";

export type SearchParams = { sourceId?: string };

export const NicovideoRegisterPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & SearchParams
> = ({ children, sourceId, ...props }) => (
  <Link
    href={
      sourceId ? `/editor/nicovideo?sourceId=${sourceId}` : "/editor/nicovideo"
    }
    {...props}
  >
    {children}
  </Link>
);
