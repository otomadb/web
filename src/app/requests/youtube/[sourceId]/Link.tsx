import Link from "next/link";
import React, { ComponentProps } from "react";

export default function YoutubeRequestLink({
  sourceId,
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { sourceId: string }) {
  return (
    <Link href={`/requests/youtube/${sourceId}`} {...props}>
      {children}
    </Link>
  );
}
