import clsx from "clsx";
import Image from "next/image";
import React, { useMemo, useState } from "react";

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

  selectedTags: string[];
  selectTag(id: string): void;
  deselectTag(id: string): void;

  onRegistered(): void;
}> = ({
  className,
  init,
  selectedTags,
  deselectTag,
  selectTag,
  onRegistered,
}) => {
  const nicovideoId = useMemo(() => init.sourceId, [init.sourceId]);
  const [title, setTitle] = useState(init.title);

  const thumbnailUrl = useMemo(() => init.thumbnailUrl, [init.thumbnailUrl]);

  const registerData = useMemo<SendData | undefined>(() => {
    if (typeof nicovideoId === "undefined") return undefined;
    if (typeof title === "undefined") return undefined;
    if (typeof thumbnailUrl === "undefined") return undefined;
    return {
      nicovideoId,
      title,
      tags: selectedTags,
      thumbnail: thumbnailUrl,
    };
  }, [nicovideoId, selectedTags, thumbnailUrl, title]);

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
            {selectedTags.map((id) => (
              <RegisterTag key={id} id={id} deselect={() => deselectTag(id)} />
            ))}
            <TagAdder
              className={clsx(["w-48"])}
              select={(id) => selectTag(id)}
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
            onRegistered();
          }}
        />
      </div>
    </div>
  );
};
