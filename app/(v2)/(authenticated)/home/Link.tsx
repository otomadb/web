import Link from "next/link";
import React, { ComponentProps } from "react";

const MyHomeLink: React.FC<Omit<ComponentProps<typeof Link>, "href">> = ({
  children,
  ...props
}) => (
  <Link href={"/home"} {...props}>
    {children}
  </Link>
);
export default MyHomeLink;
