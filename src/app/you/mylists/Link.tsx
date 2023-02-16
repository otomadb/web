import Link from "next/link";
import React, { ComponentProps } from "react";

export const LinkYouMylists: React.FC<
  Omit<ComponentProps<typeof Link>, "href">
> = ({ children, ...props }) => (
  <Link href={"/you/mylists"} {...props}>
    {children}
  </Link>
);
