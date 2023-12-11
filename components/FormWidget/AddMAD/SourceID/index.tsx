"use client";

import clsx from "clsx";
import React, { useMemo, useState } from "react";

import Button from "~/components/Button";
import { PlusPictogram, SearchPictogram } from "~/components/Pictogram";
import { TextInput2 } from "~/components/TextInput";
import { estimateUrl } from "~/utils/extractSourceId";

import {
  useOpenBilibiliRegisterForm,
  useOpenBilibiliRequestForm,
  useOpenNicovideoRegisterForm,
  useOpenNicovideoRequestForm,
  useOpenSoundcloudRegisterForm,
  useOpenSoundcloudRequestForm,
  useOpenYoutubeRegisterForm,
  useOpenYoutubeRequestForm,
} from "../..";
import { FormWrapper2 } from "../../FormWrapper";
import BilibiliConfirmForm from "./BilibiliConfirmForm";
import NicovideoConfirmForm from "./NicovideoConfirmForm";
import {
  SoundcloudConfirmFormBySourceId,
  SoundcloudConfirmFormByUrl,
} from "./SoundcloudConfirmForm";
import YoutubeConfirmForm from "./YoutubeConfirmForm";

type Props =
  | { type: "youtube"; sourceId: string }
  | { type: "nicovideo"; sourceId: string }
  | { type: "bilibili"; sourceId: string }
  | { type: "soundcloud"; url: string }
  | { type: "soundcloud"; sourceId: string };

export default function SourceIDForm({
  className,
  style,
  mode,
  initProp,
}: {
  className?: string;
  style?: React.CSSProperties;
  mode: "register" | "request";
  initProp?: Props;
}) {
  const openNicovideoRequest = useOpenNicovideoRequestForm();
  const openNicovideoRegister = useOpenNicovideoRegisterForm();

  const openYoutubeRequest = useOpenYoutubeRequestForm();
  const openYoutubeRegister = useOpenYoutubeRegisterForm();

  const openSoundcloudRequest = useOpenSoundcloudRequestForm();
  const openSoundcloudRegister = useOpenSoundcloudRegisterForm();

  const openBilibiliRequest = useOpenBilibiliRequestForm();
  const openBilibiliRegister = useOpenBilibiliRegisterForm();

  const [input, setInput] = useState<string>(
    initProp?.type === "soundcloud"
      ? "url" in initProp
        ? initProp.url
        : ""
      : initProp !== undefined
        ? initProp.sourceId
        : ""
  );
  const parsedInput = useMemo(() => estimateUrl(input), [input]);
  const [current, setCurrent] = useState<Props | undefined>(initProp);

  return (
    <FormWrapper2
      style={style}
      className={clsx(className)}
      Title={mode === "register" ? <>音MADの登録</> : <>音MADのリクエスト</>}
      Icon={PlusPictogram}
    >
      <div className={clsx("flex h-full flex-col gap-y-4")}>
        <form
          className={clsx("flex shrink-0 items-center gap-x-2")}
          onSubmit={(e) => {
            e.preventDefault();

            if (!parsedInput) return;
            setCurrent(parsedInput);
          }}
        >
          <TextInput2
            size="small"
            placeholder="ニコニコ動画やYouTube、Bilibiliの動画URLを入力"
            value={input}
            onChange={(s) => setInput(s)}
            className={clsx("w-full grow")}
          />
          <div className={clsx("flex shrink-0 justify-end")}>
            <Button
              submit
              color="blue"
              size="small"
              text="検索"
              Pictogram={SearchPictogram}
              disabled={parsedInput === null}
              className={clsx("shrink-0")}
            />
          </div>
        </form>
        {current?.type === "nicovideo" ? (
          <NicovideoConfirmForm
            sourceId={current.sourceId}
            type={mode}
            go={(p) => {
              switch (p.type) {
                case "register":
                  openNicovideoRegister({
                    sourceFragment: p.source,
                    requestFragment: p.request,
                  });
                  break;
                case "request":
                  openNicovideoRequest({
                    sourceFragment: p.source,
                  });
                  break;
              }
            }}
            handleCancel={() => setCurrent(undefined)}
            className={clsx("grow")}
          />
        ) : current?.type === "youtube" ? (
          <YoutubeConfirmForm
            sourceId={current.sourceId}
            type={mode}
            go={(p) => {
              switch (p.type) {
                case "register":
                  openYoutubeRegister({
                    sourceFragment: p.source,
                    requestFragment: p.request,
                  });
                  break;
                case "request":
                  openYoutubeRequest({
                    sourceFragment: p.source,
                  });
                  break;
              }
            }}
            handleCancel={() => setCurrent(undefined)}
            className={clsx("grow")}
          />
        ) : current?.type === "soundcloud" && "sourceId" in current ? (
          <SoundcloudConfirmFormBySourceId
            sourceId={current.sourceId}
            type={mode}
            go={(p) => {
              switch (p.type) {
                case "register":
                  openSoundcloudRegister({
                    sourceFragment: p.source,
                    requestFragment: p.request,
                  });
                  break;
                case "request":
                  openSoundcloudRequest({
                    sourceFragment: p.source,
                  });
                  break;
              }
            }}
            handleCancel={() => setCurrent(undefined)}
            className={clsx("grow")}
          />
        ) : current?.type === "soundcloud" && "url" in current ? (
          <SoundcloudConfirmFormByUrl
            url={current.url}
            type={mode}
            go={(p) => {
              switch (p.type) {
                case "register":
                  openSoundcloudRegister({
                    sourceFragment: p.source,
                    requestFragment: p.request,
                  });
                  break;
                case "request":
                  openSoundcloudRequest({
                    sourceFragment: p.source,
                  });
                  break;
              }
            }}
            handleCancel={() => setCurrent(undefined)}
            className={clsx("grow")}
          />
        ) : current?.type === "bilibili" ? (
          <BilibiliConfirmForm
            sourceId={current.sourceId}
            type={mode}
            go={(p) => {
              switch (p.type) {
                case "register":
                  openBilibiliRegister({
                    sourceFragment: p.source,
                  });
                  break;
                case "request":
                  openBilibiliRequest({
                    sourceFragment: p.source,
                  });
                  break;
              }
            }}
            handleCancel={() => setCurrent(undefined)}
            className={clsx("grow")}
          />
        ) : (
          <></>
        )}
      </div>
    </FormWrapper2>
  );
}
