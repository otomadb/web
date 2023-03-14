import Link from "next/link";
import React, { ComponentProps } from "react";

export const SigninLinkPage: React.FC<
  Omit<ComponentProps<typeof Link>, "href">
> = ({ children, ...props }) => (
  <Link href={"/signin"} {...props}>
    {children}
  </Link>
);
