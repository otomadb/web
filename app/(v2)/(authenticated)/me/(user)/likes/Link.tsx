import Link from "next/link";
import React, { ComponentProps } from "react";

const MyLikesPageLink: React.FC<Omit<ComponentProps<typeof Link>, "href">> = ({
  children,
  ...props
}) => (
  <Link href={"/home/likes"} {...props}>
    {children}
  </Link>
);
export default MyLikesPageLink;
