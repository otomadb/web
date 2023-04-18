"use client";
import clsx from "clsx";
import React from "react";

export const AttentionYou: React.FC<{
  className?: string;
  pageUserId: string;
}> = ({ className, pageUserId }) => {
  return (
    <div
      className={clsx(
        className,
        ["px-8"],
        ["py-4"],
        ["border", "border-yellow-400"],
        ["bg-yellow-100"],
        ["rounded"]
      )}
    >
      <p className={clsx(["text-yellow-900"], ["text-sm"])}>
        このページは他の人から見たあなたのページです。
      </p>
    </div>
  );
};
