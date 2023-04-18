"use client";
import "client-only";

import clsx from "clsx";
import { CSSProperties, ReactNode } from "react";
import { useQuery } from "urql";

import { AlreadyRegistered } from "~/app/editor/nicovideo/AlreadyRegistered";
import { Original } from "~/app/editor/nicovideo/OriginalSource";
import { graphql } from "~/gql";

import RequestExists from "./RequestExists";

export const Query = graphql(`
  query NicovideoRequestPage_SourceChecker($sourceId: String!) {
    fetchNicovideo(input: { sourceId: $sourceId }) {
      source {
        sourceId
        title
        thumbnailUrl
        ...RegisterNicovideoPage_OriginalSource
      }
    }
    findNicovideoVideoSource(input: { sourceId: $sourceId }) {
      ...EditorRegisterNicovideoPage_VideoSource
    }
    findNicovideoRegistrationRequest(input: { sourceId: $sourceId }) {
      ...NicovideoRequestPage_VideoRequestAlreadyExists
    }
  }
`);
export default function SourceChecker({
  style,
  children,
  sourceId,
  className,
}: {
  className?: string;
  style?: CSSProperties;
  sourceId: string;
  children: ReactNode;
}) {
  const [{ data }] = useQuery({
    query: Query,
    variables: { sourceId },
    requestPolicy: "cache-and-network",
  });

  return (
    <div className={clsx(className, ["mt-2"])} style={style}>
      {data && (
        <>
          {data.findNicovideoVideoSource && (
            <AlreadyRegistered fragment={data.findNicovideoVideoSource} />
          )}
          {!data.findNicovideoVideoSource && (
            <>
              {data.findNicovideoRegistrationRequest && (
                <RequestExists
                  fragment={data.findNicovideoRegistrationRequest}
                />
              )}
              {!data.findNicovideoRegistrationRequest && (
                <>
                  {!data.fetchNicovideo.source && (
                    <div>
                      <span className={clsx(["font-mono"])}>{sourceId}</span>
                      に該当する動画は見つかりませんでした．
                    </div>
                  )}
                  {data.fetchNicovideo.source && (
                    <div className={clsx(["flex", "flex-col", "gap-y-4"])}>
                      <div
                        className={clsx(
                          ["flex", "flex-col", "gap-y-2"],
                          ["border"],
                          ["rounded-md"],
                          ["px-4", "py-2"]
                        )}
                      >
                        <div className={clsx(["text-sm"])}>
                          ニコニコ動画からの情報
                        </div>
                        <Original fragment={data.fetchNicovideo.source} />
                      </div>
                      <div
                        className={clsx(
                          ["flex", "flex-col", "gap-y-2"],
                          ["border"],
                          ["rounded-md"],
                          ["px-4", "py-2"]
                        )}
                      >
                        <div className={clsx(["text-sm"])}>申請フォーム</div>
                        <div>{children}</div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
