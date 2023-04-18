"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { SourceIdForm } from "~/app/request/nicovideo/SourceIdForm";

import { RegisterForm } from "./RegisterForm";

export default function Controller({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const searchParams = useSearchParams();
  const [sourceId, setSourceId] = useState<string | undefined>(
    searchParams?.get("sourceId") || undefined
  );

  return (
    <div
      className={clsx(
        className,
        [["px-4"], ["py-4"]],
        ["bg-slate-100"],
        ["border", "border-slate-200", "rounded"],
        ["shadow-lg"],
        ["flex", "flex-col", "gap-y-4"]
      )}
      style={style}
    >
      {!sourceId && (
        <SourceIdForm
          className={clsx(["w-full"])}
          setSourceId={(s) => setSourceId(s)}
        />
      )}
      {sourceId && (
        <div className={clsx(["flex", "flex-col", "gap-y-2"])}>
          <div className={clsx(["w-full"], ["flex", "items-center"])}>
            <p className={clsx("text-md", "text-slate-900")}>
              <span className={clsx(["font-bold", "text-slate-700"])}>
                {sourceId}
              </span>
              を登録しようとしています
            </p>
            <button
              onClick={() => {
                setSourceId(undefined);
              }}
              className={clsx(["text-red-900"], ["ml-2"], ["text-sm"])}
            >
              取り消す
            </button>
          </div>
          <RegisterForm
            sourceId={sourceId}
            clearSourceId={() => setSourceId(undefined)}
            className={clsx(["w-full"])}
          />
        </div>
      )}
    </div>
  );
}
