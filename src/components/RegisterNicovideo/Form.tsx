"use client";

import "client-only";

import clsx from "clsx";
import Link from "next/link";
import React, { useReducer, useState } from "react";

import { useIsLogin } from "~/hooks/useIsLogin";

import { Already } from "./Already";
import { SourceData, SourceIDInput } from "./FetchSource";
import { RegisterForm } from "./Register/RegisterForm";
import { SourceForm } from "./Source/SourceForm";
import { useIsAlready } from "./useIsAlready";

export const RegisterNicovideoForm: React.FC<{ className?: string }> = ({
  className,
}) => {
  const islogin = useIsLogin();

  const [source, setSource] = useState<null | undefined | SourceData>(
    undefined
  );
  const already = useIsAlready(source?.id);

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
  const [selectedThumbnail, setSelectedThumbnail] = useState<
    string | undefined
  >();

  return (
    <div className={clsx(className)}>
      <div>
        <SourceIDInput setSource={(data) => setSource(data)} />
      </div>
      <div
        className={clsx(
          ["mt-2"],
          ["bg-gray-100"],
          ["border", "border-gray-300"],
          ["rounded-lg"],
          ["px-8"],
          ["py-6"]
        )}
      >
        {typeof islogin === "boolean" && !islogin && (
          <div className={clsx(["flex", "flex-col"])}>
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
        )}
        {islogin && (
          <div className={clsx(["grid", ["grid-cols-2"]])}>
            <div>
              <p>ニコニコ動画からの情報</p>
              {source === null && (
                <div className={clsx(["mt-4"])}>
                  <p className={clsx(["text-sm"], ["text-red-500"])}>
                    動画データの取得に失敗しました。動画は存在しますか？
                  </p>
                </div>
              )}
              {source && (
                <SourceForm
                  className={clsx(["mt-4"])}
                  source={source}
                  isTagSelected={(id) => selectedTags.includes(id)}
                  selectTag={(id) => updateSelectedTags({ type: "add", id })}
                  deselectTag={(id) =>
                    updateSelectedTags({ type: "remove", id })
                  }
                  selectThumbnail={(url) => setSelectedThumbnail(url)}
                />
              )}
            </div>
            <div>
              <p>登録される情報</p>
              {already && (
                <Already className={clsx(["mt-4"])} source={already} />
              )}
              {source && already === null && (
                <RegisterForm
                  className={clsx(["mt-4"])}
                  init={{
                    sourceId: source.id,
                    title: source.title,
                    thumbnailUrl: selectedThumbnail,
                  }}
                  onRegistered={() => {
                    setSource(undefined);
                    updateSelectedTags({ type: "clean" });
                    setSelectedThumbnail(undefined);
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
