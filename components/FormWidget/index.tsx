"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, {
  ComponentProps,
  ReactNode,
  useContext,
  useReducer,
} from "react";

import BilibiliRegisterForm from "./AddMAD/Bilibili/BilibiliRegisterForm";
import BilibiliRequestForm from "./AddMAD/Bilibili/BilibiliRequestForm";
import NicovideoRegisterForm from "./AddMAD/Nicovideo/NicovideoRegisterForm";
import NicovideoRequestForm from "./AddMAD/Nicovideo/NicovideoRequestForm";
import SoundcloudRegisterForm from "./AddMAD/Soundcloud/SoundcloudRegisterForm";
import SoundcloudRequestForm from "./AddMAD/Soundcloud/SoundcloudRequestForm";
import SourceIDForm from "./AddMAD/SourceID";
import YoutubeRegisterForm from "./AddMAD/Youtube/YoutubeRegisterForm";
import YoutubeRequestForm from "./AddMAD/Youtube/YoutubeRequestForm";
import TagCategorizerForm from "./TagCategorizer";

export type Current =
  | undefined
  | {
      type: "SOURCE_INPUT";
      mode: ComponentProps<typeof SourceIDForm>["mode"];
      init?: ComponentProps<typeof SourceIDForm>["initProp"];
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
        "sourceFragment" | "requestFragment"
      >;
    }
  | {
      type: "REGISTER_FROM_SOUNDCLOUD";
      props: Pick<
        ComponentProps<typeof SoundcloudRegisterForm>,
        "sourceFragment" | "requestFragment"
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
    }
  | {
      type: "CATEGORIZE_TAG";
      props: { tagId: string };
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
    mode: "request" | "register",
    init?: Extract<Current, { type: "SOURCE_INPUT" }>["init"]
  ) =>
    open({
      type: "SOURCE_INPUT",
      mode,
      init,
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
      mode: "register",
      init: sourceId ? { type: "nicovideo", sourceId } : undefined,
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
      mode: "request",
      init: sourceId ? { type: "nicovideo", sourceId } : undefined,
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
      mode: "register",
      init: sourceId ? { type: "youtube", sourceId } : undefined,
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
      mode: "register",
      init: sourceId ? { type: "bilibili", sourceId } : undefined,
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
      mode: "register",
      init: url ? { type: "soundcloud", url } : undefined,
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
      mode: "request",
      init: sourceId ? { type: "youtube", sourceId } : undefined,
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
      mode: "request",
      init: url ? { type: "soundcloud", url } : undefined,
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
      mode: "request",
      init: sourceId ? { type: "bilibili", sourceId } : undefined,
    });
};

export const useOpenNicovideoRegisterForm = () => {
  const { open } = useContext(FormModalContext);
  return (
    props: Extract<Current, { type: "REGISTER_FROM_NICOVIDEO" }>["props"]
  ) =>
    open({
      type: "REGISTER_FROM_NICOVIDEO",
      props,
    });
};

export const useOpenNicovideoRequestForm = () => {
  const { open } = useContext(FormModalContext);
  return (
    props: Extract<Current, { type: "REQUEST_FROM_NICOVIDEO" }>["props"]
  ) =>
    open({
      type: "REQUEST_FROM_NICOVIDEO",
      props,
    });
};

export const useOpenYoutubeRegisterForm = () => {
  const { open } = useContext(FormModalContext);
  return (
    props: Extract<Current, { type: "REGISTER_FROM_YOUTUBE" }>["props"]
  ) =>
    open({
      type: "REGISTER_FROM_YOUTUBE",
      props,
    });
};

export const useOpenYoutubeRequestForm = () => {
  const { open } = useContext(FormModalContext);
  return (props: Extract<Current, { type: "REQUEST_FROM_YOUTUBE" }>["props"]) =>
    open({
      type: "REQUEST_FROM_YOUTUBE",
      props,
    });
};

export const useOpenSoundcloudRegisterForm = () => {
  const { open } = useContext(FormModalContext);
  return (
    props: Extract<Current, { type: "REGISTER_FROM_SOUNDCLOUD" }>["props"]
  ) =>
    open({
      type: "REGISTER_FROM_SOUNDCLOUD",
      props,
    });
};

