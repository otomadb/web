import Link from "next/link";
import React, { ComponentProps } from "react";

export default function AllSoundcloudRequestLink({
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link href={`/requests/soundcloud`} {...props}>
      {children}
    </Link>
  );
}
