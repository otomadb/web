"use client";

import clsx from "clsx";
import { ComponentProps, useState } from "react";

import NicovideoIDForm from "../Form/NicovideoIDForm";
import RequestForm from "../Form/RequestMAD/FromNicovideo";

export default function RequestMADFromNicovideoFormModal({
  className,
  style,
  initialSourceId,
  handleSuccess,
}: {
  className?: string;
  style?: React.CSSProperties;
  initialSourceId?: string;
  handleSuccess?: ComponentProps<typeof RequestForm>["handleSuccess"];
}) {
  const [sourceId, setSourceId] = useState<string | undefined>(initialSourceId);

  return (
    <div className={clsx(className)} style={style}>
      {!sourceId && (
        <NicovideoIDForm
          className={clsx(["h-full"])}
          set={(s) => setSourceId(s)}
        />
      )}
      {sourceId && (
        <RequestForm
          className={clsx(["h-full"])}
          sourceId={sourceId}
          handleSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
