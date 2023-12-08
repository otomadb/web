"use client";
import clsx from "clsx";
import React, { useCallback, useMemo } from "react";
import { useQuery } from "urql";

import Button from "~/components/Button";
import { CoolImage2 } from "~/components/CoolImage";
import {
  ExternalLinkPictogram,
  LoadingPictogram,
  NotFoundPictogram,
} from "~/components/Pictogram";
import { FragmentType, graphql } from "~/gql";

import {
  SoundcloudRegisterFormRequestFragment,
  SoundcloudRegisterOriginalSourceFragment,
} from "../Soundcloud/SoundcloudRegisterForm";
import { SoundcloudRequestFormOriginalSourceFragment } from "../Soundcloud/SoundcloudRequestForm";
import AlreadyRegistered from "./AlreadyRegistered";
import AlreadyRequested from "./AlreadyRequested";
import SubmitButton from "./SubmitButton";

export const queryFetchSoundcloudBySourceId = graphql(`
  query SourceIDForm_Soundcloud_BySourceID($sourceId: String!) {
    findSoundcloudMADSourceBySourceId: findSoundcloudMADSource(
      input: { sourceId: $sourceId }
    ) {
      id
      ...InputSourceForm_AlreadyRegistered
    }
    findSoundcloudRegistrationRequestBySourceId(sourceId: $sourceId) {
      id
      ...InputSourceForm_AlreadyRequested
      ...RegisterFromSoundcloudForm_Request
    }
    fetchSoundcloudBySourceId(sourceId: $sourceId) {
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
export function SoundcloudConfirmFormBySourceId({
  className,
  style,
  go,
  sourceId,
  type,
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
}) {
  const [{ fetching, data }] = useQuery({
    query: queryFetchSoundcloudBySourceId,
    variables: { sourceId },
  });
  const enable = useMemo(() => {
    if (!data) return false;
    switch (type) {
      case "register":
        return (
          !data.findSoundcloudMADSourceBySourceId &&
          data.fetchSoundcloudBySourceId.source !== null
        );
      case "request":
        return (
          !data.findSoundcloudRegistrationRequestBySourceId &&
          data.fetchSoundcloudBySourceId.source !== null
        );
    }
  }, [data, type]);

  const handle = useCallback(() => {
    if (!data?.fetchSoundcloudBySourceId.source) return;

    switch (type) {
      case "register":
        go({
          type: "register",
          request:
            data.findSoundcloudRegistrationRequestBySourceId || undefined,
          source: data.fetchSoundcloudBySourceId.source,
        });
        break;
      case "request":
        go({
          type: "request",
          source: data.fetchSoundcloudBySourceId.source,
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
        {data?.findSoundcloudMADSourceBySourceId ? (
          <AlreadyRegistered
            fragment={data.findSoundcloudMADSourceBySourceId}
          />
        ) : type === "request" &&
          data?.findSoundcloudRegistrationRequestBySourceId ? (
          <AlreadyRequested
            fragment={data.findSoundcloudRegistrationRequestBySourceId}
          />
        ) : data?.fetchSoundcloudBySourceId.source ? (
          <div className={clsx("flex gap-x-4")}>
            <div className={clsx("shrink-0")}>
              {data.fetchSoundcloudBySourceId.source.originalThumbnailUrl && (
                <CoolImage2
                  src={
                    data.fetchSoundcloudBySourceId.source.originalThumbnailUrl
                  }
                  alt={data.fetchSoundcloudBySourceId.source.title}
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
                {data.fetchSoundcloudBySourceId.source.title}
              </p>
              <p>
                <a
                  href={data.fetchSoundcloudBySourceId.source.url}
                  className={clsx(
                    "inline-flex items-center gap-x-1 font-mono text-xs text-snow-darker hover:text-vivid-primary"
                  )}
                >
                  <ExternalLinkPictogram className={clsx("h-4 w-4")} />
                  {data.fetchSoundcloudBySourceId.source.url}
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
}

export const queryFetchSoundcloudByUrl = graphql(`
  query SourceIDForm_SoundcloudConfirmForm_ByURL($url: String!) {
    findSoundcloudMADSourceByUrl: findSoundcloudMADSource(
      input: { url: $url }
    ) {
      id
      ...InputSourceForm_AlreadyRegistered
    }
    findSoundcloudRegistrationRequestByUrl(url: $url) {
      id
      ...InputSourceForm_AlreadyRequested
      ...RegisterFromSoundcloudForm_Request
    }
    fetchSoundcloudByUrl(url: $url) {
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
export function SoundcloudConfirmFormByUrl({
  className,
  style,
  go,
  url,
  type,
  handleCancel,
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
}) {
  const [{ fetching, data }] = useQuery({
    query: queryFetchSoundcloudByUrl,
    variables: { url },
  });
  console.log(data);
  const enable = useMemo(() => {
    if (!data) return false;
    switch (type) {
      case "register":
        return (
          !data.findSoundcloudMADSourceByUrl &&
          data.fetchSoundcloudByUrl.source !== null
        );
      case "request":
        return (
          !data.findSoundcloudRegistrationRequestByUrl &&
          data.fetchSoundcloudByUrl.source !== null
        );
    }
  }, [data, type]);

  const handle = useCallback(() => {
    if (!data?.fetchSoundcloudByUrl.source) return;

    switch (type) {
      case "register":
        go({
          type: "register",
          request: data.findSoundcloudRegistrationRequestByUrl || undefined,
          source: data.fetchSoundcloudByUrl.source,
        });
        break;
      case "request":
        go({
          type: "request",
          source: data.fetchSoundcloudByUrl.source,
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
        {data?.findSoundcloudMADSourceByUrl ? (
          <AlreadyRegistered fragment={data.findSoundcloudMADSourceByUrl} />
        ) : type === "request" &&
          data?.findSoundcloudRegistrationRequestByUrl ? (
          <AlreadyRequested
            fragment={data.findSoundcloudRegistrationRequestByUrl}
          />
        ) : data?.fetchSoundcloudByUrl.source ? (
          <div className={clsx("flex gap-x-4")}>
            <div className={clsx("shrink-0")}>
              {data.fetchSoundcloudByUrl.source.originalThumbnailUrl && (
                <CoolImage2
                  src={data.fetchSoundcloudByUrl.source.originalThumbnailUrl}
                  alt={data.fetchSoundcloudByUrl.source.title}
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
                {data.fetchSoundcloudByUrl.source.title}
              </p>
              <p>
                <a
                  href={data.fetchSoundcloudByUrl.source.url}
                  className={clsx(
                    "inline-flex items-center gap-x-1 font-mono text-xs text-snow-darker hover:text-vivid-primary"
                  )}
                >
                  <ExternalLinkPictogram className={clsx("h-4 w-4")} />
                  {data.fetchSoundcloudByUrl.source.url}
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
}
