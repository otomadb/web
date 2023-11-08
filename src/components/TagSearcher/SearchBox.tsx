"use client";
import "client-only";

import clsx from "clsx";

import Pictogram from "~/components/Pictogram";
import { TextInput } from "~/components/TextInput";

export const SearchBox: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  limit: number;
  fetching: boolean;
  disabled?: boolean;
  setQuery(query: string): void;
}> = ({ className, style, fetching, setQuery }) => {
  return (
    <label
      className={clsx(className, [
        "flex items-stretch overflow-hidden rounded border border-slate-300",
      ])}
      style={style}
    >
      <div className={clsx("shrink-0 bg-slate-400 px-3 py-2")}>
        <Pictogram
          icon="search"
          className={clsx({ hidden: fetching }, ["h-4 w-4 text-slate-200"])}
        />
        <Pictogram
          icon="loading"
          className={clsx({ hidden: !fetching }, [
            "animate-spin text-slate-200",
          ])}
        />
      </div>
      <TextInput
        className={clsx("grow px-2")}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
    </label>
  );
};
