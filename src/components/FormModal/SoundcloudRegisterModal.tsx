"use client";

import clsx from "clsx";
import { ComponentProps, useState } from "react";

import RegisterForm from "~/components/Form/RegisterMAD/FromSoundcloud";
import SoundcloudURLForm from "~/components/Form/SoundCloudURLForm";

import { useCloseFormModal } from ".";

export default function RegisterSoundcloudMADFormModal({
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
        <SoundcloudURLForm
          className={clsx("h-full")}
          set={(s) => setSourceId(s)}
        />
      )}
      {sourceId && (
        <RegisterForm
          className={clsx("h-full")}
          url={sourceId}
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
