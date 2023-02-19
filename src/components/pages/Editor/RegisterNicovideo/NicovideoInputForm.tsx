"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React, { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { BlueButton } from "~/components/common/Button";

const formSchema = z.object({
  sourceId: z
    .string({ required_error: "ニコニコ動画の動画IDを入力してください" })
    .regex(/(sm)\d+/, {
      message: "ニコニコ動画の動画IDとして正しくありません",
    }),
});
type FormSchema = z.infer<typeof formSchema>;
export const NicovideoInputForm: React.FC<{
  className?: string;
  set(sourceId: string): void;
}> = ({ className, set }) => {
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
      set(sourceId);
      reset({ sourceId: "" });
    },
    [reset, set]
  );

  return (
    <form
      className={clsx(className, ["flex", "flex-col", "items-start"])}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={clsx(["flex", "items-stretch", "gap-x-2"])}>
        <div className={clsx(["flex-grow"])}>
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
        <BlueButton
          type="submit"
          aria-label="検索"
          className={clsx(["py-1"], ["px-4"], ["rounded"], ["cursor-pointer"])}
        >
          検索
        </BlueButton>
      </div>
      <div className={clsx([""])}>
        {errors.sourceId && (
          <p className={clsx(["text-red-400"])}>{errors.sourceId.message}</p>
        )}
      </div>
    </form>
  );
};
