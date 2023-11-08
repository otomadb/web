"use client";

import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";

import Button from "~/components/Button";
import { TextInput2 } from "~/components/TextInput";
import { normalizeSoundcloud } from "~/utils/extractSourceId";

export default function SoundcloudURLForm({
  className,
  style,
  set,
}: {
  className?: string;
  style?: React.CSSProperties;
  set(url: string): void;
}) {
  const [input, setInput] = useState("");
  const parsed = useMemo<{ url: string } | null>(() => {
    const url = normalizeSoundcloud(input);
    if (url) return { url };
    return null;
  }, [input]);

  const handleSubmit = useCallback(() => {
    if (!parsed) return;
    const { url } = parsed;
    set(url);
  }, [parsed, set]);

  return (
    <form
      className={clsx(className, "flex flex-col items-start gap-y-2 p-4")}
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label className={clsx("flex w-full flex-col gap-y-1")}>
        <div className={clsx("text-sm text-slate-400")}>
          SoundCloudのURLの入力
        </div>
        <TextInput2
          size="medium"
          aria-label="SoundCloudのURL"
          placeholder="https://soundcloud.com/keigoooo/hyperflip-donaldcore"
          value={input}
          onChange={(s) => setInput(s)}
          className={clsx("w-full")}
        />
      </label>
      <div className={clsx("mt-auto")}>
        <Button
          submit
          color="blue"
          size="medium"
          text="検索"
          ariaLabel="SoundCloudからの検索"
          disabled={!parsed}
        />
      </div>
    </form>
  );
}
