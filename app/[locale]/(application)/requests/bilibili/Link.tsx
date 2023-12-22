import Link from "next/link";
import React, { ComponentProps } from "react";

export default function AllBilibiliRequestLink({
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link href={`/requests/bilibili`} {...props}>
      {children}
    </Link>
  );
}
