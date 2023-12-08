"use client";

import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";
import { useQuery } from "urql";

import Button from "~/components/Button";
import CommonMadBlock from "~/components/CommonMadBlock";
import { CoolImage2 } from "~/components/CoolImage";
import {
  ExternalLinkPictogram,
  LoadingPictogram,
  NotFoundPictogram,
  PlusPictogram,
  SearchPictogram,
} from "~/components/Pictogram";
import { TextInput2 } from "~/components/TextInput";
import { FragmentType, graphql, useFragment } from "~/gql";
import { estimateUrl } from "~/utils/extractSourceId";

import { RequestPageLinkSwitch } from "../../RequestPageLinkSwitch";
import {
  useOpenBilibiliRegisterForm,
  useOpenBilibiliRequestForm,
  useOpenNicovideoRegisterForm,
  useOpenNicovideoRequestForm,
  useOpenSoundcloudRegisterForm,
  useOpenSoundcloudRequestForm,
  useOpenYoutubeRegisterForm,
  useOpenYoutubeRequestForm,
} from "..";
import { FormWrapper } from "../FormWrapper";
import {
  BilibiliRegisterFormRequestFragment,
  BilibiliRegisterOriginalSourceFragment,
} from "./Bilibili/BilibiliRegisterForm";
import { BilibiliRequestFormOriginalSourceFragment } from "./Bilibili/BilibiliRequestForm";
import {
  NicovideoRegisterFormRequestFragment,
  NicovideoRegisterOriginalSourceFragment,
} from "./Nicovideo/NicovideoRegisterForm";
import { NicovideoRequestFormOriginalSourceFragment } from "./Nicovideo/NicovideoRequestForm";
import {
  SoundcloudRegisterFormRequestFragment,
  SoundcloudRegisterOriginalSourceFragment,
} from "./Soundcloud/SoundcloudRegisterForm";
import { SoundcloudRequestFormOriginalSourceFragment } from "./Soundcloud/SoundcloudRequestForm";
import {
  YoutubeRegisterFormRequestFragment,
  YoutubeRegisterOriginalSourceFragment,
} from "./Youtube/YoutubeRegisterForm";
import { YoutubeRequestFormOriginalSourceFragment } from "./Youtube/YoutubeRequestForm";

export const AlreadyRegisteredFragment = graphql(`
  fragment InputSourceForm_AlreadyRegistered on VideoSource {
    sourceId
    video {
      id
      ...CommonMadBlock
    }
  }
`);
export const AlreadyRegistered = ({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof AlreadyRegisteredFragment>;
}) => {
  const { video } = useFragment(AlreadyRegisteredFragment, props.fragment);

  return (
    <div className={clsx(className, "flex flex-col gap-y-2")} style={style}>
      <p className={clsx("text-sm font-bold text-snow-primary")}>
        既に登録済みです
      </p>
      <CommonMadBlock fragment={video} size="small" />
    </div>
  );
};

export const AlreadyRequestedFragment = graphql(`
  fragment InputSourceForm_AlreadyRequested on RegistrationRequest {
    title
    thumbnailUrl
    ...RequestLinkSwitch
  }
`);
export const AlreadyRequested = ({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof AlreadyRequestedFragment>;
}) => {
  const f = useFragment(AlreadyRequestedFragment, props.fragment);
  const { thumbnailUrl, title } = f;

  return (
    <div className={clsx(className, "flex flex-col gap-y-2")} style={style}>
      <p className={clsx("text-sm font-bold text-snow-primary")}>
        既にリクエスト済みです
      </p>
      <div
        className={clsx(
          "overflow-hidden rounded border border-obsidian-lighter bg-obsidian-primary"
        )}
      >
        <RequestPageLinkSwitch fragment={f} className={clsx("block")}>
          <CoolImage2
            width={96}
            height={64}
            alt={title}
            src={thumbnailUrl}
            className={clsx("h-32")}
          />
        </RequestPageLinkSwitch>
        <div className={clsx("flex flex-col gap-y-2 p-2")}>
          <RequestPageLinkSwitch
            fragment={f}
            className={clsx(
              "line-clamp-1 text-xs font-bold text-snow-primary hover:text-vivid-primary hover:underline"
            )}
          >
            {f.title}
          </RequestPageLinkSwitch>
        </div>
      </div>
    </div>
  );
};

