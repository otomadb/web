"use client";

import "client-only";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React, { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { useGuard } from "~/app/auth/Guard";
import { SignupPageLink } from "~/app/auth/signup/Link";
import { BlueButton } from "~/components/common/Button";
import { PasswordInput } from "~/components/common/PasswordInput";
import { TextInput } from "~/components/common/TextInput";
import { useToaster } from "~/components/Toaster";
import { useTurnstileGuard } from "~/components/TurnstileGuard";

import { SucceededToast } from "./LoginSucceededToast";
import { useSignin } from "./useSignin";

const formSchema = z.object({
  username: z.string({ required_error: "ユーザーネームを入力してください" }),
  password: z.string({ required_error: "パスワードを入力してください" }),
});
type FormSchema = z.infer<typeof formSchema>;

export const SigninForm: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ className, style }) => {
  const { verify: verifyTurnstile } = useTurnstileGuard();

  const { current, update: updateGuard } = useGuard();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const callToast = useToaster();
  const signin = useSignin({
    onUserNotFound() {
      setError("username", { message: "存在しないユーザーです" });
    },
    onWrongPassword() {
      setError("password", { message: "誤ったパスワード" });
    },
    onSuccess(data) {
      updateGuard();
      callToast(<SucceededToast fragment={data} />);
    },
  });
  const submit = useCallback(
    async ({ username, password }) => {
      if (!(await verifyTurnstile())) return; // TODO: 何らかの警告を出す
      await signin({ username, password });
    },
    [signin, verifyTurnstile]
  ) satisfies SubmitHandler<FormSchema>;

  return (
    <form
      style={style}
      onSubmit={handleSubmit(submit)}
      className={clsx(
        className,
        ["rounded-lg"],
        ["px-8", "py-12"],
        ["flex", "flex-col", "gap-y-2"],
        ["bg-slate-100"],
        ["border", "border-slate-200"],
        ["shadow-lg"]
      )}
    >
      <div className={clsx(["grid"], ["grid-cols-1"], ["gap-y-4"])}>
        <div className={clsx(["flex", "flex-col"])}>
          <label htmlFor="login">
            <span className={clsx(["text-sm", "text-slate-700"])}>
              ユーザーネーム
            </span>
          </label>
          <div className={clsx(["mt-1"], ["w-full"])}>
            <TextInput
              id="login"
              disabled={current !== null}
              className={clsx(
                ["w-full"],
                ["px-4", "py-2"],
                ["rounded-r-md"],
                ["border"]
              )}
              placeholder="ユーザーネーム"
              {...register("username")}
            />
          </div>
          {errors.username && (
            <p className={clsx(["mt-1"], ["text-xs"], ["text-red-600"])}>
              {errors.username.message}
            </p>
          )}
        </div>
        <div className={clsx(["flex", "flex-col"])}>
          <label htmlFor="password">
            <span className={clsx(["text-sm", "text-slate-700"])}>
              パスワード
            </span>
          </label>
          <div className={clsx(["mt-1"], ["w-full"])}>
            <PasswordInput
              id="password"
              disabled={current !== null}
              className={clsx(
                ["w-full"],
                ["px-4", "py-2"],
                ["rounded-r-md"],
                ["border"]
              )}
              placeholder="パスワード"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className={clsx(["mt-1"], ["text-xs"], ["text-red-600"])}>
              {errors.password.message}
            </p>
          )}
        </div>
      </div>
      <div className={clsx(["mt-4"])}>
        <BlueButton
          type="submit"
          disabled={current !== null}
          className={clsx(["w-full"], ["py-2"])}
        >
          ログイン
        </BlueButton>
      </div>
      <div className={clsx(["mt-4"])}>
        <p>
          <SignupPageLink
            className={clsx(
              ["text-blue-400", "hover:text-blue-500"],
              ["text-sm"]
            )}
          >
            ユーザー登録をしていないなら
          </SignupPageLink>
        </p>
      </div>
    </form>
  );
};
