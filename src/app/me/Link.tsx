import Link from "next/link";
import React, { ComponentProps } from "react";

export const MyPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href">
> = ({ children, ...props }) => (
  <Link href={"/me"} {...props}>
    {children}
  </Link>
);
