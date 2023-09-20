"use client";

import clsx from "clsx";
import { ComponentProps, useState } from "react";

import RequestForm from "~/components/Form/RequestMAD/FromYoutube";
import YoutubeIDForm from "~/components/Form/YoutubeIDForm";

import { useCloseFormModal } from ".";

export default function RequestMADFromYoutubeFormModal({
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
  const closeModal = useCloseFormModal();

  return (
    <div className={clsx(className)} style={style}>
      {!sourceId && (
        <YoutubeIDForm
          className={clsx(["h-full"])}
          set={(s) => setSourceId(s)}
        />
      )}
      {sourceId && (
        <RequestForm
          className={clsx(["h-full"])}
          sourceId={sourceId}
          handleSuccess={handleSuccess}
          handleCancel={() => {
            if (initialSourceId) closeModal();
            else setSourceId(undefined);
          }}
        />
      )}
    </div>
  );
}
