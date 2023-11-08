import Link from "next/link";
import React, { ComponentProps } from "react";

export const TopLink: React.FC<Omit<ComponentProps<typeof Link>, "href">> = ({
  children,
  ...props
}) => (
  <Link href={"/"} {...props}>
    {children}
  </Link>
);
