"use client";
import clsx from "clsx";
import React from "react";

export const AttentionYou: React.FC<{
  className?: string;
  pageUserId: string;
}> = ({ className, pageUserId }) => {
  return (
    <div
      className={clsx(className, [
        "rounded border border-yellow-400 bg-yellow-100 px-8 py-4",
      ])}
    >
      <p className={clsx("text-sm text-yellow-900")}>
        このページは他の人から見たあなたのページです。
      </p>
    </div>
  );
};
