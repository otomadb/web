"use client";

import "client-only";

import clsx from "clsx";
import React, { useMemo, useReducer, useState } from "react";
import { useQuery } from "urql";

import { LinkLogin } from "~/app/login/Link";
import { getFragment, graphql } from "~/gql";
import {
  EditorRegisterNicovideoPage_AlreadyFragmentDoc,
  RegisterNicovideoPage_FetchNicovideoDocument,
  RegisterNicovideoPage_FetchNicovideoSourceFragmentDoc,
} from "~/gql/graphql";
import { useIsLogin } from "~/hooks/useIsLogin";

import { Already } from "./Already";
import { FetchSource } from "./FetchSource";
import { RegisterForm } from "./RegisterForm";
import { SourceForm } from "./SourceForm";

export const Youhavetologin: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div className={clsx(className, ["flex", "flex-col"])}>
      <p className={clsx(["text-md"], ["text-gray-500"], ["font-bold"])}>
        ログインしてください
      </p>
      <div className={clsx(["mt-2"], ["flex"])}>
        <LinkLogin
          className={clsx(
            ["block"],
            ["rounded"],
            ["px-4", "py-2"],
            ["transition-colors", "duration-75"],
            ["bg-sky-400", "hover:bg-sky-500"],
            ["text-sky-100", "hover:text-sky-200"]
          )}
        >
          Login
        </LinkLogin>
      </div>
    </div>
  );
};

graphql(`
  query RegisterNicovideoPage_FetchNicovideo($sourceId: String!) {
    fetchNicovideo(input: { sourceId: $sourceId }) {
      source {
        ...RegisterNicovideoPage_FetchNicovideoSource
      }
    }
    findNicovideoVideoSource(input: { sourceId: $sourceId }) {
      id
      ...EditorRegisterNicovideoPage_Already
    }
  }
`);
export const RegisterNicovideoForm: React.FC<{ className?: string }> = ({
  className,
}) => {
  const islogin = useIsLogin();

  const [selectedTags, updateSelectedTags] = useReducer(
    (
      state: string[],
      action:
        | { type: "add"; id: string }
        | { type: "remove"; id: string }
        | { type: "clean" }
    ) => {
      switch (action.type) {
        case "add":
          if (state.includes(action.id)) return state;
          return [...state, action.id];
        case "remove":
          return state.filter((a) => a !== action.id);
        case "clean":
          return [];
        default:
          return state;
      }
    },
    []
  );

  const [sourceId, setSourceId] = useState<string>();
  const [{ data, fetching }, refresh] = useQuery({
    query: RegisterNicovideoPage_FetchNicovideoDocument,
    pause: !sourceId,
    variables: sourceId ? { sourceId } : undefined,
    requestPolicy: "cache-and-network",
  });
  const source = useMemo(() => {
    if (fetching) return undefined;
    if (!data?.fetchNicovideo.source) return null;
    return getFragment(
      RegisterNicovideoPage_FetchNicovideoSourceFragmentDoc,
      data.fetchNicovideo.source
    );
  }, [data, fetching]);

  return (
    <div className={clsx(className)}>
      <div>
        <FetchSource setSourceId={(i) => setSourceId(i)} />
      </div>
      <div
        className={clsx(
          ["mt-2"],
          ["bg-gray-100"],
          ["border", "border-gray-300"],
          ["rounded-lg"],
          ["px-4"],
          ["py-4"]
        )}
      >
        {typeof islogin === "boolean" && !islogin && <Youhavetologin />}
        {islogin && (
          <div className={clsx(["grid", ["grid-cols-2"], ["gap-x-4"]])}>
            <div
              className={clsx(
                ["px-4"],
                ["py-4"],
                ["border", "border-gray-300"],
                ["rounded"]
              )}
            >
              <div className={clsx(["text-lg"])}>ニコニコ動画からの情報</div>
              <div className={clsx(["mt-4"])}>
                {sourceId && source === null && (
                  <div>
                    <p className={clsx(["text-sm"], ["text-red-500"])}>
                      動画データの取得に失敗しました。動画は存在しますか？
                    </p>
                  </div>
                )}
                {source && (
                  <SourceForm
                    source={source}
                    isTagSelected={(id) => selectedTags.includes(id)}
                    selectTag={(id) => updateSelectedTags({ type: "add", id })}
                    deselectTag={(id) =>
                      updateSelectedTags({ type: "remove", id })
                    }
                  />
                )}
              </div>
            </div>
            <div
              className={clsx(
                ["px-4"],
                ["py-4"],
                ["border", "border-gray-300"],
                ["rounded"]
              )}
            >
              <p className={clsx(["text-lg"])}>登録される情報</p>
              {data?.findNicovideoVideoSource && (
                <Already
                  className={clsx(["mt-4"])}
                  fragment={getFragment(
                    EditorRegisterNicovideoPage_AlreadyFragmentDoc,
                    data?.findNicovideoVideoSource
                  )}
                />
              )}
              {source && data?.findNicovideoVideoSource === null && (
                <RegisterForm
                  className={clsx(["mt-4"])}
                  sourceId={source.sourceId}
                  title={source.title}
                  thumbnailUrl={source.thumbnailUrl}
                  tags={selectedTags}
                  selectTag={(id) => updateSelectedTags({ type: "add", id })}
                  deselectTag={(id) =>
                    updateSelectedTags({ type: "remove", id })
                  }
                  onRegistered={() => {
                    setSourceId(undefined);
                    updateSelectedTags({ type: "clean" });
                    refresh();
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
