import Link from "next/link";
import React, { ComponentProps } from "react";

const LinkRegisterSemitag: React.FC<
  Omit<ComponentProps<typeof Link>, "href">
> = ({ children, ...props }) => (
  <Link href={"/editor/semitags"} {...props}>
    {children}
  </Link>
);
export default LinkRegisterSemitag;
