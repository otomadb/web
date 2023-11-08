"use client";

import clsx from "clsx";
import { ComponentProps, useState } from "react";

import NicovideoIDForm from "~/components/Form/NicovideoIDForm";
import RegisterForm from "~/components/Form/RegisterMAD/FromNicovideo";

import { useCloseFormModal } from ".";

export default function RegisterMADFromNicovideoFormModal({
  className,
  style,
  initialSourceId,
  handleSuccess,
}: {
  className?: string;
  style?: React.CSSProperties;
  initialSourceId?: string;
  handleSuccess?: ComponentProps<typeof RegisterForm>["handleSuccess"];
}) {
  const [sourceId, setSourceId] = useState<string | undefined>(initialSourceId);
  const closeModal = useCloseFormModal();

  return (
    <div className={clsx(className)} style={style}>
      {!sourceId && (
        <NicovideoIDForm
          className={clsx("h-full")}
          set={(s) => setSourceId(s)}
        />
      )}
      {sourceId && (
        <RegisterForm
          className={clsx("h-full")}
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
