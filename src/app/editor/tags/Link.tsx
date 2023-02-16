import Link from "next/link";
import React, { ComponentProps } from "react";

export const LinkRegisterTag: React.FC<
  Omit<ComponentProps<typeof Link>, "href">
> = ({ children, ...props }) => (
  <Link href={"/editor/tags"} {...props}>
    {children}
  </Link>
);
