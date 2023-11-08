"use client";

import "client-only";

import clsx from "clsx";
import React, { ReactNode, useContext, useReducer } from "react";

import Pictogram from "../Pictogram";
import RegisterMADFromBilibiliFormModal from "./RegisterMADFromBilibili";
import RegisterMADFromNicovideoFormModal from "./RegisterMADFromNicovideo";
import RegisterMADFromYoutubeFormModal from "./RegisterMADFromYoutube";
import RequestMADFromNicovideoFormModal from "./RequestMADFromNicovideo";
import RequestMADFromSoundcloudFormModal from "./RequestMADFromSoundcloud";
import RequestMADFromYoutubeFormModal from "./RequestMADFromYoutube";
import SoundcloudRegisterModal from "./SoundcloudRegisterModal";

export type Current =
  | undefined
  | { type: "REGISTER_FROM_NICOVIDEO" }
  | { type: "REGISTER_FROM_NICOVIDEO_WITH_ID"; sourceId: string }
  | { type: "REGISTER_FROM_YOUTUBE"; sourceId: string | null }
  | { type: "REGISTER_FROM_BILIBILI"; sourceId: string | null }
  | { type: "REGISTER_FROM_SOUNDCLOUD"; sourceId: string | null }
  | { type: "REQUEST_FROM_NICOVIDEO" }
  | { type: "REQUEST_FROM_NICOVIDEO_WITH_ID"; sourceId: string }
  | { type: "REQUEST_FROM_YOUTUBE"; sourceId: string | null }
  | { type: "REQUEST_FROM_SOUNDCLOUD"; url: string | null };

export const FormModalContext = React.createContext<{
  current: Current;
  open(t: Exclude<Current, undefined>): void;
  close(): void;
}>({
  current: undefined,
  open() {
    return;
  },
  close() {
    return;
  },
});

export const FormModalProvider: React.FC<{
  children: ReactNode;
  init?: Current;
}> = ({ children, init }) => {
  const [r, reducer] = useReducer(
    (
      _: Current,
      action:
        | { type: "close" }
        | { type: "open"; t: Exclude<Current, undefined> }
    ) => {
      switch (action.type) {
        case "close":
          return undefined;
        case "open":
          return action.t;
      }
    },
    init
  );

  return (
    <FormModalContext.Provider
      value={{
        current: r,
        open: (t) => reducer({ type: "open", t }),
        close: () => reducer({ type: "close" }),
      }}
    >
      {children}
    </FormModalContext.Provider>
  );
};

export const useOpenRegisterFromNicovideo = () => {
  const { open } = useContext(FormModalContext);
  return () => open({ type: "REGISTER_FROM_NICOVIDEO" });
};

export const useOpenRegisterFromNicovideoWithId = () => {
  const { open } = useContext(FormModalContext);
  return (s: string) =>
    open({ type: "REGISTER_FROM_NICOVIDEO_WITH_ID", sourceId: s });
};

export const useOpenRequestFromNicovideo = () => {
  const { open } = useContext(FormModalContext);
  return () => open({ type: "REQUEST_FROM_NICOVIDEO" });
};

export const useOpenRegisterFromYoutube = () => {
  const { open } = useContext(FormModalContext);
  return (sourceId: string | null) =>
    open({ type: "REGISTER_FROM_YOUTUBE", sourceId });
};

export const useOpenRegisterFromBilibili = () => {
  const { open } = useContext(FormModalContext);
  return (sourceId: string | null) =>
    open({ type: "REGISTER_FROM_BILIBILI", sourceId });
};

export const useOpenSoundcloudRegisterModal = () => {
  const { open } = useContext(FormModalContext);
  return (sourceId: string | null) =>
    open({ type: "REGISTER_FROM_SOUNDCLOUD", sourceId });
};

export const useOpenRequestFromNicovideoWithID = () => {
  const { open } = useContext(FormModalContext);
  return (sourceId: string) =>
    open({ type: "REQUEST_FROM_NICOVIDEO_WITH_ID", sourceId });
};

export const useOpenRequestFromYoutube = () => {
  const { open } = useContext(FormModalContext);
  return (sourceId: string | null) =>
    open({ type: "REQUEST_FROM_YOUTUBE", sourceId });
};

export const useOpenRequestFromSoundcloud = () => {
  const { open } = useContext(FormModalContext);
  return (sourceId: string | null) =>
    open({ type: "REQUEST_FROM_SOUNDCLOUD", url: sourceId });
};

export const useCloseFormModal = () => {
  const { close } = useContext(FormModalContext);
  return close;
};