const SubmitButton = ({
  className,
  type,
  disabled,
}: {
  className?: string;
  type: "request" | "register";
  disabled: boolean;
}) => {
  return (
    <Button
      submit
      color="green"
      size="medium"
      text={type === "request" ? "リクエストする" : "登録する"}
      Pictogram={SearchPictogram}
      disabled={disabled}
      className={clsx(className)}
    />
  );
};

export const queryFetchNicovideo = graphql(`
  query SourceIDForm_Nicovideo($sourceId: String!) {
    findNicovideoVideoSource(input: { sourceId: $sourceId }) {
      id
      ...InputSourceForm_AlreadyRegistered
    }
    findNicovideoRegistrationRequest(input: { sourceId: $sourceId }) {
      id
      ...InputSourceForm_AlreadyRequested
      ...RegisterFromNicovideoForm_Request
    }
    fetchNicovideo(input: { sourceId: $sourceId }) {
      source {
        sourceId
        url
        info {
          title
          thumbnailUrl
        }
        ...NicovideoForm_OriginalSource2
        ...NicovideoRequestForm_OriginalSource
      }
    }
  }
`);
export const NicovideoConfirmForm = ({
  className,
  style,
  go,
  type,
  sourceId,
  handleCancel,
}: {
  className?: string;
  style?: React.CSSProperties;
  sourceId: string;
  handleCancel(): void;
  type: "register" | "request";
  go(
    p:
      | {
          type: "register";
          request:
            | FragmentType<typeof NicovideoRegisterFormRequestFragment>
            | undefined;
          source: FragmentType<typeof NicovideoRegisterOriginalSourceFragment>;
        }
      | {
          type: "request";
          source: FragmentType<
            typeof NicovideoRequestFormOriginalSourceFragment
          >;
        }
  ): void;
}) => {
  const [{ fetching, data }] = useQuery({
    query: queryFetchNicovideo,
    variables: { sourceId },
  });
  const enable = useMemo(() => {
    if (!data) return false;
    switch (type) {
      case "register":
        return (
          !data.findNicovideoVideoSource && data.fetchNicovideo.source !== null
        );
      case "request":
        return (
          !data.findNicovideoRegistrationRequest &&
          data.fetchNicovideo.source !== null
        );
    }
  }, [data, type]);

  const handle = useCallback(() => {
    if (!data?.fetchNicovideo.source) return;

    switch (type) {
      case "register":
        go({
          type: "register",
          request: data.findNicovideoRegistrationRequest || undefined,
          source: data.fetchNicovideo.source,
        });
        break;
      case "request":
        go({
          type: "request",
          source: data.fetchNicovideo.source,
        });
        break;
    }
  }, [data, go, type]);

  return (
    <form
      className={clsx(className, "flex flex-col gap-y-4")}
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
        handle();
      }}
    >
      <div className={clsx("grow")}>
        {data?.findNicovideoVideoSource ? (
          <AlreadyRegistered fragment={data.findNicovideoVideoSource} />
        ) : type === "request" && data?.findNicovideoRegistrationRequest ? (
          <AlreadyRequested fragment={data.findNicovideoRegistrationRequest} />
        ) : data?.fetchNicovideo.source ? (
          <div className={clsx("flex gap-x-4")}>
            <div className={clsx("shrink-0")}>
              <CoolImage2
                src={data.fetchNicovideo.source.info.thumbnailUrl}
                alt={data.fetchNicovideo.source.info.title}
                width={96}
                height={64}
                className={clsx("h-[64px] w-[96px]")}
                unoptimized={true}
              />
            </div>
            <div
              className={clsx(
                "flex grow flex-col gap-y-1 border border-obsidian-primary bg-obsidian-darkest px-4 py-2"
              )}
            >
              <p className={clsx("text-sm text-snow-primary")}>
                {data.fetchNicovideo.source.info.title}
              </p>
              <p>
                <a
                  href={data.fetchNicovideo.source.url}
                  className={clsx(
                    "inline-flex items-center gap-x-1 font-mono text-xs text-snow-darker hover:text-vivid-primary"
                  )}
                >
                  <ExternalLinkPictogram className={clsx("h-4 w-4")} />
                  {data.fetchNicovideo.source.sourceId}
                </a>
              </p>
            </div>
          </div>
        ) : fetching ? (
          <div
            className={clsx(
              "flex items-center gap-x-2 text-sm text-snow-darker"
            )}
          >
            <LoadingPictogram className={clsx("h-4 w-4")} />
            <div>ニコニコ動画から検索中</div>
          </div>
        ) : (
          <div
            className={clsx(
              "flex items-center gap-x-2 text-sm text-error-primary"
            )}
          >
            <NotFoundPictogram className={clsx("h-4 w-4")} />
            <div className={clsx("font-bold")}>
              ニコニコ動画から情報を取得できませんでした。
            </div>
          </div>
        )}
      </div>
      <div className={clsx("flex shrink-0 justify-between gap-x-2")}>
        <SubmitButton type={type} disabled={!enable} />
        <Button
          className={clsx()}
          onClick={() => {
            handleCancel();
          }}
          text="取り消す"
          size="medium"
          color="red"
        />
      </div>
    </form>
  );
};