export const useOpenSoundcloudRequestForm = () => {
  const { open } = useContext(FormModalContext);
  return (
    props: Extract<Current, { type: "REQUEST_FROM_SOUNDCLOUD" }>["props"]
  ) =>
    open({
      type: "REQUEST_FROM_SOUNDCLOUD",
      props,
    });
};

export const useOpenBilibiliRegisterForm = () => {
  const { open } = useContext(FormModalContext);
  return (
    props: Extract<Current, { type: "REGISTER_FROM_BILIBILI" }>["props"]
  ) =>
    open({
      type: "REGISTER_FROM_BILIBILI",
      props,
    });
};

export const useOpenBilibiliRequestForm = () => {
  const { open } = useContext(FormModalContext);
  return (
    props: Extract<Current, { type: "REQUEST_FROM_BILIBILI" }>["props"]
  ) =>
    open({
      type: "REQUEST_FROM_BILIBILI",
      props,
    });
};

export const useOpenTagCategorizerForm = () => {
  const { open } = useContext(FormModalContext);
  return (props: Extract<Current, { type: "CATEGORIZE_TAG" }>["props"]) =>
    open({
      type: "CATEGORIZE_TAG",
      props,
    });
};

export const useCloseFormWidget = () => {
  const { close } = useContext(FormModalContext);
  return close;
};

export default function FormWidgetSwitch({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { current } = useContext(FormModalContext);
  const close = useCloseFormWidget();
  const router = useRouter();

  return (
    <div className={clsx(className, "flex")} style={style}>
      {current?.type === "SOURCE_INPUT" ? (
        <SourceIDForm
          className={clsx("min-h-[480px] w-[640px]")}
          mode={current.mode}
          initProp={current.init}
        />
      ) : current?.type === "REGISTER_FROM_NICOVIDEO" ? (
        <NicovideoRegisterForm
          {...current.props}
          handleSuccess={() => close()}
          handleCancel={() => close()}
          className={clsx("min-h-[720px] w-[640px]")}
        />
      ) : current?.type === "REQUEST_FROM_NICOVIDEO" ? (
        <NicovideoRequestForm
          {...current.props}
          className={clsx("min-h-[720px] w-[640px]")}
          handleSuccess={() => {
            close();
          }}
          handleCancel={() => close()}
        />
      ) : current?.type === "REGISTER_FROM_BILIBILI" ? (
        <BilibiliRegisterForm
          {...current.props}
          className={clsx("min-h-[720px] w-[640px]")}
          handleSuccess={() => {
            close();
          }}
          handleCancel={() => close()}
        />
      ) : current?.type === "REQUEST_FROM_BILIBILI" ? (
        <BilibiliRequestForm
          {...current.props}
          className={clsx("min-h-[720px] w-[640px]")}
          handleSuccess={() => {
            close();
          }}
          handleCancel={() => close()}
        />
      ) : current?.type === "REGISTER_FROM_YOUTUBE" ? (
        <YoutubeRegisterForm
          {...current.props}
          className={clsx("min-h-[720px] w-[640px]")}
          handleSuccess={() => {
            close();
          }}
          handleCancel={() => close()}
        />
      ) : current?.type === "REQUEST_FROM_YOUTUBE" ? (
        <YoutubeRequestForm
          {...current.props}
          className={clsx("min-h-[720px] w-[640px]")}
          handleSuccess={() => {
            close();
          }}
          handleCancel={() => close()}
        />
      ) : current?.type === "REQUEST_FROM_SOUNDCLOUD" ? (
        <SoundcloudRequestForm
          {...current.props}
          className={clsx("min-h-[720px] w-[640px]")}
          handleSuccess={() => {
            close();
          }}
          handleCancel={() => close()}
        />
      ) : current?.type === "REGISTER_FROM_SOUNDCLOUD" ? (
        <SoundcloudRegisterForm
          {...current.props}
          className={clsx("min-h-[720px] w-[640px]")}
          handleSuccess={() => {
            close();
          }}
          handleCancel={() => close()}
        />
      ) : current?.type === "CATEGORIZE_TAG" ? (
        <TagCategorizerForm
          className={clsx("min-h-[360px] w-[640px]")}
          closeMe={() => {
            close();
            router.refresh();
          }}
          tagId={current.props.tagId}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
