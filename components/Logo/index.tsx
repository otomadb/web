import clsx from "clsx";
import React from "react";

import LogoImage from "./otomadb.svg";

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <LogoImage className={clsx(className)} />
);
export default Logo;
