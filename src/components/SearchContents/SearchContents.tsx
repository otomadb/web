"use client";
import "client-only";

import clsx from "clsx";
import React, { useState } from "react";

import { DelayedInput } from "~/components/DelayedInput";
import Pictogram from "~/components/Pictogram";

import { Dropdown } from "./Dropdown";

export const SearchContents: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [query, setQuery] = useState<string>("");

  return (
    <form
      className={clsx(className, ["group relative w-full border bg-white"])}
    >
      <div
        className={clsx([
          "pointer-events-none absolute inset-y-0 flex items-center pl-4",
        ])}
      >
        <Pictogram icon="search" className={clsx("h-4 w-4")} />
      </div>
      <DelayedInput
        className={clsx(
          ["w-full"],
          [["py-3 pl-10 pr-4"]],
          ["text-sm text-slate-900"]
        )}
        type="search"
        aria-label="Search box input"
        debounce={50}
        onUpdateQuery={(v) => setQuery(v)}
        placeholder="何かしらを検索"
      />
      {query !== "" && (
        <Dropdown
          classname={clsx(
            ["invisible w-full group-focus-within:visible"],
            [["absolute top-full z-infinity"]]
          )}
          query={query}
        />
      )}
    </form>
  );
};
