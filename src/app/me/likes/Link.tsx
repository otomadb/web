import Link from "next/link";
import React, { ComponentProps } from "react";

export const YouLikesPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href">
> = ({ children, ...props }) => (
  <Link href={"/me/likes"} {...props}>
    {children}
  </Link>
);
