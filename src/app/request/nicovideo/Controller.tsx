"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

import RequestForm from "./RequestForm";
import { SourceIdForm } from "./SourceIdForm";

export default function Controller({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const searchParams = useSearchParams();
  const [sourceId, setSourceId] = useState(searchParams?.get("sourceId"));

  return (
    <div
      className={clsx(
        className,
        [["px-4"], ["py-4"]],
        ["rounded"],
        ["border", "border-slate-300"],
        ["bg-slate-50"],
        ["flex", "flex-col", "gap-y-4"]
      )}
      style={style}
    >
      <SourceIdForm className={clsx()} setSourceId={(s) => setSourceId(s)} />
      {sourceId && (
        <RequestForm
          sourceId={sourceId}
          clearSourceId={() => setSourceId(null)}
        />
      )}
    </div>
  );
}
