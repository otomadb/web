"use client";

import "client-only";

import clsx from "clsx";
import Link from "next/link";
import React, { useMemo, useReducer, useState } from "react";

import { graphql } from "~/gql";
import { PseudoTagType } from "~/gql/graphql";
import { useIsLogin } from "~/hooks/useIsLogin";

import { InputID } from "./InputID";
import { NicovideoTag } from "./NicovideoTag";
import { RegisterButton, SendData } from "./RegisterButton";
import { RegisterTag } from "./RegisterTag";
import { useNicovideoAPI } from "./useNicovideoAPI";

graphql(`
  query RegisterNicovideoPage_FindNicovideoSource($id: ID!) {
    findNicovideoVideoSource(sourceId: $id) {
      id
      video {
        id
        title
        thumbnailUrl
      }
    }
  }
`);

export const tagtypestyle = (type: PseudoTagType, prefix: string, s = 400) => [
  {
    [`${prefix}-character-${s}`]: type === PseudoTagType.Character,
    [`${prefix}-music-${s}`]: type === PseudoTagType.Music,
    [`${prefix}-copyright-${s}`]: type === PseudoTagType.Copyright,
    [`${prefix}-event-${s}`]: type === PseudoTagType.Event,
    [`${prefix}-series-${s}`]: type === PseudoTagType.Series,
  },
];

export const Form2: React.FC<{ className?: string }> = ({ className }) => {
  const islogin = useIsLogin();

  const [input, setInput] = useState<string | undefined>();
  const [remote, setRemote] = useState<
    | null
    | undefined
    | {
        id: string;
        title: string;
        tags: string[];
        thumbnails: { original: string; large: string };
      }
  >(undefined);
  const { isLoading: remoteLoading } = useNicovideoAPI(input, {
    onSuccess({ id, title, tags, thumbnail_url }) {
      setRemote({
        id,
        title,
        tags: tags.map((v) => v.value),
        thumbnails: {
          original: thumbnail_url.original,
          large: thumbnail_url.large,
        },
      });
      setTitle(title);
      setId(id);
    },
    onError() {
      setRemote(null);
    },
  });

  const [id, setId] = useState<undefined | string>(undefined);
  const [title, setTitle] = useState<undefined | string>(undefined);
  const [picktags, updateTags] = useReducer(
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
  const [thumbnail, setThumbnail] = useState<string | undefined>();
  const senddata = useMemo<SendData | undefined>(() => {
    if (typeof id === "undefined") return undefined;
    if (typeof title === "undefined") return undefined;
    if (typeof thumbnail === "undefined") return undefined;
    return {
      nicovideoId: id,
      title,
      tags: picktags,
      thumbnail,
    };
  }, [id, picktags, thumbnail, title]);

  return (
    <div className={clsx(className)}>
      <div>
        <InputID
          handleClick={(i) => {
            setId(undefined);
            setTitle(undefined);
            updateTags({ type: "clean" });
            setThumbnail(undefined);
            setInput(i);
          }}
        />
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
              <div>{remoteLoading && <p>データ取得中</p>}</div>
              {remote === undefined && (
                <div className={clsx(["mt-1"])}>
                  <p className={clsx(["text-sm"], ["text-slate-500"])}>
                    IDを入力してください
                  </p>
                </div>
              )}
              {remote === null && (
                <div className={clsx(["mt-1"])}>
                  <p className={clsx(["text-sm"], ["text-red-500"])}>
                    動画データの取得に失敗しました。動画は存在しますか？
                  </p>
                </div>
              )}
              {remote && (
                <div className={clsx(["flex", ["flex-col"]], ["gap-y-4"])}>
                  <div>
                    <p className={clsx()}>タイトル</p>
                    <p className={clsx(["mt-1"], ["text-sm"], ["font-bold"])}>
                      {remote.title}
                    </p>
                  </div>
                  <div className={clsx()}>
                    <p>タグ</p>
                    <div
                      className={clsx(
                        ["mt-1"],
                        ["grid", ["grid-cols-2"], ["gap-x-2"], ["gap-y-3"]]
                      )}
                    >
                      {remote.tags.map((tag, i) => (
                        <NicovideoTag
                          key={i}
                          tag={tag}
                          picktags={picktags}
                          reducer={updateTags}
                        />
                      ))}
                    </div>
                  </div>
                  <div className={clsx()}>
                    <p>サムネイル</p>
                    <div
                      className={clsx(
                        ["mt-1"],
                        ["grid", ["grid-cols-2"], ["gap-x-2"], ["gap-y-3"]]
                      )}
                    >
                      <div>
                        <div className={clsx(["text-sm"])}>original</div>
                        <button
                          className={clsx(["block"], ["mt-2"])}
                          onClick={() =>
                            setThumbnail(remote.thumbnails.original)
                          }
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className={clsx(["h-32"])}
                            src={remote.thumbnails.original}
                          />
                        </button>
                      </div>
                      <div>
                        <div className={clsx(["text-sm"])}>large</div>
                        <button
                          className={clsx(["block"], ["mt-2"])}
                          onClick={() => setThumbnail(remote.thumbnails.large)}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className={clsx(["h-32"])}
                            src={remote.thumbnails.large}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <p>登録される情報</p>
              {remote && (
                <div
                  className={clsx(
                    ["mt-4"],
                    ["flex", ["flex-col"]],
                    ["gap-y-4"]
                  )}
                >
                  <div>
                    <p>ID</p>
                    <p
                      className={clsx(
                        ["mt-1"],
                        ["w-full"],
                        ["text-sm"],
                        ["font-bold"]
                      )}
                    >
                      {id}
                    </p>
                  </div>
                  <div>
                    <p>タイトル</p>
                    <input
                      type={"text"}
                      value={title}
                      className={clsx(
                        ["mt-1"],
                        ["px-2"],
                        ["py-1"],
                        ["w-full"],
                        ["text-sm"],
                        ["font-bold"],
                        ["bg-gray-50"],
                        ["border", "border-gray-300"],
                        ["rounded"]
                      )}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div>
                    <p>タグ</p>
                    <div className={clsx(["mt-1"], ["flex"], ["gap-2"])}>
                      {Array.from(picktags).map((id) => (
                        <RegisterTag
                          key={id}
                          tagId={id}
                          picktags={picktags}
                          reducer={updateTags}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p>サムネイル</p>
                    {thumbnail && (
                      <div className={clsx(["mt-1"])}>
                        <img className={clsx(["h-32"])} src={thumbnail} />
                      </div>
                    )}
                  </div>
                  <div>
                    <RegisterButton data={senddata} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
