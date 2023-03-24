"use client";
import "client-only";

import clsx from "clsx";
import { ReactNode } from "react";
import { useQuery } from "urql";

import { Original } from "~/app/editor/nicovideo/_components/Original/Original";
import { VideoSource } from "~/app/editor/nicovideo/_components/VideoSource/VideoSource";
import { graphql } from "~/gql";

import { RequestExists } from "./RequestExists";

export const SourceChecker: React.FC<{
  className?: string;
  sourceId: string;
  children: ReactNode;
}> = ({ className, children, sourceId }) => {
  const [{ data }] = useQuery({
    query: graphql(`
      query RequestNicovideoRegistrationPage_SourceChecker($sourceId: String!) {
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
          ...RequestNicovideoRegistrationPage_VideoRequestAlreadyExists
        }
      }
    `),
    variables: { sourceId },
    requestPolicy: "cache-and-network",
  });

  return (
    <div className={clsx(className, ["mt-2"])}>
      {data && (
        <>
          {data.findNicovideoVideoSource && (
            <VideoSource fragment={data.findNicovideoVideoSource} />
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
};
