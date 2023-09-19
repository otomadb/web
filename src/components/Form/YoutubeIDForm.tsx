"use client";

import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";

import { BlueButton } from "~/components/Button";
import { TextInput2 } from "~/components/TextInput";

export default function YoutubeIDForm({
  className,
  style,
  set,
}: {
  className?: string;
  style?: React.CSSProperties;
  set(sourceId: string): void;
}) {
  const [input, setInput] = useState("");
  const parsed = useMemo(() => {
    // TODO: チェック
    return { sourceId: input };
  }, [input]);

  const handleSubmit = useCallback(() => {
    if (!parsed) return;
    const { sourceId } = parsed;
    set(sourceId);
  }, [parsed, set]);

  return (
    <form
      className={clsx(
        className,
        ["flex", "flex-col", "items-start", "gap-y-2"],
        ["px-4", "py-4"]
      )}
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label className={clsx(["w-full"], ["flex", "flex-col", "gap-y-1"])}>
        <div className={clsx(["text-slate-400", "text-sm"])}>
          Youtubeの動画IDの入力
        </div>
        <TextInput2
          size="medium"
          aria-label="Youtubeの動画ID"
          placeholder="Q16KpquGsIc"
          value={input}
          onChange={(s) => setInput(s)}
          className={clsx(["w-full"])}
        />
      </label>
      <div className={clsx(["mt-auto"])}>
        <BlueButton
          type="submit"
          aria-label="Youtubeからの検索"
          className={clsx(["py-1"], ["px-4"], ["rounded"], ["cursor-pointer"])}
          disabled={!parsed}
        >
          検索
        </BlueButton>
      </div>
    </form>
  );
}
