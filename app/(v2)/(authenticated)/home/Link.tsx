import Link from "next/link";
import React, { ComponentProps } from "react";

import { OpenModalParams } from "./ModalOpener";

const MyHomeLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    openModal?: OpenModalParams;
  }
> = ({ children, openModal, ...props }) => (
  <Link
    href={{
      pathname: "/home",
      query: openModal,
    }}
    {...props}
  >
    {children}
  </Link>
);
export default MyHomeLink;
