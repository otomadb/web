import Link from "next/link";
import React, { ComponentProps } from "react";

export default function NotificationsPageLink({
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link href={"/notifications"} {...props}>
      {children}
    </Link>
  );
}
