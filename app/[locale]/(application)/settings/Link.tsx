import Link from "next/link";
import React, { ComponentProps } from "react";

const SettingPageLink: React.FC<Omit<ComponentProps<typeof Link>, "href">> = ({
  children,
  ...props
}) => (
  <Link href={"/settings"} {...props}>
    {children}
  </Link>
);
export default SettingPageLink;
