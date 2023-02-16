import Link from "next/link";
import React, { ComponentProps } from "react";

export const LinkSignup: React.FC<
  Omit<ComponentProps<typeof Link>, "href">
> = ({ children, ...props }) => (
  <Link href={"/signup"} {...props}>
    {children}
  </Link>
);