export const queryFetchYoutube = graphql(`
  query InputIDForm_Youtube($sourceId: String!) {
    findYoutubeVideoSource(input: { sourceId: $sourceId }) {
      id
      ...InputSourceForm_AlreadyRegistered
    }
    findYoutubeRegistrationRequest(input: { sourceId: $sourceId }) {
      id
      ...InputSourceForm_AlreadyRequested
      ...RegisterFromYoutubeForm_Request
    }
    fetchYoutube(input: { sourceId: $sourceId }) {
      source {
        thumbnailUrl
        url
        sourceId
        ...YoutubeForm_OriginalSource2
        ...YoutubeRequestForm_OriginalSource
      }
    }
  }
`);
export const YoutubeConfirmForm = ({
  className,
  style,
  go,
  type,
  sourceId,
  handleCancel,
}: {
  className?: string;
  style?: React.CSSProperties;
  handleCancel(): void;
  sourceId: string;
  type: "register" | "request";
  go(
    p:
      | {
          type: "register";
          request:
            | FragmentType<typeof YoutubeRegisterFormRequestFragment>
            | undefined;
          source: FragmentType<typeof YoutubeRegisterOriginalSourceFragment>;
        }
      | {
          type: "request";
          source: FragmentType<typeof YoutubeRequestFormOriginalSourceFragment>;
        }
  ): void;
}) => {
  const [{ fetching, data }] = useQuery({
    query: queryFetchYoutube,
    variables: { sourceId },
  });
  const enable = useMemo(() => {
    if (!data) return false;
    switch (type) {
      case "register":
        return (
          !data.findYoutubeVideoSource && data.fetchYoutube.source !== null
        );
      case "request":
        return (
          !data.findYoutubeRegistrationRequest &&
          data.fetchYoutube.source !== null
        );
    }
  }, [data, type]);

  const handle = useCallback(() => {
    if (!data?.fetchYoutube.source) return;

    switch (type) {
      case "register":
        go({
          type: "register",
          request: data.findYoutubeRegistrationRequest || undefined,
          source: data.fetchYoutube.source,
        });
        break;
      case "request":
        go({
          type: "request",
          source: data.fetchYoutube.source,
        });
        break;
    }
  }, [data, go, type]);

  return (
    <form
      className={clsx(className, "flex flex-col gap-y-4")}
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
        handle();
      }}
    >
      <div className={clsx("grow")}>
        {data?.findYoutubeVideoSource ? (
          <AlreadyRegistered fragment={data.findYoutubeVideoSource} />
        ) : type === "request" && data?.findYoutubeRegistrationRequest ? (
          <AlreadyRequested fragment={data.findYoutubeRegistrationRequest} />
        ) : data?.fetchYoutube.source ? (
          <div className={clsx("flex gap-x-4")}>
            <div className={clsx("shrink-0")}>
              <CoolImage2
                src={data.fetchYoutube.source.thumbnailUrl}
                alt={data.fetchYoutube.source.thumbnailUrl}
                width={96}
                height={64}
                className={clsx("h-[64px] w-[96px]")}
                unoptimized={true}
              />
            </div>
            <div
              className={clsx(
                "flex grow flex-col gap-y-1 border border-obsidian-primary bg-obsidian-darkest px-4 py-2"
              )}
            >
              <p>
                <a
                  href={data.fetchYoutube.source.url}
                  className={clsx(
                    "inline-flex items-center gap-x-1 font-mono text-xs text-snow-darker hover:text-vivid-primary"
                  )}
                >
                  <ExternalLinkPictogram className={clsx("h-4 w-4")} />
                  {data.fetchYoutube.source.sourceId}
                </a>
              </p>
            </div>
          </div>
        ) : fetching ? (
          <div
            className={clsx(
              "flex items-center gap-x-2 text-sm text-snow-darker"
            )}
          >
            <LoadingPictogram className={clsx("h-4 w-4")} />
            <div>Youtubeから検索中</div>
          </div>
        ) : (
          <div
            className={clsx(
              "flex items-center gap-x-2 text-sm text-error-primary"
            )}
          >
            <NotFoundPictogram className={clsx("h-4 w-4")} />
            <div className={clsx("font-bold")}>
              Youtubeから情報を取得できませんでした。
            </div>
          </div>
        )}
      </div>
      <div className={clsx("flex shrink-0 justify-between gap-x-2")}>
        <SubmitButton type={type} disabled={!enable} />
        <Button
          className={clsx()}
          onClick={() => {
            handleCancel();
          }}
          text="取り消す"
          size="medium"
          color="red"
        />
      </div>
    </form>
  );
};

