import Link from "next/link";
import React, { ComponentProps } from "react";

export default function AllYoutubeRequestLink({
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link href={`/requests/youtube`} {...props}>
      {children}
    </Link>
  );
}
