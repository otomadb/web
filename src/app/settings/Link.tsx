import Link from "next/link";
import React, { ComponentProps } from "react";

export const SettingPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href">
> = ({ children, ...props }) => (
  <Link href={"/settings"} {...props}>
    {children}
  </Link>
);
