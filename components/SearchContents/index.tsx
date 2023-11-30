"use client";
import "client-only";

import clsx from "clsx";
import React, { useState } from "react";

import { DelayedInput } from "~/components/DelayedInput";
import Pictogram from "~/components/Pictogram";

import { Dropdown } from "./Dropdown";

export default function SearchContents({
  className,
  style,
  size = "md",
  opacity = false,
}: {
  className?: string;
  style?: React.CSSProperties;
  size?: "md";
  /**
   * 入力欄を透過させる
   * @default false
   */
  opacity?: boolean;
}) {
  const [query, setQuery] = useState<string>("");

  return (
    <form style={style} className={clsx(className, "group relative w-full")}>
      <div
        className={clsx(
          "rounded-md border",
          opacity
            ? "border-obsidian-lightest/75 bg-obsidian-darker/75 backdrop-blur-md"
            : "border-obsidian-lightest bg-obsidian-darker"
        )}
      >
        <div
          className={clsx(
            "pointer-events-none absolute inset-y-0 flex items-center pl-4"
          )}
        >
          <Pictogram
            icon="search"
            className={clsx("h-4 w-4 text-snow-darkest")}
          />
        </div>
        <DelayedInput
          className={clsx(
            "w-full bg-transparent pl-10 text-snow-primary placeholder:text-obsidian-lightest",
            { md: "text-sm py-3 pr-4" }[size]
          )}
          type="search"
          aria-label="Search box input"
          debounce={50}
          onUpdateQuery={(v) => setQuery(v)}
          placeholder="何かしらを検索"
        />
      </div>
      {query !== "" && (
        <Dropdown
          classname={clsx(
            "invisible absolute top-full z-infinity w-full group-focus-within:visible"
          )}
          size={size}
          query={query}
        />
      )}
    </form>
  );
}
