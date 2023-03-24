"use client";
import "client-only";

import clsx from "clsx";
import React, { ReactNode, useContext, useEffect } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";

import { RegisterContext } from "../Context";
import { RequestFormPart } from "../Request/Request";
import { AlreadyRegistered } from "./AlreadyRegistered";
import { OriginalSource } from "./OriginalSource";

export const EnsureSource: React.FC<{
  sourceId: string;
  children: ReactNode;
}> = ({ sourceId, children }) => {
  const { setSource } = useContext(RegisterContext);
  const [{ data }] = useQuery({
    query: graphql(`
      query RegisterNicovideoPage_SourceChecker($sourceId: String!) {
        fetchNicovideo(input: { sourceId: $sourceId }) {
          source {
            sourceId
            title
            thumbnailUrl
            ...RegisterNicovideoPage_OriginalSource
          }
        }
        findNicovideoRegistrationRequest(input: { sourceId: $sourceId }) {
          id
          ...RegisterNicovideoPage_Request
        }
        findNicovideoVideoSource(input: { sourceId: $sourceId }) {
          id
          ...EditorRegisterNicovideoPage_SourceAlreadyRegistered
        }
      }
    `),
    variables: { sourceId },
    requestPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (!data?.fetchNicovideo.source) return;

    const { sourceId, title, thumbnailUrl } = data.fetchNicovideo.source;
    setSource({
      sourceId,
      title,
      thumbnailUrl,
      nicovideoRequestId: data.findNicovideoRegistrationRequest?.id ?? null,
    });
  }, [data, setSource]);

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
                  <div className={clsx(["flex", "flex-col", "gap-y-4"])}>
                    <OriginalSource fragment={data.fetchNicovideo.source} />
                    {data.findNicovideoRegistrationRequest && (
                      <RequestFormPart
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
