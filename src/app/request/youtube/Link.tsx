import Link from "next/link";
import { ComponentProps } from "react";

export type SearchParams = { sourceId?: string };
export default function NicovideoRequestPageLink({
  children,
  sourceId,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & SearchParams) {
  return (
    <Link
      href={
        sourceId ? `/request/youtube?sourceId=${sourceId}` : "/request/youtube"
      }
      {...props}
    >
      {children}
    </Link>
  );
}