export default function FormModal({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { current } = useContext(FormModalContext);
  const close = useCloseFormModal();

  return (
    <div className={clsx(className, "flex")} style={style}>
      {current && (
        <div
          className={clsx(["flex flex-col rounded border border-slate-700"])}
        >
          <div
            className={clsx(
              ["flex items-center"],
              [["px-4 py-2"]],
              ["border-b border-slate-700 bg-slate-800"]
            )}
          >
            <span className={clsx("text-xs font-bold text-slate-500")}>
              {(current.type === "REGISTER_FROM_NICOVIDEO" ||
                current.type === "REGISTER_FROM_NICOVIDEO_WITH_ID") &&
                "ニコニコ動画から登録"}
              {current.type === "REGISTER_FROM_YOUTUBE" && "Youtubeから登録"}
              {current.type === "REGISTER_FROM_BILIBILI" &&
                "ビリビリ動画から登録"}
              {current.type === "REGISTER_FROM_SOUNDCLOUD" &&
                "SoundCloudから登録"}
              {(current.type === "REQUEST_FROM_NICOVIDEO" ||
                current.type === "REQUEST_FROM_NICOVIDEO_WITH_ID") &&
                "ニコニコ動画からリクエスト"}
              {current.type === "REQUEST_FROM_YOUTUBE" &&
                "YouTubeからリクエスト"}
              {current.type === "REQUEST_FROM_SOUNDCLOUD" &&
                "Soundcloudからリクエスト"}
            </span>
            <button
              type="button"
              className={clsx([
                "ml-auto h-4 w-4 text-slate-500 hover:text-slate-400",
              ])}
              onClick={(e) => {
                e.preventDefault();
                close();
              }}
            >
              <Pictogram icon="x" />
            </button>
          </div>
          <div className={clsx("bg-slate-900")}>
            {current.type === "REGISTER_FROM_NICOVIDEO" && (
              <RegisterMADFromNicovideoFormModal
                className={clsx()}
                style={{ width: 640, height: 720 }}
                handleSuccess={() => {
                  close();
                }}
              />
            )}
            {current.type === "REGISTER_FROM_NICOVIDEO_WITH_ID" && (
              <RegisterMADFromNicovideoFormModal
                initialSourceId={current.sourceId}
                className={clsx()}
                style={{ width: 640, height: 720 }}
                handleSuccess={() => {
                  close();
                }}
              />
            )}
            {current.type === "REGISTER_FROM_BILIBILI" && (
              <RegisterMADFromBilibiliFormModal
                initialSourceId={current.sourceId || undefined}
                className={clsx()}
                style={{ width: 640, height: 720 }}
                handleSuccess={() => {
                  close();
                }}
              />
            )}
            {current.type === "REGISTER_FROM_SOUNDCLOUD" && (
              <SoundcloudRegisterModal
                initialSourceId={current.sourceId || undefined}
                className={clsx()}
                style={{ width: 640, height: 720 }}
                handleSuccess={() => {
                  close();
                }}
              />
            )}
            {current.type === "REGISTER_FROM_YOUTUBE" && (
              <RegisterMADFromYoutubeFormModal
                initialSourceId={current.sourceId || undefined}
                className={clsx()}
                style={{ width: 640, height: 720 }}
                handleSuccess={() => {
                  close();
                }}
              />
            )}
            {current.type === "REQUEST_FROM_NICOVIDEO" && (
              <RequestMADFromNicovideoFormModal
                className={clsx()}
                style={{ width: 640, height: 720 }}
                handleSuccess={() => {
                  close();
                }}
              />
            )}
            {current.type === "REQUEST_FROM_NICOVIDEO_WITH_ID" && (
              <RequestMADFromNicovideoFormModal
                initialSourceId={current.sourceId}
                className={clsx()}
                style={{ width: 640, height: 720 }}
                handleSuccess={() => {
                  close();
                }}
              />
            )}
            {current.type === "REQUEST_FROM_YOUTUBE" && (
              <RequestMADFromYoutubeFormModal
                initialSourceId={current.sourceId || undefined}
                className={clsx()}
                style={{ width: 640, height: 720 }}
                handleSuccess={() => {
                  close();
                }}
              />
            )}
            {current.type === "REQUEST_FROM_SOUNDCLOUD" && (
              <RequestMADFromSoundcloudFormModal
                initialUrl={current.url || undefined}
                className={clsx()}
                style={{ width: 640, height: 720 }}
                handleSuccess={() => {
                  close();
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
