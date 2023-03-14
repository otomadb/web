"use client";
import "client-only";

import clsx from "clsx";
import { ReactNode, useEffect } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";

import { OriginalSource } from "./OriginalSource";
import { Request } from "./Request";
import { SourceAlreadyExists } from "./SourceAlreadyRegistered";

export const SourceChecker: React.FC<{
  className?: string;
  children: ReactNode;

  sourceId: string;
  toggleTag: (id: string) => void;
  toggleSemitag: (name: string) => void;

  setSource: (source: {
    sourceId: string;
    title: string;
    thumbnailUrl: string;
    nicovideoRequestId: string | null;
  }) => void;
}> = ({
  className,
  children,
  sourceId,
  toggleTag,
  toggleSemitag,
  setSource,
}) => {
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

  useEffect(
    () => {
      if (!data?.fetchNicovideo.source) return;

      const { sourceId, title, thumbnailUrl } = data.fetchNicovideo.source;
      setSource({
        sourceId,
        title,
        thumbnailUrl,
        nicovideoRequestId: data.findNicovideoRegistrationRequest?.id ?? null,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  return (
    <div
      className={clsx(
        className,
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
              <SourceAlreadyExists fragment={data.findNicovideoVideoSource} />
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
                    <OriginalSource
                      fragment={data.fetchNicovideo.source}
                      toggleTag={toggleTag}
                    />
                    {data.findNicovideoRegistrationRequest && (
                      <Request
                        fragment={data.findNicovideoRegistrationRequest}
                        toggleTag={toggleTag}
                        toggleSemitag={toggleSemitag}
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
