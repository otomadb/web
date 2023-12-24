import clsx from "clsx";
import React from "react";

import LogoEnSVG from "./en.svg";
import LogoJaSVG from "./ja.svg";

type LogoProp = { className?: string };

export const OtomadbJaLogo: React.FC<LogoProp> = ({ className }) => (
  <LogoJaSVG className={clsx(className)} />
);

export const OtomadbEnLogo: React.FC<LogoProp> = ({ className }) => (
  <LogoEnSVG className={clsx(className)} />
);

const OtomadbLogo: React.FC<LogoProp & { locale: string }> = ({
  locale,
  ...props
}) => {
  switch (locale) {
    case "ja":
      return <OtomadbJaLogo {...props} />;
    default:
      return <OtomadbEnLogo {...props} />;
  }
};

export default OtomadbLogo;
