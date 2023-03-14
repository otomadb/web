import Link from "next/link";
import React, { ComponentProps } from "react";

export const NicovideoRequestPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    params?: { sourceId: string };
  }
> = ({ children, params, ...props }) => {
  let url = `/request/nicovideo`;
  if (params?.sourceId) url += `?sourceId=${params?.sourceId}`;
  return (
    <Link href={url.toString()} {...props}>
      {children}
    </Link>
  );
};