export const queryFetchSoundcloud = graphql(`
  query SourceIDForm_Soundcloud($url: String!) {
    findSoundcloudMADSource(input: { url: $url }) {
      id
      ...InputSourceForm_AlreadyRegistered
    }
    findSoundcloudRegistrationRequestByUrl(url: $url) {
      id
      ...InputSourceForm_AlreadyRequested
      ...RegisterFromSoundcloudForm_Request
    }
    fetchSoundcloud(input: { url: $url }) {
      source {
        title
        sourceId
        originalThumbnailUrl
        url
        ...SoundcloudForm_OriginalSource2
        ...SoundcloudRequestForm_OriginalSource
      }
    }
  }
`);
export const SoundcloudConfirmForm = ({
  className,
  style,
  go,
  type,
  handleCancel,
  url,
}: {
  className?: string;
  style?: React.CSSProperties;
  url: string;
  handleCancel(): void;
  type: "register" | "request";
  go(
    p:
      | {
          type: "register";
          source: FragmentType<typeof SoundcloudRegisterOriginalSourceFragment>;
          request:
            | FragmentType<typeof SoundcloudRegisterFormRequestFragment>
            | undefined;
        }
      | {
          type: "request";
          source: FragmentType<
            typeof SoundcloudRequestFormOriginalSourceFragment
          >;
        }
  ): void;
}) => {
  const [{ fetching, data }] = useQuery({
    query: queryFetchSoundcloud,
    variables: { url },
  });
  const enable = useMemo(() => {
    if (!data) return false;
    switch (type) {
      case "register":
        return (
          !data.findSoundcloudMADSource && data.fetchSoundcloud.source !== null
        );
      case "request":
        return (
          !data.findSoundcloudRegistrationRequestByUrl &&
          data.fetchSoundcloud.source !== null
        );
    }
  }, [data, type]);

  const handle = useCallback(() => {
    if (!data?.fetchSoundcloud.source) return;

    switch (type) {
      case "register":
        go({
          type: "register",
          request: data.findSoundcloudRegistrationRequestByUrl || undefined,
          source: data.fetchSoundcloud.source,
        });
        break;
      case "request":
        go({
          type: "request",
          source: data.fetchSoundcloud.source,
        });
        break;
    }
  }, [data, go, type]);

  return (
    <form
      className={clsx(className, "flex flex-col gap-y-4")}
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
        handle();
      }}
    >
      <div className={clsx("grow")}>
        {data?.findSoundcloudMADSource ? (
          <AlreadyRegistered fragment={data.findSoundcloudMADSource} />
        ) : type === "request" &&
          data?.findSoundcloudRegistrationRequestByUrl ? (
          <AlreadyRequested
            fragment={data.findSoundcloudRegistrationRequestByUrl}
          />
        ) : data?.fetchSoundcloud.source ? (
          <div className={clsx("flex gap-x-4")}>
            <div className={clsx("shrink-0")}>
              {data.fetchSoundcloud.source.originalThumbnailUrl && (
                <CoolImage2
                  src={data.fetchSoundcloud.source.originalThumbnailUrl}
                  alt={data.fetchSoundcloud.source.title}
                  width={96}
                  height={64}
                  className={clsx("h-[64px] w-[96px]")}
                  unoptimized={true}
                />
              )}
            </div>
            <div
              className={clsx(
                "flex grow flex-col gap-y-1 border border-obsidian-primary bg-obsidian-darkest px-4 py-2"
              )}
            >
              <p className={clsx("text-sm text-snow-primary")}>
                {data.fetchSoundcloud.source.title}
              </p>
              <p>
                <a
                  href={data.fetchSoundcloud.source.url}
                  className={clsx(
                    "inline-flex items-center gap-x-1 font-mono text-xs text-snow-darker hover:text-vivid-primary"
                  )}
                >
                  <ExternalLinkPictogram className={clsx("h-4 w-4")} />
                  {data.fetchSoundcloud.source.sourceId}
                </a>
              </p>
            </div>
          </div>
        ) : fetching ? (
          <div
            className={clsx(
              "flex items-center gap-x-2 text-sm text-snow-darker"
            )}
          >
            <LoadingPictogram className={clsx("h-4 w-4")} />
            <div>SoundCloudから検索中</div>
          </div>
        ) : (
          <div
            className={clsx(
              "flex items-center gap-x-2 text-sm text-error-primary"
            )}
          >
            <NotFoundPictogram className={clsx("h-4 w-4")} />
            <div className={clsx("font-bold")}>
              SoundCloudから情報を取得できませんでした。
            </div>
          </div>
        )}
      </div>
      <div className={clsx("flex shrink-0 justify-between gap-x-2")}>
        <SubmitButton type={type} disabled={!enable} />
        <Button
          className={clsx()}
          onClick={() => {
            handleCancel();
          }}
          text="取り消す"
          size="medium"
          color="red"
        />
      </div>
    </form>
  );
};

