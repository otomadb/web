import Link from "next/link";
import React, { ComponentProps } from "react";

const TagRegisterPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href">
> = ({ children, ...props }) => (
  <Link href={"/editor/tags"} {...props}>
    {children}
  </Link>
);
export default TagRegisterPageLink;
