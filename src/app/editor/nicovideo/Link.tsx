import Link from "next/link";
import React, { ComponentProps } from "react";

export const LinkRegisterNicovideo: React.FC<
  Omit<ComponentProps<typeof Link>, "href">
> = ({ children, ...props }) => (
  <Link href={"/editor/nicovideo"} {...props}>
    {children}
  </Link>
);
