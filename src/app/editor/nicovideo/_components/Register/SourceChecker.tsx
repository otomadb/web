"use client";
import "client-only";

import clsx from "clsx";
import React, { ReactNode } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";

import { Original } from "./Original/Original";
import { Request } from "./Request/Request";
import { VideoSource } from "./VideoSource/VideoSource";

export const SourceChecker: React.FC<{
  sourceId: string;
  children: ReactNode;
}> = ({ sourceId, children }) => {
  const [{ data }] = useQuery({
    query: graphql(`
      query RegisterNicovideoPage_SourceChecker($sourceId: String!) {
        fetchNicovideo(input: { sourceId: $sourceId }) {
          source {
            ...RegisterNicovideoPage_OriginalSource
          }
        }
        findNicovideoRegistrationRequest(input: { sourceId: $sourceId }) {
          id
          ...RegisterNicovideoPage_Request
        }
        findNicovideoVideoSource(input: { sourceId: $sourceId }) {
          id
          ...EditorRegisterNicovideoPage_VideoSource
        }
      }
    `),
    variables: { sourceId },
    requestPolicy: "cache-and-network",
  });

  return (
    <div
      className={clsx(
        ["flex", "flex-col"],
        ["border"],
        ["rounded-md"],
        ["px-4", "py-4"]
      )}
    >
      <div>ニコニコ動画からの情報</div>
      <div className={clsx(["mt-2"])}>
        {data && (
          <>
            {data.findNicovideoVideoSource && (
              <VideoSource fragment={data.findNicovideoVideoSource} />
            )}
            {!data.findNicovideoVideoSource && (
              <>
                {!data.fetchNicovideo.source && (
                  <>
                    <div>
                      <span className={clsx(["font-mono"])}>{sourceId}</span>
                      に該当する動画は見つかりませんでした．
                    </div>
                  </>
                )}
                {data.fetchNicovideo.source && (
                  <div className={clsx(["flex", "flex-col", "gap-y-4"])}>
                    <Original fragment={data.fetchNicovideo.source} />
                    {data.findNicovideoRegistrationRequest && (
                      <Request
                        fragment={data.findNicovideoRegistrationRequest}
                      />
                    )}
                    <div
                      className={clsx(
                        ["border"],
                        ["rounded-md"],
                        ["px-4", "py-4"]
                      )}
                    >
                      {children}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
