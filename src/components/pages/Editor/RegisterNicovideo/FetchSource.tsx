"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  sourceId: z
    .string({ required_error: "ニコニコ動画の動画IDを入力してください" })
    .regex(/(sm)\d+/, {
      message: "ニコニコ動画の動画IDとして正しくありません",
    }),
});
type FormSchema = z.infer<typeof formSchema>;

export const FetchSource: React.FC<{
  className?: string;
  setSourceId(sourceId: string): void;
}> = ({ className, setSourceId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(({ sourceId }) => setSourceId(sourceId))}
      className={clsx(className, ["flex", ["items-stretch"]])}
    >
      <div>
        <input
          {...register("sourceId")}
          aria-label="ID入力"
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
      </div>
      <button
        type="submit"
        aria-label="検索"
        className={clsx(
          ["ml-1"],
          ["bg-blue-400", "hover:bg-blue-500"],
          ["text-blue-50", "hover:text-blue-100"],
          ["px-4"],
          ["rounded"],
          ["cursor-pointer"],
          ["flex", "items-center"]
        )}
      >
        検索
      </button>
    </form>
  );
};
