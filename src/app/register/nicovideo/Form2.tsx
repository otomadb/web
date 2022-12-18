"use client";

import "client-only";

import clsx from "clsx";
import React, {
  ComponentProps,
  Fragment,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useMutation, useQuery } from "urql";

import { FragmentType, getFragment as useFragment, graphql } from "~/gql";
import {
  PseudoTagType,
  RegisterNicovideoPage_CandidateTagFragment,
  RegisterNicovideoPage_CandidateTagFragmentDoc,
  RegisterNicovideoPage_ExactTagDocument,
  RegisterNicovideoPage_RegisterVideoDocument,
  RegisterNicovideoPage_SearchTagCandidatesDocument,
  RegisterVideoInputSourceType,
} from "~/gql/graphql";

import { useNicovideoAPI } from "./useNicovideoAPI";

graphql(`
  fragment RegisterNicovideoPage_CandidateTag on Tag {
    id
    name
    pseudoType
    explicitParent {
      id
      name
    }
  }

  query RegisterNicovideoPage_SearchTagCandidates($query: String!) {
    searchTags(input: { query: $query, limit: 2 }) {
      result {
        matchedName
        tag {
          id
          ...RegisterNicovideoPage_CandidateTag
        }
      }
    }
  }

  query RegisterNicovideoPage_ExactTag($id: ID!) {
    tag(id: $id) {
      id
      ...RegisterNicovideoPage_CandidateTag
    }
  }

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

  mutation RegisterNicovideoPage_RegisterVideo($input: RegisterVideoInput!) {
    registerVideo(input: $input) {
      video {
        id
        title
        tags {
          id
          name
        }
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

export const Candidate: React.FC<
  {
    tag: FragmentType<typeof RegisterNicovideoPage_CandidateTagFragmentDoc>;
  } & Omit<ComponentProps<typeof TagInner>, "className" | "fragment">
> = ({ tag, ...props }) => {
  const fragment = useFragment(
    RegisterNicovideoPage_CandidateTagFragmentDoc,
    tag
  );
  return (
    <Fragment>
      <TagInner fragment={fragment} {...props} />
    </Fragment>
  );
};

export const useIfSkipTag = (tag: string) =>
  useMemo(() => tag.toLowerCase() === "音mad", [tag]);

export const NicovideoTag: React.FC<{
  className?: string;
  tag: string;
  picktags: string[];
  reducer(v: { type: "add" | "remove"; id: string }): void;
}> = ({ className, tag, ...props }) => {
  const unneccesary = useIfSkipTag(tag);

  const [result] = useQuery({
    query: RegisterNicovideoPage_SearchTagCandidatesDocument,
    pause: unneccesary,
    variables: { query: tag },
  });

  return (
    <div className={clsx(className)}>
      <div>
        <div className={clsx(["text-sm"], ["text-slate-900"], ["font-bold"])}>
          {tag}
        </div>
      </div>
      {unneccesary && (
        <p className={clsx(["text-xs"], ["text-slate-500"])}>
          検索対象外のタグです
        </p>
      )}
      {result.data?.searchTags.result && (
        <div className={clsx(["mt-1"])}>
          {result.data.searchTags.result.length === 0 && (
            <p className={clsx(["text-xs"], ["text-slate-500"])}>
              候補が見つかりませんでした
            </p>
          )}
          <div className={clsx(["w-full"], ["flex"], ["gap-x-2"])}>
            {result.data?.searchTags.result.map(({ matchedName, tag }) => (
              <Candidate key={tag.id} tag={tag} {...props} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const TagInner: React.FC<{
  className?: string;
  fragment?: RegisterNicovideoPage_CandidateTagFragment;
  picktags: string[];
  reducer(v: { type: "add" | "remove"; id: string }): void;
}> = ({ className, fragment, picktags, reducer }) => {
  return (
    <div
      tabIndex={0}
      aria-checked={fragment && picktags.includes(fragment?.id)}
      className={clsx(
        className,
        ["group"],
        ["rounded"],
        ["pr-2", "pl-1"],
        ["py-0.5"],
        [
          "border",
          "border-slate-300",
          "border-l-4",
          fragment && tagtypestyle(fragment.pseudoType, "border-l", 400),
        ],
        ["aria-checked:bg-sky-100", ["bg-gray-50", "hover:bg-sky-50"]],
        ["cursor-pointer"]
      )}
      onClick={() => {
        if (fragment)
          reducer({
            type: picktags.includes(fragment.id) ? "remove" : "add",
            id: fragment.id,
          });
      }}
    >
      {fragment && (
        <div
          className={clsx(
            ["ml-1"],
            ["text-xs"],
            [
              "text-slate-900",
              "group-hover:text-sky-700",
              "group-aria-checked:text-sky-900",
            ]
          )}
        >
          {fragment.name}
          {fragment.explicitParent && (
            <span
              className={clsx(
                ["ml-0.5"],
                [
                  "text-slate-500",
                  "group-hover:text-sky-700",
                  "group-aria-checked:text-sky-900",
                ]
              )}
            >
              ({fragment.explicitParent.name})
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export const RegisterTag: React.FC<
  {
    className?: string;
    tagId: string;
  } & Omit<ComponentProps<typeof TagInner>, "className" | "fragment">
> = ({ ...props }) => {
  const [result] = useQuery({
    query: RegisterNicovideoPage_ExactTagDocument,
    variables: { id: props.tagId },
  });
  const fragment = useFragment(
    RegisterNicovideoPage_CandidateTagFragmentDoc,
    result.data?.tag
  );
  return <TagInner fragment={fragment || undefined} {...props} />;
};

export const Form2: React.FC<{ className?: string }> = ({ className }) => {
  const [input, setInput] = useState("");
  const [rawData, setRawData] = useState<
    | undefined
    | {
        id: string;
        title: string;
        tags: string[];
        thumbnails: { original: string; large: string };
      }
  >(undefined);
  const { isLoading } = useNicovideoAPI(input, {
    onSuccess(d) {
      setRawData({
        id: d.id,
        title: d.title,
        tags: d.tags.map((v) => v.value),
        thumbnails: {
          original: d.thumbnail_url.original,
          large: d.thumbnail_url.large,
        },
      });
      setTitle(d.title);
      setId(d.id);
    },
    onError() {
      setRawData(undefined);
    },
  });
  const [id, setId] = useState<undefined | string>(undefined);
  const [title, setTitle] = useState<undefined | string>(undefined);
  const [picktags, setPickTags] = useReducer(
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
    if (typeof title === "undefined") return undefined;
    if (typeof thumbnail === "undefined") return undefined;
    return {
      nicovideoId: input,
      title,
      tags: picktags,
      thumbnail,
    };
  }, [input, picktags, thumbnail, title]);

  return (
    <div className={clsx(className)}>
      <div>
        <input
          aria-label="ID入力"
          className={clsx()}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setId(undefined);
            setTitle(undefined);
            setPickTags({ type: "clean" });
            setThumbnail(undefined);
          }}
        ></input>
      </div>
      <div
        className={clsx(
          ["mt-2"],
          ["bg-gray-100"],
          ["border", "border-gray-300"],
          ["rounded-lg"],
          ["px-8"],
          ["py-4"],
          ["grid"],
          ["grid-cols-2"]
        )}
      >
        <div>
          <p>ニコニコ動画からの情報</p>
          <div>{isLoading && <p>データ取得中</p>}</div>
          {rawData && (
            <div className={clsx()}>
              <div>
                <p className={clsx()}>タイトル</p>
                <p className={clsx(["mt-1"], ["text-sm"], ["font-bold"])}>
                  {rawData.title}
                </p>
              </div>
              <div className={clsx(["mt-4"])}>
                <p>タグ</p>
                <div
                  className={clsx(
                    ["mt-1"],
                    ["grid", ["grid-cols-2"], ["gap-x-2"], ["gap-y-3"]]
                  )}
                >
                  {rawData.tags.map((tag, i) => (
                    <NicovideoTag
                      key={i}
                      tag={tag}
                      picktags={picktags}
                      reducer={setPickTags}
                    />
                  ))}
                </div>
              </div>
              <div className={clsx(["mt-4"])}>
                <p>サムネイル</p>
              </div>
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
                    onClick={() => setThumbnail(rawData.thumbnails.original)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={clsx(["h-32"])}
                      src={rawData.thumbnails.original}
                    />
                  </button>
                </div>
                <div>
                  <div className={clsx(["text-sm"])}>large</div>
                  <button
                    className={clsx(["block"], ["mt-2"])}
                    onClick={() => setThumbnail(rawData.thumbnails.large)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={clsx(["h-32"])}
                      src={rawData.thumbnails.large}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <p>登録される情報</p>
          <div>
            <p>ID</p>
            <p
              className={clsx(["mt-1"], ["w-full"], ["text-sm"], ["font-bold"])}
            >
              {id}
            </p>
          </div>
          <div className={clsx(["mt-4"])}>
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
          <div className={clsx(["mt-4"])}>
            <p>タグ</p>
            <div className={clsx(["mt-1"], ["flex"], ["gap-2"])}>
              {Array.from(picktags).map((id) => (
                <RegisterTag
                  key={id}
                  tagId={id}
                  picktags={picktags}
                  reducer={setPickTags}
                />
              ))}
            </div>
          </div>
          <div className={clsx(["mt-4"])}>
            <p>サムネイル</p>
            {thumbnail && (
              <div className={clsx(["mt-1"])}>
                <img className={clsx(["h-32"])} src={thumbnail} />
              </div>
            )}
          </div>
          <div className={clsx(["mt-4"])}>
            <RegisterButton data={senddata} />
          </div>
        </div>
      </div>
    </div>
  );
};

type SendData = {
  title: string;
  tags: string[];
  thumbnail: string;
  nicovideoId: string;
};

export const RegisterButton: React.FC<{
  className?: string;
  data: SendData | undefined;
}> = ({ className, data }) => {
  const [, trigger] = useMutation(RegisterNicovideoPage_RegisterVideoDocument);

  return (
    <button
      className={clsx(
        className,
        ["rounded"],
        ["px-2", "py-1"],
        ["group"],
        ["bg-blue-400", "hover:bg-blue-600", "disabled:bg-slate-200"]
      )}
      onClick={() => {
        if (!data) return;
        trigger({
          input: {
            primaryTitle: data.title,
            extraTitles: [],
            primaryThumbnail: data.thumbnail,
            tags: data.tags,
            sources: [
              {
                type: RegisterVideoInputSourceType.Nicovideo,
                sourceId: data.nicovideoId,
              },
            ],
          },
        });
      }}
    >
      <span
        className={clsx(
          ["text-blue-50", "group-hover:text-blue-100"],
          ["group-disabled:text-slate-400"]
        )}
      >
        Register
      </span>
    </button>
  );
};
