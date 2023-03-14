"use client";

import "client-only";

import clsx from "clsx";
import React, { useState } from "react";

import { SourceIdInputForm } from "~/app/editor/nicovideo/SourceIdInputForm";

import { RegisterForm } from "./RegisterForm";

export const RequestForm: React.FC<{
  className?: string;
  initSourceId?: string;
}> = ({ className, initSourceId }) => {
  const [sourceId, setSourceId] = useState<string | undefined>(initSourceId);

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
          setSourceId(undefined);
        }}
      />
    </div>
  );
};
