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
      className={clsx(
        className,
        ["group"],
        ["relative"],
        ["w-full"],
        ["border"],
        ["bg-white"]
      )}
    >
      <div
        className={clsx(
          ["absolute"],
          ["pl-4"],
          ["inset-y-0"],
          ["flex", "items-center"],
          ["pointer-events-none"]
        )}
      >
        <Pictogram icon="search" className={clsx(["w-4"], ["h-4"])} />
      </div>
      <DelayedInput
        className={clsx(
          ["w-full"],
          [["pl-10"], ["pr-4"], ["py-3"]],
          ["text-sm"],
          ["text-slate-900"]
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
            ["invisible", "group-focus-within:visible"],
            ["w-full"],
            [["absolute"], ["z-infinity"], ["top-full"]]
          )}
          query={query}
        />
      )}
    </form>
  );
};
