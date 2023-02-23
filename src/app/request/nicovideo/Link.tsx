import Link from "next/link";
import React, { ComponentProps } from "react";

export const LinkRequestNicovideo: React.FC<
  Omit<ComponentProps<typeof Link>, "href">
> = ({ children, ...props }) => (
  <Link href={"/request/nicovideo"} {...props}>
    {children}
  </Link>
);
