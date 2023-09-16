"use client";
import React, { useEffect, useState } from "react";
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
        // Firefox + SKKでonCompositionStart/Endを使ったReactのinputが正常に動かない https://scrapbox.io/tosuke/Firefox_+_SKK%E3%81%A7onCompositionStart%2FEnd%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%9FReact%E3%81%AEinput%E3%81%8C%E6%AD%A3%E5%B8%B8%E3%81%AB%E5%8B%95%E3%81%8B%E3%81%AA%E3%81%84#60aa5d8d362ab6001cff59c4
        Promise.resolve().then(() => setIME(false))
      }}
      {...props}
    ></input>
  );
};
