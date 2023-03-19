"use client";

import "client-only";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { SourceIdInputForm } from "~/app/editor/nicovideo/SourceIdInputForm";

import { RegisterForm } from "./RegisterForm";

export const RequestForm: React.FC<{
  className?: string;
}> = ({ className }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const searchParams = useSearchParams()!;
  const [sourceId, setSourceId] = useState(searchParams.get("sourceId"));

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
    >
      <SourceIdInputForm className={clsx()} set={(s) => setSourceId(s)} />
      <RegisterForm
        sourceId={sourceId}
        clearSourceId={() => {
          setSourceId(null);
        }}
      />
    </div>
  );
};
