"use client";

import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";

import Button from "~/components/Button";
import { TextInput2 } from "~/components/TextInput";
import { extractYoutubeSourceId } from "~/utils/extractSourceId";

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
    const sourceId = extractYoutubeSourceId(input);
    if (sourceId) return { sourceId };
    return null;
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
          placeholder="https://www.youtube.com/watch?v=Q16KpquGsIc"
          value={input}
          onChange={(s) => setInput(s)}
          className={clsx(["w-full"])}
        />
      </label>
      <div className={clsx(["mt-auto"])}>
        <Button
          submit
          color="blue"
          size="medium"
          text="検索"
          ariaLabel="ニコニコ動画からの検索"
          disabled={!parsed}
        />
      </div>
    </form>
  );
}
