import Link from "next/link";
import React, { ComponentProps } from "react";

export const AllNicovideoRequestsPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href">
> = ({ children, ...props }) => {
  return (
    <Link href={`/requests/nicovideo`} {...props}>
      {children}
    </Link>
  );
};
