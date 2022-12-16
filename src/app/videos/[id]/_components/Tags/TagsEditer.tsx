"use client";

import "client-only";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useState } from "react";

import { DelayedInput } from "~/components/DelayedInput";

import { useTagVideo } from "../../context";
import { SearchBox } from "./SearchBox";

export const TagsEditer: React.FC<{ className?: string }> = ({ className }) => {
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<{ id: string; name: string } | null>(
    null
  );
  const tag = useTagVideo(selected?.id || null);

  return (
    <div className={clsx(className, ["flex"])}>
      <div className={clsx(["relative"], ["flex-grow"])}>
        <DelayedInput
          className={clsx(["w-full"], ["py-1"], ["px-2"], ["text-xs"])}
          inject={selected?.name}
          onUpdateQuery={(q) => {
            setQuery(q);
            if (q !== selected?.name) setSelected(null);
          }}
        />
        <SearchBox
          classNames={clsx(
            { invisible: query === "" || selected !== null },
            ["absolute"],
            ["top-100"],
            ["w-full"],
            ["border"]
          )}
          query={query}
          setTag={(v) => {
            setSelected(v);
          }}
        />
      </div>
      <button
        disabled={!selected?.id}
        className={clsx(
          ["px-2"],
          ["disabled:bg-slate-300", ["bg-blue-400"]],
          ["disabled:text-slate-100", ["text-slate-100"]]
        )}
        onClick={() => tag()}
      >
        <PlusIcon
          className={clsx(["place-content-center"], [["w-4"], ["h-4"]])}
        />
      </button>
    </div>
  );
};
