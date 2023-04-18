"use client";
import "client-only";

import clsx from "clsx";
import React, { ReactNode } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";

import { AlreadyRegistered } from "./AlreadyRegistered";
import { Original } from "./OriginalSource";
import { RequestExists } from "./RequestExists";
import { NotExists as RequestNotExists } from "./RequestNotExists";

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
          ...RegisterNicovideoPage_Request_Exists
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
    <div className={clsx(["flex", "flex-col"])}>
      {data && (
        <>
          {data.findNicovideoVideoSource && (
            <AlreadyRegistered fragment={data.findNicovideoVideoSource} />
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
                <div className={clsx(["flex", "flex-col", "gap-y-2"])}>
                  <div className={clsx(["flex", "gap-x-2"])}>
                    <div
                      className={clsx(
                        ["flex-grow"],
                        ["border", "rounded-md"],
                        ["px-4", "py-4"]
                      )}
                    >
                      <Original
                        fragment={data.fetchNicovideo.source}
                        className={clsx()}
                      />
                    </div>
                    <div
                      className={clsx(
                        ["flex-shrink-0"],
                        ["w-96"],
                        ["border", "rounded-md"],
                        ["px-4", "py-4"]
                      )}
                    >
                      {data.findNicovideoRegistrationRequest && (
                        <RequestExists
                          fragment={data.findNicovideoRegistrationRequest}
                        />
                      )}
                      {!data.findNicovideoRegistrationRequest && (
                        <RequestNotExists />
                      )}
                    </div>
                  </div>
                  <div
                    className={clsx(
                      ["flex", "flex-col", "gap-y-2"],
                      ["border"],
                      ["rounded-md"],
                      ["px-4", "py-2"]
                    )}
                  >
                    <div className={clsx(["text-sm"])}>追加フォーム</div>
                    <div>{children}</div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
