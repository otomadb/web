import Link from "next/link";
import React, { ComponentProps } from "react";

export const LinkTop: React.FC<Omit<ComponentProps<typeof Link>, "href">> = ({
  children,
  ...props
}) => (
  <Link href={"/"} {...props}>
    {children}
  </Link>
);
