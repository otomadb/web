import Link from "next/link";
import React, { ComponentProps } from "react";

export const LinkYou: React.FC<Omit<ComponentProps<typeof Link>, "href">> = ({
  children,
  ...props
}) => (
  <Link href={"/you"} {...props}>
    {children}
  </Link>
);
