"use client";
import clsx from "clsx";
import React from "react";

import SearchNicovideo from "./Nicovideo";
import SearchMads from "./SearchMads";
import SearchTags from "./SearchTags";

export const regexNicovideoSourceID = /sm\d+/;

export const Dropdown: React.FC<{
  classname?: string;
  style?: React.CSSProperties;
  query: string;
  size: "md";
  searchMads: boolean;
  searchTags: boolean;
  searchNicovideo: boolean;
}> = ({
  classname,
  style,
  size = "md",
  query,
  searchMads,
  searchNicovideo,
  searchTags,
}) => {
  return (
    <div
      style={style}
      className={clsx(
        classname,
        "rounded-b-md border-x border-b border-obsidian-lighter/90 bg-obsidian-primary/90 shadow-md backdrop-blur-sm",
        { md: "px-2 py-3" }[size]
      )}
    >
      <div className={clsx("flex flex-col gap-y-2")}>
        {searchTags && (
          <SearchTags className={clsx("w-full")} size={size} query={query} />
        )}
        {searchMads && (
          <SearchMads className={clsx("w-full")} size={size} query={query} />
        )}
        {searchNicovideo && regexNicovideoSourceID.test(query) && (
          <SearchNicovideo
            className={clsx("w-full")}
            sourceId={query}
            size={size}
          />
        )}
      </div>
    </div>
  );
};
