import Link from "next/link";
import React, { ComponentProps } from "react";

export const LinkYouLikes: React.FC<
  Omit<ComponentProps<typeof Link>, "href">
> = ({ children, ...props }) => (
  <Link href={"/you/likes"} {...props}>
    {children}
  </Link>
);
