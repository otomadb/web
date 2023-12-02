import Link from "next/link";
import React, { ComponentProps } from "react";

export default function MyMylistsPageLink({
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link href={"/home/mylists"} {...props}>
      {children}
    </Link>
  );
}
