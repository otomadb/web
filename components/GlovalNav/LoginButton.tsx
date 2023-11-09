"use client";

import "client-only";

import clsx from "clsx";

export default function LoginButton({ className }: { className?: string }) {
  return (
    <a
      href="/api/auth/login"
      className={clsx(
        className,
        ["flex", "flex-row", "items-center"],
        ["rounded"],
        ["px-3", "py-1"],
        ["transition-colors", "duration-75"],
        "border border-sky-400 bg-sky-400/20 text-sky-400 hover:border-sky-300 hover:bg-sky-400/40 hover:text-sky-300"
      )}
    >
      <span>ログイン</span>
    </a>
  );
}
