"use client";
import "client-only";

import clsx from "clsx";
import { ReactNode, useEffect } from "react";
import { useQuery } from "urql";

import { OriginalSource } from "~/components/pages/Editor/RegisterNicovideo/OriginalSource";
import { SourceAlreadyExists as VideoSourceAlreadyExists } from "~/components/pages/Editor/RegisterNicovideo/SourceAlreadyRegistered";
import { graphql, useFragment as getFragment } from "~/gql";
import {
  EditorRegisterNicovideoPage_SourceAlreadyRegisteredFragmentDoc,
  RegisterNicovideoPage_OriginalSourceFragmentDoc,
  RequestNicovideoRegistrationPage_VideoRequestAlreadyExistsFragmentDoc,
} from "~/gql/graphql";

import { VideoRequestAlreadyExists } from "./VideoRequestAlreadyExists";

export const SourceChecker: React.FC<{
  className?: string;
  sourceId: string;
  toggleTag: (id: string) => void;

  setSource: (source: {
    sourceId: string;
    title: string;
    thumbnailUrl: string;
  }) => void;

  children: ReactNode;
}> = ({ className, children, sourceId, toggleTag, setSource }) => {
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
          ...EditorRegisterNicovideoPage_SourceAlreadyRegistered
        }
        findNicovideoRegistrationRequest(input: { sourceId: $sourceId }) {
          ...RequestNicovideoRegistrationPage_VideoRequestAlreadyExists
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
      setSource({ sourceId, title, thumbnailUrl });
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
            {data.findNicovideoRegistrationRequest && (
              <VideoRequestAlreadyExists
                fragment={getFragment(
                  RequestNicovideoRegistrationPage_VideoRequestAlreadyExistsFragmentDoc,
                  data.findNicovideoRegistrationRequest
                )}
              />
            )}
            {data.findNicovideoVideoSource && (
              <VideoSourceAlreadyExists
                fragment={getFragment(
                  EditorRegisterNicovideoPage_SourceAlreadyRegisteredFragmentDoc,
                  data.findNicovideoVideoSource
                )}
              />
            )}
            {!data.findNicovideoVideoSource &&
              !data.findNicovideoRegistrationRequest && (
                <>
                  {!data.fetchNicovideo.source && (
                    <div>
                      <span className={clsx(["font-mono"])}>{sourceId}</span>
                      に該当する動画は見つかりませんでした．
                    </div>
                  )}
                  {data.fetchNicovideo.source && (
                    <div className={clsx(["flex", "flex-col", "gap-y-4"])}>
                      <OriginalSource
                        fragment={getFragment(
                          RegisterNicovideoPage_OriginalSourceFragmentDoc,
                          data.fetchNicovideo.source
                        )}
                        toggleTag={toggleTag}
                      />
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
