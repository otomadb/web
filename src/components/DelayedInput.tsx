"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDebounce } from "react-use";

export const DelayedInput: React.FC<
  Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "onChange"
  > & {
    value?: string;
    onUpdateQuery(value: string): void;
    debounce?: number;
  }
> = ({ onUpdateQuery, debounce = 100, value, ...props }) => {
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
    if (typeof value === "string") setInput(value);
  }, [value]);

  return (
    <input
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
      {...props}
    ></input>
  );
};
