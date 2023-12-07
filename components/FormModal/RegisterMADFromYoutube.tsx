"use client";

import clsx from "clsx";
import { ComponentProps, useState } from "react";

import YoutubeIDForm from "~/components/Form/YoutubeIDForm";
import YoutubeRegisterForm from "~/components/Form/YoutubeRegisterForm";

import { useCloseFormModal } from ".";

export default function RegisterMADFromYoutubeFormModal({
  className,
  style,
  initialSourceId,
  handleSuccess,
}: {
  className?: string;
  style?: React.CSSProperties;
  initialSourceId?: string;
  handleSuccess: ComponentProps<typeof YoutubeRegisterForm>["handleSuccess"];
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
        <YoutubeRegisterForm
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
