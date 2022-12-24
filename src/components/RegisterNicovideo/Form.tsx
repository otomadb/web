"use client";

import "client-only";

import clsx from "clsx";
import Link from "next/link";
import React, { useReducer, useState } from "react";

import { useIsLogin } from "~/hooks/useIsLogin";

import { Already } from "./Already";
import { FetchSource, SourceData } from "./FetchSource";
import { RegisterForm } from "./Register/RegisterForm";
import { SourceForm } from "./Source/SourceForm";
import { useIsAlready } from "./useIsAlready";

export const Youhavetologin: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div className={clsx(className, ["flex", "flex-col"])}>
      <p className={clsx(["text-md"], ["text-gray-500"], ["font-bold"])}>
        ログインしてください
      </p>
      <div className={clsx(["mt-2"], ["flex"])}>
        <Link
          href={"/login"}
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
        </Link>
      </div>
    </div>
  );
};

export const RegisterNicovideoForm: React.FC<{ className?: string }> = ({
  className,
}) => {
  const islogin = useIsLogin();

  const [source, setSource] = useState<null | undefined | SourceData>(
    undefined
  );
  const already = useIsAlready(source?.sourceId);

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

  return (
    <div className={clsx(className)}>
      <div>
        <FetchSource
          setSource={(data) => {
            setSource(data);
            updateSelectedTags({ type: "clean" });
          }}
        />
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
              <p className={clsx(["text-lg"])}>ニコニコ動画からの情報</p>
              <div className={clsx(["mt-4"])}>
                {source === null && (
                  <p className={clsx(["text-sm"], ["text-red-500"])}>
                    動画データの取得に失敗しました。動画は存在しますか？
                  </p>
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
              {already && (
                <Already className={clsx(["mt-4"])} source={already} />
              )}
              {source && already === null && (
                <RegisterForm
                  className={clsx(["mt-4"])}
                  sourceId={source.sourceId}
                  title={source.title}
                  thumbnailUrl={source.thumbnail}
                  tags={selectedTags}
                  selectTag={(id) => updateSelectedTags({ type: "add", id })}
                  deselectTag={(id) =>
                    updateSelectedTags({ type: "remove", id })
                  }
                  onRegistered={() => {
                    setSource(undefined);
                    updateSelectedTags({ type: "clean" });
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
