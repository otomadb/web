import Link from "next/link";
import React, { ComponentProps } from "react";

export const AboutPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href">
> = ({ children, ...props }) => (
  <Link href={"/about"} {...props}>
    {children}
  </Link>
);
