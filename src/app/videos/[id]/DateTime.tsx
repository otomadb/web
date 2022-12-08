"use client";

import clsx from "clsx";
import { formatDistance } from "date-fns";
import React from "react";

export const DateTime: React.FC<{ className?: string; date: string }> = ({
  className,
  date,
}) => {
  return (
    <time className={clsx(className)} dateTime={date}>
      {formatDistance(new Date(date), new Date(), { addSuffix: true })}
    </time>
  );
};
