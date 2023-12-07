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

import BilibiliRegisterForm from "../Form/BilibiliRegisterForm";
import BilibiliRequestForm from "../Form/BilibiliRequestForm";
import NicovideoRequestForm from "../Form/NicovideoRequestForm";
import SoundcloudRegisterForm from "../Form/SoundcloudRegisterForm";
import SoundcloudRequestForm from "../Form/SoundcloudRequestForm";
import YoutubeRegisterForm from "../Form/YoutubeRegisterForm";
import YoutubeRequestForm from "../Form/YoutubeRequestForm";

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
  | {
      type: "REGISTER_FROM_YOUTUBE";
      props: Pick<
        ComponentProps<typeof YoutubeRegisterForm>,
        "sourceFragment" | "requestFragment"
      >;
    }
  | {
      type: "REGISTER_FROM_BILIBILI";
      props: Pick<
        ComponentProps<typeof BilibiliRegisterForm>,
        "sourceFragment"
      >;
    }
  | {
      type: "REGISTER_FROM_SOUNDCLOUD";
      props: Pick<
        ComponentProps<typeof SoundcloudRegisterForm>,
        "sourceFragment"
      >;
    }
  | {
      type: "REQUEST_FROM_NICOVIDEO";
      props: Pick<
        ComponentProps<typeof NicovideoRequestForm>,
        "sourceFragment"
      >;
    }
  | {
      type: "REQUEST_FROM_YOUTUBE";
      props: Pick<ComponentProps<typeof YoutubeRequestForm>, "sourceFragment">;
    }
  | {
      type: "REQUEST_FROM_SOUNDCLOUD";
      props: Pick<
        ComponentProps<typeof SoundcloudRequestForm>,
        "sourceFragment"
      >;
    }
  | {
      type: "REQUEST_FROM_BILIBILI";
      props: Pick<ComponentProps<typeof BilibiliRequestForm>, "sourceFragment">;
    };

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
    open({
      type: "SOURCE_INPUT",
      init: sourceId ? { type: "youtube", sourceId, r: "register" } : null,
    });
};

/**
 * @deprecated
 */
export const useOpenRegisterFromBilibili = () => {
  const { open } = useContext(FormModalContext);
  return (sourceId: string | null) =>
    open({
      type: "SOURCE_INPUT",
      init: sourceId ? { type: "bilibili", sourceId, r: "register" } : null,
    });
};

/**
 * @deprecated
 */
export const useOpenSoundcloudRegisterModal = () => {
  const { open } = useContext(FormModalContext);
  return (url: string | null) =>
    open({
      type: "SOURCE_INPUT",
      init: url ? { type: "soundcloud", url, r: "register" } : null,
    });
};

/**
 * @deprecated
 */
export const useOpenRequestFromYoutube = () => {
  const { open } = useContext(FormModalContext);
  return (sourceId: string | null) =>
    open({
      type: "SOURCE_INPUT",
      init: sourceId ? { type: "youtube", sourceId, r: "register" } : null,
    });
};

/**
 * @deprecated
 */
export const useOpenRequestFromSoundcloud = () => {
  const { open } = useContext(FormModalContext);
  return (url: string | null) =>
    open({
      type: "SOURCE_INPUT",
      init: url ? { type: "soundcloud", url, r: "request" } : null,
    });
};

/**
 * @deprecated
 */
