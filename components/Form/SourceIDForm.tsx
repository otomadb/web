"use client";

import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";
import { useQuery } from "urql";

import Button from "~/components/Button";
import { TextInput2 } from "~/components/TextInput";
import { FragmentType, graphql } from "~/gql";
import { estimateUrl } from "~/utils/extractSourceId";

import { CoolImage2 } from "../CoolImage";
import {
  useOpenRegisterFromBilibili,
  useOpenRegisterFromNicovideo2,
  useOpenRegisterFromYoutube,
  useOpenRequestFromBilibili,
  useOpenRequestFromNicovideo,
  useOpenRequestFromSoundcloud,
  useOpenRequestFromYoutube,
} from "../FormModal";
import {
  ExternalLinkPictogram,
  LoadingPictogram,
  NotFoundPictogram,
  SearchPictogram,
} from "../Pictogram";
import {
  NicovideoRegisterFormRequestFragment,
  NicovideoRegisterOriginalSourceFragment,
} from "./NicovideoRegisterForm";
import { BilibiliRegisterOriginalSourceFragment } from "./RegisterMAD/FromBilibili/OriginalSource";
import { SoundcloudRegisterOriginalSourceFragment } from "./RegisterMAD/FromSoundcloud/OriginalSource";
import { YoutubeRegisterOriginalSourceFragment } from "./RegisterMAD/FromYoutube/OriginalSource";

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
        ...RegisterFromNicovideoForm_OriginalSource2
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
          source: FragmentType<typeof NicovideoRegisterOriginalSourceFragment>;
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
        ...RegisterFromYoutubeForm_OriginalSource
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
} & (
  | {
      type: "register";
      go(
        type: FragmentType<typeof YoutubeRegisterOriginalSourceFragment>
      ): void;
    }
  | {
      type: "request";
      go(
        type: FragmentType<typeof YoutubeRegisterOriginalSourceFragment>
      ): void;
    }
)) => {
  const [{ fetching, data }] = useQuery({
    query: queryFetchYoutube,
    variables: { sourceId },
  });

  const handle = useCallback(() => {
    if (!data?.fetchYoutube.source) return;

    if (type === "register") go(data.fetchYoutube.source);
    else go(data.fetchYoutube.source);
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
        ...RegisterFromSoundcloudForm_OriginalSource
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
} & (
  | {
      type: "register";
      go(
        type: FragmentType<typeof SoundcloudRegisterOriginalSourceFragment>
      ): void;
    }
  | {
      type: "request";
      go(
        type: FragmentType<typeof SoundcloudRegisterOriginalSourceFragment>
      ): void;
    }
)) => {
  const [{ fetching, data }] = useQuery({
    query: queryFetchSoundCloud,
    variables: { url },
  });

  const handle = useCallback(() => {
    if (!data?.fetchSoundcloud.source) return;

    if (type === "register") go(data.fetchSoundcloud.source);
    else go(data.fetchSoundcloud.source);
  }, [data?.fetchSoundcloud.source, go, type]);

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
        ...RegisterFromBilibiliForm_OriginalSource
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
} & (
  | {
      type: "register";
      go(
        type: FragmentType<typeof BilibiliRegisterOriginalSourceFragment>
      ): void;
    }
  | {
      type: "request";
      go(
        type: FragmentType<typeof BilibiliRegisterOriginalSourceFragment>
      ): void;
    }
)) => {
  const [{ fetching, data }] = useQuery({
    query: queryFetchBilibili,
    variables: { sourceId },
  });

  const handle = useCallback(() => {
    if (!data?.fetchBilibili.source) return;

    if (type === "register") go(data.fetchBilibili.source);
    else go(data.fetchBilibili.source);
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
  initProp,
  type,
}: {
  className?: string;
  style?: React.CSSProperties;
  initProp?: Exclude<ReturnType<typeof estimateUrl>, null>;
  type: "request" | "register";
}) {
  const openNicovideoRequest = useOpenRequestFromNicovideo();
  const openNicovideoRegister = useOpenRegisterFromNicovideo2();

  const openYoutubeRequest = useOpenRequestFromYoutube();
  const openYoutubeRegister = useOpenRegisterFromYoutube();

  const openSoundcloudRequest = useOpenRequestFromSoundcloud();
  const openSoundcloudRegister = useOpenRequestFromSoundcloud();

  const openBilibiliRequest = useOpenRequestFromBilibili();
  const openBilibiliRegister = useOpenRegisterFromBilibili();

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
          type={type}
          go={(p) => {
            switch (p.type) {
              case "register":
                openNicovideoRegister({
                  sourceFragment: p.source,
                  requestFragment: p.request,
                });
                break;
              case "request":
                openNicovideoRequest("");
                break;
            }
          }}
          className={clsx("grow")}
        />
      ) : current?.type === "youtube" ? (
        <YoutubeConfirmForm
          sourceId={current.sourceId}
          type={type}
          go={() => {
            // TODO: fix
            if (type === "register") openYoutubeRegister(current.sourceId);
            else openYoutubeRequest(current.sourceId);
          }}
          className={clsx("grow")}
        />
      ) : current?.type === "soundcloud" ? (
        <SoundcloudConfirmForm
          url={current.url}
          type={type}
          go={() => {
            // TODO: fix
            if (type === "register") openSoundcloudRegister(current.url);
            else openSoundcloudRequest(current.url);
          }}
          className={clsx("grow")}
        />
      ) : current?.type === "bilibili" ? (
        <BilibiliConfirmForm
          sourceId={current.sourceId}
          type={type}
          go={() => {
            // TODO: fix
            if (type === "register") openBilibiliRegister(current.sourceId);
            else openBilibiliRequest(current.sourceId);
          }}
          className={clsx("grow")}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
