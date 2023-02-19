"use client";

import "client-only";

import clsx from "clsx";
import React, { useState } from "react";

import { NicovideoInputForm } from "./NicovideoInputForm";
import { RegisterForm } from "./RegForm";

export const Form2: React.FC<{ className?: string }> = ({ className }) => {
  const [sourceId, setSourceId] = useState<string>();

  return (
    <div className={clsx(className, ["flex", "flex-col", "gap-y-4"])}>
      <NicovideoInputForm className={clsx()} set={(s) => setSourceId(s)} />
      <RegisterForm sourceId={sourceId} />
    </div>
  );
};
