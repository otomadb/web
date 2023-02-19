"use client";
import "client-only";

import clsx from "clsx";
import { useEffect } from "react";
import { useQuery } from "urql";

import { getFragment, graphql } from "~/gql";
import {
  EditorRegisterNicovideoPage_SourceAlreadyRegisteredFragmentDoc,
  RegisterNicovideoPage_OriginalSourceFragmentDoc,
  RegisterNicovideoPage_SourceCheckerDocument,
} from "~/gql/graphql";

import { OriginalSource } from "./OriginalSource";
import { SourceAlreadyExists as SourceAlreadyRegistered } from "./SourceAlreadyRegistered";

graphql(`
  query RegisterNicovideoPage_SourceChecker($sourceId: String!) {
    fetchNicovideo(input: { sourceId: $sourceId }) {
      source {
        title
        thumbnailUrl
        ...RegisterNicovideoPage_OriginalSource
      }
    }
    findNicovideoVideoSource(input: { sourceId: $sourceId }) {
      id
      ...EditorRegisterNicovideoPage_SourceAlreadyRegistered
    }
  }
`);
export const SourceChecker: React.FC<{
  className?: string;
  sourceId: string;
  toggleTag: (id: string) => void;
  setSource: (
    source: undefined | { title: string; thumbnailUrl: string }
  ) => void;
  setNotyet(already: boolean): void;
}> = ({ className, sourceId, toggleTag, setSource, setNotyet }) => {
  const [{ data }] = useQuery({
    query: RegisterNicovideoPage_SourceCheckerDocument,
    variables: { sourceId },
    requestPolicy: "cache-and-network",
  });

  useEffect(
    () => {
      if (!data) return;
      if (data?.findNicovideoVideoSource) {
        setNotyet(false);
        return;
      }
      if (!data?.fetchNicovideo.source) {
        setSource(undefined);
        return;
      }

      setNotyet(true);

      const { title, thumbnailUrl } = data.fetchNicovideo.source;
      setSource({ title, thumbnailUrl });
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
              <SourceAlreadyRegistered
                fragment={getFragment(
                  EditorRegisterNicovideoPage_SourceAlreadyRegisteredFragmentDoc,
                  data.findNicovideoVideoSource
                )}
              />
            )}
            {!data.findNicovideoVideoSource && !data.fetchNicovideo.source && (
              <div>
                <span className={clsx(["font-mono"])}>{sourceId}</span>
                に該当する動画は見つかりませんでした．
              </div>
            )}
            {!data.findNicovideoVideoSource && data.fetchNicovideo.source && (
              <OriginalSource
                fragment={getFragment(
                  RegisterNicovideoPage_OriginalSourceFragmentDoc,
                  data.fetchNicovideo.source
                )}
                toggleTag={toggleTag}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
