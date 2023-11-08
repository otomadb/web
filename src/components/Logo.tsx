import clsx from "clsx";
import LogoImage from "public/otomadb.svg";
import React from "react";

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <LogoImage className={clsx(className)} />
);
