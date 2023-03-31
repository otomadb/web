import clsx from "clsx";
import { Comforter } from "next/font/google";
import React from "react";

const fontInspiration = Comforter({
  weight: "400",
  subsets: ["latin"],
});

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={clsx(className)}>
    <span className={clsx(fontInspiration.className)}>OtoMADB</span>
  </div>
);
