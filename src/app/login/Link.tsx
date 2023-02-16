import Link from "next/link";
import React, { ComponentProps } from "react";

export const LinkLogin: React.FC<Omit<ComponentProps<typeof Link>, "href">> = ({
  children,
  ...props
}) => (
  <Link href={"/login"} {...props}>
    {children}
  </Link>
);
