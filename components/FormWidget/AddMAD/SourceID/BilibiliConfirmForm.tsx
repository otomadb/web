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
  BilibiliRegisterFormRequestFragment,
  BilibiliRegisterOriginalSourceFragment,
} from "../Bilibili/BilibiliRegisterForm";
import { BilibiliRequestFormOriginalSourceFragment } from "../Bilibili/BilibiliRequestForm";
import AlreadyRegistered from "./AlreadyRegistered";
import AlreadyRequested from "./AlreadyRequested";
import SubmitButton from "./SubmitButton";

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

export default function BilibiliConfirmForm({
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
}) {
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
}
