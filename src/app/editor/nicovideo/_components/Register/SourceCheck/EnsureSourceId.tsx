"use client";
import clsx from "clsx";
import React, { ReactNode } from "react";

import { useSourceId } from "../../SourceIdProvider";
import { EnsureSource } from "./EnsureSource";

export const EnsureSourceId: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const sourceId = useSourceId();

  return (
    <div>
      {!sourceId && (
        <div>
          <p className={clsx(["text-sm"])}>動画IDを入力してください。</p>
        </div>
      )}
      {sourceId && <EnsureSource sourceId={sourceId}>{children}</EnsureSource>}
    </div>
  );
};