export const queryFetchBilibili = graphql(`
  query SourceIDForm_Bilibili($sourceId: String!) {
    findBilibiliMADSource(input: { sourceId: $sourceId }) {
      id
      ...InputSourceForm_AlreadyRegistered
    }
    findBilibiliRegistrationRequestBySourceId(sourceId: $sourceId) {
      id
      ...InputSourceForm_AlreadyRequested
      ...RegisterFromBilibiliForm_Request
    }
    fetchBilibili(input: { bvid: $sourceId }) {
      source {
        title
        sourceId
        thumbnailUrl(scale: LARGE)
        url
        ...BilibiliForm_OriginalSource2
        ...BilibiliRequestForm_OriginalSource
      }
    }
  }
`);
export const BilibiliConfirmForm = ({
  className,
  style,
  go,
  type,
  handleCancel,
  sourceId,
}: {
  className?: string;
  style?: React.CSSProperties;
  sourceId: string;
  handleCancel(): void;
  type: "register" | "request";
  go(
    p:
      | {
          type: "register";
          source: FragmentType<typeof BilibiliRegisterOriginalSourceFragment>;
          request:
            | FragmentType<typeof BilibiliRegisterFormRequestFragment>
            | undefined;
        }
      | {
          type: "request";
          source: FragmentType<
            typeof BilibiliRequestFormOriginalSourceFragment
          >;
        }
  ): void;
}) => {
  const [{ fetching, data }] = useQuery({
    query: queryFetchBilibili,
    variables: { sourceId },
  });

  const enable = useMemo(() => {
    if (!data) return false;
    switch (type) {
      case "register":
        return (
          !data.findBilibiliMADSource && data.fetchBilibili.source !== null
        );
      case "request":
        return (
          !data.findBilibiliRegistrationRequestBySourceId &&
          data.fetchBilibili.source !== null
        );
    }
  }, [data, type]);

  const handle = useCallback(() => {
    if (!data?.fetchBilibili.source) return;

    switch (type) {
      case "register":
        go({
          type: "register",
          source: data.fetchBilibili.source,
          request: data.findBilibiliRegistrationRequestBySourceId || undefined,
        });
        break;
      case "request":
        go({
          type: "request",
          source: data.fetchBilibili.source,
        });
        break;
    }
  }, [data, go, type]);

  return (
    <form
      className={clsx(className, "flex flex-col gap-y-4")}
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
        handle();
      }}
    >
      <div className={clsx("grow")}>
        {data?.findBilibiliMADSource ? (
          <AlreadyRegistered fragment={data.findBilibiliMADSource} />
        ) : type === "request" &&
          data?.findBilibiliRegistrationRequestBySourceId ? (
          <AlreadyRequested
            fragment={data.findBilibiliRegistrationRequestBySourceId}
          />
        ) : data?.fetchBilibili.source ? (
          <div className={clsx("flex gap-x-4")}>
            <div className={clsx("shrink-0")}>
              <CoolImage2
                src={data.fetchBilibili.source.thumbnailUrl}
                alt={data.fetchBilibili.source.title}
                width={96}
                height={64}
                className={clsx("h-[64px] w-[96px]")}
                unoptimized={true}
              />
            </div>
            <div
              className={clsx(
                "flex grow flex-col gap-y-1 border border-obsidian-primary bg-obsidian-darkest px-4 py-2"
              )}
            >
              <p className={clsx("text-sm text-snow-primary")}>
                {data.fetchBilibili.source.title}
              </p>
              <p>
                <a
                  href={data.fetchBilibili.source.url}
                  className={clsx(
                    "inline-flex items-center gap-x-1 font-mono text-xs text-snow-darker hover:text-vivid-primary"
                  )}
                >
                  <ExternalLinkPictogram className={clsx("h-4 w-4")} />
                  {data.fetchBilibili.source.sourceId}
                </a>
              </p>
            </div>
          </div>
        ) : fetching ? (
          <div
            className={clsx(
              "flex items-center gap-x-2 text-sm text-snow-darker"
            )}
          >
            <LoadingPictogram className={clsx("h-4 w-4")} />
            <div>Bilibiliから検索中</div>
          </div>
        ) : (
          <div
            className={clsx(
              "flex items-center gap-x-2 text-sm text-error-primary"
            )}
          >
            <NotFoundPictogram className={clsx("h-4 w-4")} />
            <div className={clsx("font-bold")}>
              Bilibiliから情報を取得できませんでした。
            </div>
          </div>
        )}
      </div>
      <div className={clsx("flex shrink-0 justify-between gap-x-2")}>
        <SubmitButton type={type} disabled={!enable} />
        <Button
          className={clsx()}
          onClick={() => {
            handleCancel();
          }}
          text="取り消す"
          size="medium"
          color="red"
        />
      </div>
    </form>
  );
};

