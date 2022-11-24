"use client";

import clsx from "clsx";
import React from "react";

export const DateTime: React.FC<{ className?: string; date: string }> = ({
  className,
  date,
}) => {
  return (
    <time className={clsx(className)}>
      {new Intl.DateTimeFormat("ja", {
        dateStyle: "short",
        timeStyle: "medium",
      }).format(new Date(date))}
    </time>
  );
};
