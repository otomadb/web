"use client";

import clsx from "clsx";
import { ComponentProps, useState } from "react";

import RegisterForm from "~/components/Form/RegisterMAD/FromYoutube";
import YoutubeIDForm from "~/components/Form/YoutubeIDForm";

export default function RegisterMADFromYoutubeFormModal({
  className,
  style,
  initialSourceId,
  handleSuccess,
}: {
  className?: string;
  style?: React.CSSProperties;
  initialSourceId?: string;
  handleSuccess: ComponentProps<typeof RegisterForm>["handleSuccess"];
}) {
  const [sourceId, setSourceId] = useState<string | undefined>(initialSourceId);

  return (
    <div className={clsx(className)} style={style}>
      {!sourceId && (
        <YoutubeIDForm
          className={clsx(["h-full"])}
          set={(s) => setSourceId(s)}
        />
      )}
      {sourceId && (
        <RegisterForm
          className={clsx(["h-full"])}
          sourceId={sourceId}
          handleSuccess={handleSuccess}
        />
      )}
    </div>
  );
}