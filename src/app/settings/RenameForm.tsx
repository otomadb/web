"use client";

import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import Button from "~/components/Button";
import { TextInput } from "~/components/TextInput";
import { useToaster } from "~/components/Toaster";

import useRename from "./useRename";

export default function RenameForm({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const formSchema = z.object({
    renameTo: z
      .string()
      .min(1, { message: "1文字以上の名前にしてください。" })
      .max(20, "20文字以下の名前にしてください。"),
  });
  type FormSchema = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [reset, isSubmitSuccessful]);

  const callToast = useToaster();
  const [{ fetching }, rename] = useRename({
    onSucceeded({ user: { displayName } }) {
      callToast(
        <p className={clsx(["text-slate-900"])}>
          名前を<span className={clsx(["font-bold"])}>{displayName}</span>
          に変更しました
        </p>
      );
    },
  });

  return (
    <form
      onSubmit={handleSubmit(({ renameTo }) => rename(renameTo))}
      style={style}
      className={clsx(className, ["flex", "items-start", "gap-x-2"])}
    >
      <div className={clsx(["relative"])}>
        <TextInput
          {...register("renameTo")}
          disabled={fetching}
          className={clsx(["w-72"], ["px-2"], ["py-1"])}
          placeholder="新しい表示名"
        />
        <ErrorMessage
          errors={errors}
          name="renameTo"
          render={({ message }) => (
            <p className={clsx(["mt-1"], ["text-red-400", "text-xs"])}>
              {message}
            </p>
          )}
        />
      </div>
      <Button
        submit
        className={clsx(["flex-shrink-0"])}
        color="blue"
        size="small"
        icon="plus"
        text="変更"
        disabled={!fetching}
      />
    </form>
  );
}