export const useOpenRequestFromBilibili = () => {
  const { open } = useContext(FormModalContext);
  return (sourceId: string | null) =>
    open({
      type: "SOURCE_INPUT",
      init: sourceId ? { type: "bilibili", sourceId, r: "register" } : null,
    });
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
export const useOpenRegisterFromYoutube2 = () => {
  const { open } = useContext(FormModalContext);
  return (
    props: Extract<Current, { type: "REGISTER_FROM_YOUTUBE" }>["props"]
  ) =>
    open({
      type: "REGISTER_FROM_YOUTUBE",
      props,
    });
};
export const useOpenRegisterFromSoundcloud2 = () => {
  const { open } = useContext(FormModalContext);
  return (
    props: Extract<Current, { type: "REGISTER_FROM_SOUNDCLOUD" }>["props"]
  ) =>
    open({
      type: "REGISTER_FROM_SOUNDCLOUD",
      props,
    });
};
export const useOpenRegisterFromBilibili2 = () => {
  const { open } = useContext(FormModalContext);
  return (
    props: Extract<Current, { type: "REGISTER_FROM_BILIBILI" }>["props"]
  ) =>
    open({
      type: "REGISTER_FROM_BILIBILI",
      props,
    });
};

export const useOpenRequestFromNicovideo2 = () => {
  const { open } = useContext(FormModalContext);
  return (
    props: Extract<Current, { type: "REQUEST_FROM_NICOVIDEO" }>["props"]
  ) =>
    open({
      type: "REQUEST_FROM_NICOVIDEO",
      props,
    });
};
export const useOpenRequestFromYoutube2 = () => {
  const { open } = useContext(FormModalContext);
  return (props: Extract<Current, { type: "REQUEST_FROM_YOUTUBE" }>["props"]) =>
    open({
      type: "REQUEST_FROM_YOUTUBE",
      props,
    });
};
export const useOpenRequestFromSoundcloud2 = () => {
  const { open } = useContext(FormModalContext);
  return (
    props: Extract<Current, { type: "REQUEST_FROM_SOUNDCLOUD" }>["props"]
  ) =>
    open({
      type: "REQUEST_FROM_SOUNDCLOUD",
      props,
    });
};
export const useOpenRequestFromBilibili2 = () => {
  const { open } = useContext(FormModalContext);
  return (
    props: Extract<Current, { type: "REQUEST_FROM_BILIBILI" }>["props"]
  ) =>
    open({
      type: "REQUEST_FROM_BILIBILI",
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
              <BilibiliRegisterForm
                {...current.props}
                className={clsx()}
                style={{ width: 640, height: 720 }}
                handleSuccess={() => {
                  close();
                }}
                handleCancel={() => close()}
              />
            )}
            {current.type === "REGISTER_FROM_SOUNDCLOUD" && (
              <SoundcloudRegisterForm
                {...current.props}
                className={clsx()}
                style={{ width: 640, height: 720 }}
                handleSuccess={() => {
                  close();
                }}
                handleCancel={() => close()}
              />
            )}
            {current.type === "REGISTER_FROM_YOUTUBE" && (
              <YoutubeRegisterForm
                {...current.props}
                className={clsx()}
                style={{ width: 640, height: 720 }}
                handleSuccess={() => {
                  close();
                }}
                handleCancel={() => close()}
              />
            )}
            {current.type === "REQUEST_FROM_NICOVIDEO" && (
              <NicovideoRequestForm
                className={clsx()}
                {...current.props}
                style={{ width: 640, height: 720 }}
                handleSuccess={() => {
                  close();
                }}
                handleCancel={() => close()}
              />
            )}
            {current.type === "REQUEST_FROM_YOUTUBE" && (
              <YoutubeRequestForm
                {...current.props}
                className={clsx()}
                style={{ width: 640, height: 720 }}
                handleSuccess={() => {
                  close();
                }}
                handleCancel={() => close()}
              />
            )}
            {current.type === "REQUEST_FROM_SOUNDCLOUD" && (
              <SoundcloudRequestForm
                {...current.props}
                className={clsx()}
                style={{ width: 640, height: 720 }}
                handleSuccess={() => {
                  close();
                }}
                handleCancel={() => close()}
              />
            )}
            {current.type === "REQUEST_FROM_BILIBILI" && (
              <BilibiliRequestForm
                {...current.props}
                className={clsx()}
                style={{ width: 640, height: 720 }}
                handleSuccess={() => {
                  close();
                }}
                handleCancel={() => close()}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
