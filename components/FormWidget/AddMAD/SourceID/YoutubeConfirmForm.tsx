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
  YoutubeRegisterFormRequestFragment,
  YoutubeRegisterOriginalSourceFragment,
} from "../Youtube/YoutubeRegisterForm";
import { YoutubeRequestFormOriginalSourceFragment } from "../Youtube/YoutubeRequestForm";
import AlreadyRegistered from "./AlreadyRegistered";
import AlreadyRequested from "./AlreadyRequested";
import SubmitButton from "./SubmitButton";

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
export default function YoutubeConfirmForm({
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
}) {
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
}
