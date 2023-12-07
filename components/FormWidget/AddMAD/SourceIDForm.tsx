"use client";

import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";
import { useQuery } from "urql";

import Button from "~/components/Button";
import { CoolImage2 } from "~/components/CoolImage";
import {
  ExternalLinkPictogram,
  LoadingPictogram,
  NotFoundPictogram,
  SearchPictogram,
} from "~/components/Pictogram";
import { TextInput2 } from "~/components/TextInput";
import { FragmentType, graphql } from "~/gql";
import { estimateUrl } from "~/utils/extractSourceId";

import {
  useOpenRegisterFromBilibili2,
  useOpenRegisterFromNicovideo2,
  useOpenRegisterFromSoundcloud2,
  useOpenRegisterFromYoutube2,
  useOpenRequestFromBilibili2,
  useOpenRequestFromNicovideo2,
  useOpenRequestFromSoundcloud2,
  useOpenRequestFromYoutube2,
} from "..";
import { BilibiliRegisterOriginalSourceFragment } from "./Bilibili/BilibiliRegisterForm";
import { BilibiliRequestFormOriginalSourceFragment } from "./Bilibili/BilibiliRequestForm";
import {
  NicovideoRegisterFormRequestFragment,
  NicovideoRegisterOriginalSourceFragment,
} from "./Nicovideo/NicovideoRegisterForm";
import { NicovideoRequestFormOriginalSourceFragment } from "./Nicovideo/NicovideoRequestForm";
import { SoundcloudRegisterOriginalSourceFragment } from "./Soundcloud/SoundcloudRegisterForm";
import { SoundcloudRequestFormOriginalSourceFragment } from "./Soundcloud/SoundcloudRequestForm";
import { YoutubeRegisterOriginalSourceFragment } from "./Youtube/YoutubeRegisterForm";
import { YoutubeRequestFormOriginalSourceFragment } from "./Youtube/YoutubeRequestForm";

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
      ...Form_VideoAlreadyRegistered
    }
    findNicovideoRegistrationRequest(input: { sourceId: $sourceId }) {
      id
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
}: {
  className?: string;
  style?: React.CSSProperties;
  sourceId: string;
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

  if (fetching)
    return (
      <p className={clsx("flex items-center gap-x-2 text-sm text-snow-darker")}>
        <LoadingPictogram className={clsx("inline h-4 w-4")} />
        検索中
      </p>
    );
  if (!data?.fetchNicovideo.source)
    return (
      <p
        className={clsx("flex items-center gap-x-2 text-sm text-error-primary")}
      >
        <NotFoundPictogram className={clsx("inline h-4 w-4")} />
        <span className={clsx("font-bold")}>
          ニコニコ動画から情報を取得できませんでした。
        </span>
      </p>
    );

  return (
    <form
      className={clsx(className, "flex flex-col gap-y-4")}
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
        handle();
      }}
    >
      <div className={clsx("flex grow gap-x-4")}>
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
      <div className={clsx("flex shrink-0 justify-end")}>
        <SubmitButton type={type} disabled={!data.fetchNicovideo.source} />
      </div>
    </form>
  );
};

