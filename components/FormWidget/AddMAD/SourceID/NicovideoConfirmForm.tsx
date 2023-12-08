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
  NicovideoRegisterFormRequestFragment,
  NicovideoRegisterOriginalSourceFragment,
} from "../Nicovideo/NicovideoRegisterForm";
import { NicovideoRequestFormOriginalSourceFragment } from "../Nicovideo/NicovideoRequestForm";
import AlreadyRegistered from "./AlreadyRegistered";
import AlreadyRequested from "./AlreadyRequested";
import SubmitButton from "./SubmitButton";

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

export default function NicovideoConfirmForm({
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
}) {
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
}
