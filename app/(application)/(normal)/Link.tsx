import Link from "next/link";
import React, { ComponentProps } from "react";

export default function AppTopPage({
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link href={"/"} {...props}>
      {children}
    </Link>
  );
}
