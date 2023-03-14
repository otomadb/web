import Link from "next/link";
import React, { ComponentProps } from "react";

export const SignupPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href">
> = ({ children, ...props }) => (
  <Link href={"/auth/signup"} {...props}>
    {children}
  </Link>
);
