"use client";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDebounce } from "react-use";

export const DelayedInput: React.FC<{
  className?: string;
  onUpdateQuery(value: string): void;
  onFocus?(): void;
  inject?: string;
  debounce?: number;
  disabled?: boolean;
}> = ({
  className,
  onUpdateQuery,
  onFocus,
  debounce = 100,
  inject,
  disabled,
}) => {
  const [input, setInput] = useState("");
  const [ime, setIME] = useState<boolean>(false);

  useDebounce(
    () => {
      if (ime || input === "") return;
      onUpdateQuery(input);
    },
    debounce,
    [ime, input, onUpdateQuery]
  );

  useEffect(() => {
    if (input === "") onUpdateQuery("");
  }, [input, onUpdateQuery]);

  useEffect(() => {
    if (inject) setInput(inject);
  }, [inject]);

  return (
    <input
      className={clsx(className)}
      value={input}
      disabled={disabled ?? false}
      onChange={(e) => {
        setInput(e.target.value);
      }}
      onCompositionStart={() => {
        setIME(true);
      }}
      onCompositionEnd={() => {
        setIME(false);
      }}
      onFocus={() => {
        if (onFocus) onFocus();
      }}
    ></input>
  );
};
