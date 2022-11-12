"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";

import { SearchBox } from "./SearchBox";

export const QueryInput: React.FC<{
  className?: string;
  onUpdateQuery(value: string): void;
  onFocus(): void;
  debounce?: number;
}> = ({ className, onUpdateQuery, onFocus, debounce = 250 }) => {
  const [input, setInput] = useState("");
  const [ime, setIME] = useState<boolean>(false);

  useDebounce(
    () => {
      if (ime) return;
      onUpdateQuery(input);
    },
    debounce,
    [ime, input]
  );

  useEffect(() => {
    if (!ime) onUpdateQuery(input);
  });

  return (
    <input
      className={clsx(className)}
      value={input}
      onChange={(e) => {
        setInput(e.target.value);
      }}
      onCompositionStart={() => {
        setIME(true);
      }}
      onCompositionEnd={() => {
        setIME(false);
      }}
      onFocus={() => onFocus()}
    ></input>
  );
};

export const GlobalNav: React.FC<{ className?: string }> = ({ className }) => {
  const [query, setQuery] = useState<string>("");
  const [focus, setFocus] = useState(false);

  return (
    <nav className={clsx(className, ["bg-slate-900"], ["h-16"], ["shadow-lg"])}>
      <div
        className={clsx(
          ["h-full"],
          ["container"],
          ["mx-auto"],
          ["flex", ["items-center"]]
        )}
      >
        <div className={clsx(["w-96"], ["relative"])}>
          <div
            onClick={() => setFocus(false)}
            className={clsx(["z-0"], ["fixed"], ["inset-0"], {
              hidden: !focus,
            })}
          />
          <QueryInput
            className={clsx(["relative"], ["w-full"], ["z-1"])}
            onUpdateQuery={(v) => setQuery(v)}
            onFocus={() => setFocus(true)}
          />
          <SearchBox
            classname={clsx(["w-full"], ["z-1"], ["absolute"], ["top-full"], {
              invisible: !focus,
            })}
            query={query}
            onRoute={() => {
              setFocus(false);
            }}
          />
        </div>
      </div>
    </nav>
  );
};