export const queryFetchYoutube = graphql(`
  query InputIDForm_Youtube($sourceId: String!) {
    fetchYoutube(input: { sourceId: $sourceId }) {
      source {
        thumbnailUrl
        url
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
}: {
  className?: string;
  style?: React.CSSProperties;
  sourceId: string;
  type: "register" | "request";
  go(
    p:
      | {
          type: "register";
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

  const handle = useCallback(() => {
    if (!data?.fetchYoutube.source) return;

    switch (type) {
      case "register":
        go({
          type: "register",
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
  }, [data?.fetchYoutube.source, go, type]);

  if (fetching)
    return (
      <p className={clsx("flex items-center gap-x-2 text-sm text-snow-darker")}>
        <LoadingPictogram className={clsx("inline h-4 w-4")} />
        検索中
      </p>
    );
  if (!data?.fetchYoutube.source)
    return (
      <p
        className={clsx("flex items-center gap-x-2 text-sm text-error-primary")}
      >
        <NotFoundPictogram className={clsx("inline h-4 w-4")} />
        <span className={clsx("font-bold")}>
          Youtubeから情報を取得できませんでした。
        </span>
      </p>
    );

  return (
    <form
      className={clsx(className, "flex flex-col gap-y-4")}
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
        handle();
      }}
    >
      <div className={clsx("flex grow gap-x-4")}>
        <div className={clsx("shrink-0")}>
          <CoolImage2
            src={data.fetchYoutube.source.thumbnailUrl}
            alt={data.fetchYoutube.source.url}
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
              {data.fetchYoutube.source.url}
            </a>
          </p>
        </div>
      </div>
      <div className={clsx("flex shrink-0 justify-end")}>
        <SubmitButton type={type} disabled={!data.fetchYoutube.source} />
      </div>
    </form>
  );
};

export const queryFetchSoundCloud = graphql(`
  query SourceIDForm_Soundcloud($url: String!) {
    fetchSoundcloud(input: { url: $url }) {
      source {
        title
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
  url,
}: {
  className?: string;
  style?: React.CSSProperties;
  url: string;
  type: "register" | "request";
  go(
    p:
      | {
          type: "register";
          source: FragmentType<typeof SoundcloudRegisterOriginalSourceFragment>;
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
    query: queryFetchSoundCloud,
    variables: { url },
  });

  const handle = useCallback(() => {
    if (!data?.fetchSoundcloud.source) return;

    switch (type) {
      case "register":
        go({
          type: "register",
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
  }, [data?.fetchSoundcloud, go, type]);

  if (fetching)
    return (
      <p className={clsx("flex items-center gap-x-2 text-sm text-snow-darker")}>
        <LoadingPictogram className={clsx("inline h-4 w-4")} />
        検索中
      </p>
    );
  if (!data?.fetchSoundcloud.source)
    return (
      <p
        className={clsx("flex items-center gap-x-2 text-sm text-error-primary")}
      >
        <NotFoundPictogram className={clsx("inline h-4 w-4")} />
        <span className={clsx("font-bold")}>
          SoundCloudから情報を取得できませんでした。
        </span>
      </p>
    );

  return (
    <form
      className={clsx(className, "flex flex-col gap-y-4")}
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
        handle();
      }}
    >
      <div className={clsx("flex grow gap-x-4")}>
        <div className={clsx("shrink-0")}>
          {
            // TODO: 画像がない場合の挙動
            data.fetchSoundcloud.source.originalThumbnailUrl && (
              <CoolImage2
                src={data.fetchSoundcloud.source.originalThumbnailUrl}
                alt={data.fetchSoundcloud.source.url}
                width={96}
                height={64}
                className={clsx("h-[64px] w-[96px]")}
                unoptimized={true}
              />
            )
          }
        </div>
        <div
          className={clsx(
            "flex grow flex-col gap-y-1 border border-obsidian-primary bg-obsidian-darkest px-4 py-2"
          )}
        >
          <p>
            <a
              href={data.fetchSoundcloud.source.url}
              className={clsx(
                "inline-flex items-center gap-x-1 font-mono text-xs text-snow-darker hover:text-vivid-primary"
              )}
            >
              <ExternalLinkPictogram className={clsx("h-4 w-4")} />
              {data.fetchSoundcloud.source.url}
            </a>
          </p>
        </div>
      </div>
      <div className={clsx("flex shrink-0 justify-end")}>
        <SubmitButton type={type} disabled={!data.fetchSoundcloud.source} />
      </div>
    </form>
  );
};

export const queryFetchBilibili = graphql(`
  query SourceIDForm_Bilibili($sourceId: String!) {
    fetchBilibili(input: { bvid: $sourceId }) {
      source {
        title
        originalThumbnailUrl
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
  sourceId,
}: {
  className?: string;
  style?: React.CSSProperties;
  sourceId: string;
  type: "register" | "request";
  go(
    p:
      | {
          type: "register";
          source: FragmentType<typeof BilibiliRegisterOriginalSourceFragment>;
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

  const handle = useCallback(() => {
    if (!data?.fetchBilibili.source) return;

    switch (type) {
      case "register":
        go({
          type: "register",
          source: data.fetchBilibili.source,
        });
        break;
      case "request":
        go({
          type: "request",
          source: data.fetchBilibili.source,
        });
        break;
    }
  }, [data?.fetchBilibili.source, go, type]);

  if (fetching)
    return (
      <p className={clsx("flex items-center gap-x-2 text-sm text-snow-darker")}>
        <LoadingPictogram className={clsx("inline h-4 w-4")} />
        検索中
      </p>
    );
  if (!data?.fetchBilibili.source)
    return (
      <p
        className={clsx("flex items-center gap-x-2 text-sm text-error-primary")}
      >
        <NotFoundPictogram className={clsx("inline h-4 w-4")} />
        <span className={clsx("font-bold")}>
          Bilibiliから情報を取得できませんでした。
        </span>
      </p>
    );

  return (
    <form
      className={clsx(className, "flex flex-col gap-y-4")}
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
        handle();
      }}
    >
      <div className={clsx("flex grow gap-x-4")}>
        <div className={clsx("shrink-0")}>
          <CoolImage2
            src={data.fetchBilibili.source.originalThumbnailUrl}
            alt={data.fetchBilibili.source.url}
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
              href={data.fetchBilibili.source.url}
              className={clsx(
                "inline-flex items-center gap-x-1 font-mono text-xs text-snow-darker hover:text-vivid-primary"
              )}
            >
              <ExternalLinkPictogram className={clsx("h-4 w-4")} />
              {data.fetchBilibili.source.url}
            </a>
          </p>
        </div>
      </div>
      <div className={clsx("flex shrink-0 justify-end")}>
        <SubmitButton type={type} disabled={!data.fetchBilibili.source} />
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
  const openNicovideoRequest = useOpenRequestFromNicovideo2();
  const openNicovideoRegister = useOpenRegisterFromNicovideo2();

  const openYoutubeRequest = useOpenRequestFromYoutube2();
  const openYoutubeRegister = useOpenRegisterFromYoutube2();

  const openSoundcloudRequest = useOpenRequestFromSoundcloud2();
  const openSoundcloudRegister = useOpenRegisterFromSoundcloud2();

  const openBilibiliRequest = useOpenRequestFromBilibili2();
  const openBilibiliRegister = useOpenRegisterFromBilibili2();

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
    <div
      style={style}
      className={clsx(
        className,
        "flex flex-col gap-y-4 border border-obsidian-lighter bg-obsidian-darker p-4"
      )}
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
          className={clsx("grow")}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
