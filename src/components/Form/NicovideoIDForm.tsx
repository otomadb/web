"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { BlueButton } from "~/components/Button";
import { extractNicovideoSourceId } from "~/utils/extractSourceId";

import { TextInput2 } from "../TextInput";

const formSchema = z.object({
  sourceId: z
    .string({ required_error: "ニコニコ動画の動画IDを入力してください" })
    .regex(/(sm)\d+/, {
      message: "ニコニコ動画の動画IDとして正しくありません",
    }),
});
type FormSchema = z.infer<typeof formSchema>;
export const SourceIdForm: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  setSourceId(sourceId: string): void;
}> = ({ className, setSourceId, style }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<FormSchema> = useCallback(
    ({ sourceId }) => {
      setSourceId(sourceId);
      reset({ sourceId: "" });
    },
    [reset, setSourceId]
  );

  return (
    <form
      className={clsx(className, [
        "flex",
        "flex-col",
        "items-start",
        "gap-y-2",
      ])}
      style={style}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>ニコニコ動画の動画IDの入力</div>
      <div className={clsx(["flex", "flex-col", "gap-y-1"])}>
        <div
          className={clsx(["flex-grow"], ["flex", "items-stretch", "gap-x-2"])}
        >
          <input
            {...register("sourceId")}
            aria-label="ニコニコ動画の動画ID"
            className={clsx(
              ["px-2"],
              ["py-1"],
              ["font-mono"],
              ["bg-white"],
              ["border", "border-gray-300"],
              ["rounded"]
            )}
            placeholder="sm2057168"
          />
          <BlueButton
            type="submit"
            aria-label="ニコニコ動画からの検索"
            className={clsx(
              ["py-1"],
              ["px-4"],
              ["rounded"],
              ["cursor-pointer"]
            )}
          >
            検索
          </BlueButton>
        </div>
        {errors.sourceId && (
          <div className={clsx(["text-xs", "text-red-400"])}>
            {errors.sourceId.message}
          </div>
        )}
      </div>
    </form>
  );
};

export default function NicovideoIDForm({
  className,
  style,
  set,
}: {
  className?: string;
  style?: React.CSSProperties;
  set(sourceId: string): void;
}) {
  const [input, setInput] = useState("");
  const parsed = useMemo<{ sourceId: string } | null>(() => {
    const sourceId = extractNicovideoSourceId(input);
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
          ニコニコ動画の動画IDの入力
        </div>
        <TextInput2
          size="medium"
          aria-label="ニコニコ動画の動画ID"
          placeholder="https://www.nicovideo.jp/watch/sm2057168"
          value={input}
          onChange={(s) => setInput(s)}
          className={clsx(["w-full"])}
        />
      </label>
      <div className={clsx(["mt-auto"])}>
        <BlueButton
          type="submit"
          aria-label="ニコニコ動画からの検索"
          className={clsx(["py-1"], ["px-4"], ["rounded"], ["cursor-pointer"])}
          disabled={!parsed}
        >
          検索
        </BlueButton>
      </div>
    </form>
  );
}