export default function SourceIDForm({
  className,
  style,
  mode,
  initProp,
}: {
  className?: string;
  style?: React.CSSProperties;
  mode: "register" | "request";
  initProp?: Exclude<ReturnType<typeof estimateUrl>, null>;
}) {
  const openNicovideoRequest = useOpenNicovideoRequestForm();
  const openNicovideoRegister = useOpenNicovideoRegisterForm();

  const openYoutubeRequest = useOpenYoutubeRequestForm();
  const openYoutubeRegister = useOpenYoutubeRegisterForm();

  const openSoundcloudRequest = useOpenSoundcloudRequestForm();
  const openSoundcloudRegister = useOpenSoundcloudRegisterForm();

  const openBilibiliRequest = useOpenBilibiliRequestForm();
  const openBilibiliRegister = useOpenBilibiliRegisterForm();

  const [input, setInput] = useState(
    initProp?.type === "soundcloud"
      ? initProp.url
      : initProp
        ? initProp.sourceId
        : ""
  );
  const parsedInput = useMemo(() => estimateUrl(input), [input]);
  const [current, setCurrent] = useState<
    Exclude<ReturnType<typeof estimateUrl>, null> | undefined
  >(initProp);

  return (
    <FormWrapper
      style={style}
      className={clsx(className)}
      Title={mode === "register" ? <>音MADの登録</> : <>音MADのリクエスト</>}
      Icon={PlusPictogram}
      Form={({ className, ...rest }) => (
        <div
          {...rest}
          className={clsx(className, "flex h-full flex-col gap-y-4")}
        >
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
              placeholder="https://www.nicovideo.jp/watch/sm2057168"
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
          ) : current?.type === "soundcloud" ? (
            <SoundcloudConfirmForm
              url={current.url}
              type={mode}
              go={(p) => {
                switch (p.type) {
                  case "register":
                    openSoundcloudRegister({
                      sourceFragment: p.source,
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
      )}
    />
  );
}
