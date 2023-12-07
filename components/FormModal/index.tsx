"use client";

import clsx from "clsx";
import React, {
  ComponentProps,
  ReactNode,
  useContext,
  useReducer,
} from "react";

import NicovideoRegisterForm from "~/components/Form/NicovideoRegisterForm";
import { XMarkPictogram } from "~/components/Pictogram";
import { estimateUrl } from "~/utils/extractSourceId";

import RegisterMADFromBilibiliFormModal from "./RegisterMADFromBilibili";
import RegisterMADFromYoutubeFormModal from "./RegisterMADFromYoutube";
import RequestMADFromBilibiliFormModal from "./RequestMADFromBilibili";
import RequestMADFromNicovideoFormModal from "./RequestMADFromNicovideo";
import RequestMADFromSoundcloudFormModal from "./RequestMADFromSoundcloud";
import RequestMADFromYoutubeFormModal from "./RequestMADFromYoutube";
import SoundcloudRegisterModal from "./SoundcloudRegisterModal";

export type Current =
  | undefined
  | {
      type: "SOURCE_INPUT";
      init:
        | (Exclude<ReturnType<typeof estimateUrl>, null> & {
            r: "request" | "register";
          })
        | null;
    }
  | {
      type: "REGISTER_FROM_NICOVIDEO";
      props: Pick<
        ComponentProps<typeof NicovideoRegisterForm>,
        "sourceFragment" | "requestFragment"
      >;
    }
  | { type: "REGISTER_FROM_YOUTUBE"; sourceId: string | null }
  | { type: "REGISTER_FROM_BILIBILI"; sourceId: string | null }
  | { type: "REGISTER_FROM_SOUNDCLOUD"; url: string | null }
  | { type: "REQUEST_FROM_NICOVIDEO"; sourceId: string | null }
  | { type: "REQUEST_FROM_YOUTUBE"; sourceId: string | null }
  | { type: "REQUEST_FROM_SOUNDCLOUD"; url: string | null }
  | { type: "REQUEST_FROM_BILIBILI"; sourceId: string | null };

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

export const useOpenInput = () => {
  const { open } = useContext(FormModalContext);
  return (
    props?: Exclude<ReturnType<typeof estimateUrl>, null> & {
      r: "request" | "register";
    }
  ) =>
    open({
      type: "SOURCE_INPUT",
      init: props || null,
    });
};

/**
 * @deprecated
 */
export const useOpenRegisterFromNicovideo = () => {
  const { open } = useContext(FormModalContext);
  return (sourceId: string | null) =>
    open({
      type: "SOURCE_INPUT",
      init: sourceId ? { type: "nicovideo", sourceId, r: "register" } : null,
    });
};

/**
 * @deprecated
 */
export const useOpenRequestFromNicovideo = () => {
  const { open } = useContext(FormModalContext);
  return (sourceId: string | null) =>
    open({
      type: "SOURCE_INPUT",
      init: sourceId ? { type: "nicovideo", sourceId, r: "request" } : null,
    });
};

/**
 * @deprecated
 */
export const useOpenRegisterFromYoutube = () => {
  const { open } = useContext(FormModalContext);
  return (sourceId: string | null) =>
    open({ type: "REGISTER_FROM_YOUTUBE", sourceId });
};

/**
 * @deprecated
 */
export const useOpenRegisterFromBilibili = () => {
  const { open } = useContext(FormModalContext);
  return (sourceId: string | null) =>
    open({ type: "REGISTER_FROM_BILIBILI", sourceId });
};

/**
 * @deprecated
 */
export const useOpenSoundcloudRegisterModal = () => {
  const { open } = useContext(FormModalContext);
  return (url: string | null) =>
    open({ type: "REGISTER_FROM_SOUNDCLOUD", url });
};

/**
 * @deprecated
 */
export const useOpenRequestFromYoutube = () => {
  const { open } = useContext(FormModalContext);
  return (sourceId: string | null) =>
    open({ type: "REQUEST_FROM_YOUTUBE", sourceId });
};

/**
 * @deprecated
 */
export const useOpenRequestFromSoundcloud = () => {
  const { open } = useContext(FormModalContext);
  return (url: string | null) => open({ type: "REQUEST_FROM_SOUNDCLOUD", url });
};

/**
 * @deprecated
 */
export const useOpenRequestFromBilibili = () => {
  const { open } = useContext(FormModalContext);
  return (sourceId: string | null) =>
    open({ type: "REQUEST_FROM_BILIBILI", sourceId });
};

export const useOpenRegisterFromNicovideo2 = () => {
  const { open } = useContext(FormModalContext);
  return (
    props: Extract<Current, { type: "REGISTER_FROM_NICOVIDEO" }>["props"]
  ) =>
    open({
      type: "REGISTER_FROM_NICOVIDEO",
      props,
    });
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
    <div className={clsx(className, ["flex"])} style={style}>
      {current && (
        <div
          className={clsx(
            ["flex", "flex-col"],
            ["border", "border-slate-700", "rounded"]
          )}
        >
          <div
            className={clsx(
              ["flex", "items-center"],
              [["px-4"], ["py-2"]],
              ["bg-slate-800"],
              ["border-b", "border-slate-700"]
            )}
          >
            <span className={clsx(["text-slate-500", "text-xs", "font-bold"])}>
              {current.type === "REGISTER_FROM_NICOVIDEO" &&
                "ニコニコ動画から登録"}
              {current.type === "REGISTER_FROM_YOUTUBE" && "Youtubeから登録"}
              {current.type === "REGISTER_FROM_BILIBILI" &&
                "ビリビリ動画から登録"}
              {current.type === "REGISTER_FROM_SOUNDCLOUD" &&
                "SoundCloudから登録"}
              {current.type === "REQUEST_FROM_NICOVIDEO" &&
                "ニコニコ動画からリクエスト"}
              {current.type === "REQUEST_FROM_YOUTUBE" &&
                "YouTubeからリクエスト"}
              {current.type === "REQUEST_FROM_SOUNDCLOUD" &&
                "Soundcloudからリクエスト"}
              {current.type === "REQUEST_FROM_BILIBILI" &&
                "Bilibiliからリクエスト"}
            </span>
            <button
              type="button"
              className={clsx(
                ["ml-auto"],
                ["w-4", "h-4"],
                ["text-slate-500", "hover:text-slate-400"]
              )}
              onClick={(e) => {
                e.preventDefault();
                close();
              }}
            >
              <XMarkPictogram />
            </button>
          </div>
          <div className={clsx(["bg-slate-900"])}>
            {current.type === "REGISTER_FROM_NICOVIDEO" && (
              <NicovideoRegisterForm
                {...current.props}
                handleSuccess={() => close()}
                handleCancel={() => close()}
                style={{ width: 640, height: 720 }}
                className={clsx(["h-full"])}
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
                initialSourceId={current.url || undefined}
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
                initialSourceId={current.sourceId || undefined}
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
            {current.type === "REQUEST_FROM_BILIBILI" && (
              <RequestMADFromBilibiliFormModal
                initialSourceId={current.sourceId || undefined}
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
