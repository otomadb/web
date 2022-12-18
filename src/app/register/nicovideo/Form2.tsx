"use client";

import "client-only";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useReducer, useState } from "react";
import { useQuery } from "urql";

import { VideoLink } from "~/components/Link";
import { graphql } from "~/gql";
import {
  PseudoTagType,
  RegisterNicovideoPage_AlreadyCheckDocument,
} from "~/gql/graphql";
import { useIsLogin } from "~/hooks/useIsLogin";

import { RegisterButton, SendData } from "./RegisterButton";
import { RegisterTag } from "./RegisterTag";
import { SourceIDInput } from "./SourceIDInput";
import { NicovideoTag } from "./SourceTag";

graphql(`
  query RegisterNicovideoPage_AlreadyCheck($id: ID!) {
    findNicovideoVideoSource(sourceId: $id) {
      id
      sourceId
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

  const [{ data: alreadyCheckData }] = useQuery({
    query: RegisterNicovideoPage_AlreadyCheckDocument,
    pause: !id,
    variables: id ? { id } : undefined,
    requestPolicy: "network-only",
  });

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
        <SourceIDInput
          setRemote={(data) => {
            setRemote(data);
            if (data) {
              setId(data.id);
              setTitle(data.title);
            }
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
          <div className={clsx(["mt-4"], ["flex", "flex-col"])}>
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
              {remote === null && (
                <div className={clsx(["mt-4"])}>
                  <p className={clsx(["text-sm"], ["text-red-500"])}>
                    動画データの取得に失敗しました。動画は存在しますか？
                  </p>
                </div>
              )}
              {remote && (
                <div
                  className={clsx(
                    ["mt-4"],
                    ["flex", ["flex-col"]],
                    ["gap-y-4"]
                  )}
                >
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
                          sourceTagName={tag}
                          currentTags={picktags}
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
                        <div
                          role="button"
                          className={clsx(["block"], ["mt-2"])}
                          onClick={() =>
                            setThumbnail(remote.thumbnails.original)
                          }
                        >
                          <Image
                            className={clsx(["object-scale-down"], ["h-32"])}
                            src={remote.thumbnails.original}
                            width={260}
                            height={200}
                            alt={`${remote.id}のオリジナルのサムネイル`}
                          />
                        </div>
                      </div>
                      <div>
                        <div className={clsx(["text-sm"])}>large</div>
                        <div
                          role="button"
                          className={clsx(["block"], ["mt-2"])}
                          onClick={() => setThumbnail(remote.thumbnails.large)}
                        >
                          <Image
                            className={clsx(["object-scale-down"], ["h-32"])}
                            src={remote.thumbnails.large}
                            width={260}
                            height={200}
                            alt={`${remote.id}の大きいサムネイル`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <p>登録される情報</p>
              {alreadyCheckData?.findNicovideoVideoSource && (
                <div className={clsx(["mt-4"], ["flex", ["flex-col"]])}>
                  <VideoLink
                    videoId={alreadyCheckData.findNicovideoVideoSource.video.id}
                  >
                    <Image
                      className={clsx(["object-scale-down"], ["h-32"])}
                      src={
                        alreadyCheckData.findNicovideoVideoSource.video
                          .thumbnailUrl
                      }
                      width={260}
                      height={200}
                      alt={
                        alreadyCheckData.findNicovideoVideoSource.video.title
                      }
                      priority={true}
                    />
                  </VideoLink>
                  <p
                    className={clsx(["mt-2"], ["text-sm"], ["text-slate-700"])}
                  >
                    <span className={clsx(["font-mono"])}>
                      {alreadyCheckData.findNicovideoVideoSource.sourceId}
                    </span>
                    は
                    <VideoLink
                      videoId={
                        alreadyCheckData.findNicovideoVideoSource.video.id
                      }
                      className={clsx(["font-bold"], ["text-slate-900"])}
                    >
                      {alreadyCheckData.findNicovideoVideoSource.video.title}
                    </VideoLink>
                    として既に登録されています。
                  </p>
                </div>
              )}
              {remote &&
                alreadyCheckData?.findNicovideoVideoSource === null && (
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
                            currentTags={picktags}
                            reducer={updateTags}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p>サムネイル</p>

                      <div className={clsx(["mt-1"])}>
                        {thumbnail && (
                          <Image
                            className={clsx(["object-scale-down"], ["h-32"])}
                            src={thumbnail}
                            width={260}
                            height={200}
                            alt={`${remote.id}のサムネイル候補`}
                          />
                        )}
                        {!thumbnail && (
                          <p className={clsx(["text-sm"], ["text-slate-500"])}>
                            サムネイル画像を指定してください．
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <RegisterButton
                        senddata={senddata}
                        onSuccess={() => {
                          setRemote(undefined);
                        }}
                      />
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
