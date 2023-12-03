"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import * as z from "zod";

import {
  useOpenRegisterFromBilibili,
  useOpenRegisterFromNicovideoWithId,
  useOpenRegisterFromYoutube,
  useOpenRequestFromNicovideoWithID,
  useOpenRequestFromSoundcloud,
  useOpenRequestFromYoutube,
  useOpenSoundcloudRegisterModal,
} from "~/components/FormModal";

const schemaParams = z.union([
  z.object({
    requestNicovideo: z.string(), // TODO: check valid nicovideo source
  }),
  z.object({
    requestYoutube: z.string(), // TODO: check valid youtube source
  }),
  z.object({
    requestSoundcloud: z.string(), // TODO: check valid soundcloud source
  }),
  z.object({
    registerNicovideo: z.string(), // TODO: check valid nicovideo source
  }),
  z.object({
    registerYoutube: z.string(), // TODO: check valid youtube source
  }),
  z.object({
    registerBilibili: z.string(), // TODO: check valid bilibili source
  }),
  z.object({
    registerSoundcloud: z.string(), // TODO: check valid soundcloud source
  }),
]);
export type OpenModalParams = z.infer<typeof schemaParams>;

export const ModalOpener = () => {
  const params = useSearchParams();

  const openRequestFromNicovideo = useOpenRequestFromNicovideoWithID();
  const openRequestFromYoutube = useOpenRequestFromYoutube();
  const openRequestFromSoundcloud = useOpenRequestFromSoundcloud();
  const openNicovideoRegisterModal = useOpenRegisterFromNicovideoWithId();
  const openYoutubeRegisterModal = useOpenRegisterFromYoutube();
  const openBilibiliRegisterModal = useOpenRegisterFromBilibili();
  const openSoundcloudRegisterModal = useOpenSoundcloudRegisterModal();

  useEffect(
    () => {
      const e = schemaParams.safeParse({
        registerNicovideo: params.get("registerNicovideo"),
      });
      if (!e.success) return;

      const { data } = e;

      if ("registerNicovideo" in data)
        openNicovideoRegisterModal(data.registerNicovideo);
      else if ("registerYoutube" in data)
        openYoutubeRegisterModal(data.registerYoutube);
      else if ("registerBilibili" in data)
        openBilibiliRegisterModal(data.registerBilibili);
      else if ("registerSoundcloud" in data)
        openSoundcloudRegisterModal(data.registerSoundcloud);
      else if ("requestNicovideo" in data)
        openRequestFromNicovideo(data.requestNicovideo);
      else if ("requestYoutube" in data)
        openRequestFromYoutube(data.requestYoutube);
      else if ("requestSoundcloud" in data)
        openRequestFromSoundcloud(data.requestSoundcloud);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- paramsの変更だけを検知する
    [params]
  );

  return <></>;
};
