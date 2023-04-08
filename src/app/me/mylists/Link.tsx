import Link from "next/link";
import React, { ComponentProps } from "react";

export default function MyMylistsPageLink({
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link href={"/me/mylists"} {...props}>
      {children}
    </Link>
  );
}
