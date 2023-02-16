import Link from "next/link";
import React, { ComponentProps } from "react";

export const LinkRegisterSemitag: React.FC<
  Omit<ComponentProps<typeof Link>, "href">
> = ({ children, ...props }) => (
  <Link href={"/editor/semitags"} {...props}>
    {children}
  </Link>
);
