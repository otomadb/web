"use client";

import clsx from "clsx";
import { ComponentProps, useState } from "react";

import RequestForm from "~/components/Form/RequestMAD/FromSoundcloud";

import SoundcloudURLForm from "../Form/SoundCloudURLForm";
import { useCloseFormModal } from ".";

export default function RequestMADFromSoundcloudFormModal({
  className,
  style,
  initialUrl: initialSourceId,
  handleSuccess,
}: {
  className?: string;
  style?: React.CSSProperties;
  initialUrl?: string;
  handleSuccess?: ComponentProps<typeof RequestForm>["handleSuccess"];
}) {
  const [url, setUrl] = useState<string | undefined>(initialSourceId);
  const closeModal = useCloseFormModal();

  return (
    <div className={clsx(className)} style={style}>
      {!url && (
        <SoundcloudURLForm
          className={clsx(["h-full"])}
          set={(s) => setUrl(s)}
        />
      )}
      {url && (
        <RequestForm
          className={clsx(["h-full"])}
          url={url}
          handleSuccess={handleSuccess}
          handleCancel={() => {
            if (initialSourceId) closeModal();
            else setUrl(undefined);
          }}
        />
      )}
    </div>
  );
}
