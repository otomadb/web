import clsx from "clsx";
import Image from "next/image";
import React, { useMemo, useReducer, useState } from "react";

import { RegisterButton, SendData } from "./RegisterButton";
import { RegisterTag } from "./RegisterTag";
import { TagAdder } from "./TagAdder";

export const RegisterForm: React.FC<{
  className?: string;
  init: {
    sourceId: string;
    title: string;
    thumbnailUrl: string | undefined;
  };
  onRegistered(): void;
}> = ({ className, init, onRegistered: clearRemote }) => {
  const nicovideoId = useMemo(() => init.sourceId, [init.sourceId]);
  const [title, setTitle] = useState(init.title);

  const thumbnailUrl = useMemo(() => init.thumbnailUrl, [init.thumbnailUrl]);

  const [registerTags, updateRegisterTags] = useReducer(
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
  const registerData = useMemo<SendData | undefined>(() => {
    if (typeof nicovideoId === "undefined") return undefined;
    if (typeof title === "undefined") return undefined;
    if (typeof thumbnailUrl === "undefined") return undefined;
    return {
      nicovideoId,
      title,
      tags: registerTags,
      thumbnail: thumbnailUrl,
    };
  }, [nicovideoId, registerTags, thumbnailUrl, title]);

  return (
    <div className={clsx(className, ["flex", ["flex-col"]], ["gap-y-4"])}>
      <div>
        <p>動画ID</p>
        <p className={clsx(["mt-1"], ["w-full"], ["text-sm"], ["font-bold"])}>
          {nicovideoId}
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
        <div className={clsx(["mt-1"])}>
          <div
            className={clsx(
              ["flex", ["items-center"], ["flex-wrap"]],
              ["gap-2"]
            )}
          >
            {Array.from(registerTags).map((id) => (
              <RegisterTag
                key={id}
                tagId={id}
                currentTags={registerTags}
                reducer={updateRegisterTags}
              />
            ))}
            <TagAdder
              className={clsx(["w-48"])}
              select={(id) => updateRegisterTags({ type: "add", id })}
            />
          </div>
        </div>
      </div>
      <div>
        <p>サムネイル</p>
        <div className={clsx(["mt-1"])}>
          {thumbnailUrl && (
            <Image
              className={clsx(["object-scale-down"], ["h-32"])}
              src={thumbnailUrl}
              width={260}
              height={200}
              alt={`${title}のサムネイル候補`}
            />
          )}
          {!thumbnailUrl && (
            <p className={clsx(["text-sm"], ["text-slate-500"])}>
              サムネイル画像を指定してください．
            </p>
          )}
        </div>
      </div>
      <div>
        <RegisterButton
          senddata={registerData}
          onSuccess={() => {
            clearRemote();
          }}
        />
      </div>
    </div>
  );
};
