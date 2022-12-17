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
    onUpdateQuery(value: string): void;
    debounce?: number;
  }
> = ({ onUpdateQuery, debounce = 100, ...props }) => {
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

  return (
    <input
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
