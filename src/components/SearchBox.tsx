"use client";

import clsx from "clsx";
import ky from "ky";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

export const SearchBox: React.FC<{
  classname?: string;
  query: string;
  onRoute(): void;
}> = ({ classname, query, onRoute }) => {
  const { data, isValidating } = useSWR(
    query !== "" ? `http://localhost:8080/search?query=${query}` : null,
    (url) =>
      ky.get(url).json<{
        videos: {
          id: string;
          title_search: string;
          title_primary: string;
        }[];
        tags: {
          id: string;
          name_search: string;
          name_primary: string;
        }[];
      }>(),
    { suspense: false }
  );

  return (
    <div
      className={clsx(
        classname,
        ["shadow-md"],
        ["bg-slate-50/90"],
        ["backdrop-blur-sm"]
      )}
    >
      <div className={clsx()}>
        <div
          className={clsx(
            ["px-4", "py-1"],
            ["border-b", "border-slate-300/75"]
          )}
        >
          <span
            className={clsx(["text-slate-700"], ["text-sm"], ["font-bold"])}
          >
            Videos
          </span>
        </div>
        {data && (
          <>
            {data.videos.length === 0 && (
              <div
                className={clsx(["px-4", "py-1"], [["flex"], ["items-center"]])}
              >
                <span className={clsx(["text-slate-900"], ["text-sm"])}>
                  該当なし
                </span>
              </div>
            )}
            <div className={clsx(["divide-y", "divide-slate-400/75"])}>
              {data.videos.map(({ id, title_primary, title_search }) => (
                <Link
                  key={id}
                  href={`/videos/${id}`}
                  className={clsx(
                    ["px-4", "py-2"],
                    [["flex"], ["items-center"]],
                    ["bg-sky-100/50", "hover:bg-sky-300/50"]
                  )}
                  onClick={() => onRoute()}
                >
                  <div className={clsx(["flex-grow"], ["truncate"])}>
                    <span className={clsx(["text-slate-900"], ["text-sm"])}>
                      {title_search}
                    </span>
                  </div>
                  {title_search !== title_primary && (
                    <div className={clsx(["ml-4"], ["flex-shrink-0"])}>
                      <span className={clsx(["text-xs"], ["text-slate-500"])}>
                        {title_primary}
                      </span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      <div className={clsx()}>
        <div
          className={clsx(
            ["px-4", "py-1"],
            ["border-b", "border-slate-300/75"]
          )}
        >
          <span
            className={clsx(["text-slate-700"], ["text-sm"], ["font-bold"])}
          >
            Tags
          </span>
        </div>
        {data && (
          <>
            {data.tags.length === 0 && (
              <div
                className={clsx(["px-4", "py-1"], [["flex"], ["items-center"]])}
              >
                <span className={clsx(["text-slate-900"], ["text-sm"])}>
                  該当なし
                </span>
              </div>
            )}
            <div className={clsx(["divide-y", "divide-slate-400/75"])}>
              {data.tags.map(({ id, name_primary, name_search }) => (
                <Link
                  key={id}
                  href={`/tags/${id}`}
                  className={clsx(
                    ["px-4", "py-2"],
                    [["flex"], ["items-center"]],
                    ["bg-sky-100/50", "hover:bg-sky-300/50"]
                  )}
                  onClick={() => onRoute()}
                >
                  <div className={clsx(["flex-grow"], ["truncate"])}>
                    <span className={clsx(["text-slate-900"], ["text-sm"])}>
                      {name_search}
                    </span>
                  </div>
                  {name_search !== name_primary && (
                    <div className={clsx(["ml-4"], ["flex-shrink-0"])}>
                      <span className={clsx(["text-xs"], ["text-slate-500"])}>
                        {name_primary}
                      </span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
