"use client";

import "client-only";

import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React, { useCallback, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "urql";
import * as z from "zod";

import { AuthPageGuardContext } from "~/app/auth/Guard";
import { SignupPageLink } from "~/app/auth/signup/Link";
import { BlueButton } from "~/components/common/Button";
import { PasswordInput } from "~/components/common/PasswordInput";
import { TextInput } from "~/components/common/TextInput";
import { useTurnstileGuard } from "~/components/TurnstileGuard";
import { graphql } from "~/gql";
import { SigninFailedMessage } from "~/gql/graphql";

import { InputWithIcon } from "../InputWithIcon";

const formSchema = z.object({
  username: z.string({ required_error: "ユーザーネームを入力してください" }),
  password: z.string({ required_error: "パスワードを入力してください" }),
});
type FormSchema = z.infer<typeof formSchema>;

export const SigninForm: React.FC<{ className?: string }> = ({ className }) => {
  const { verify: verifyTurnstile } = useTurnstileGuard();

  const updateGuard = useContext(AuthPageGuardContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const [, signin] = useMutation(
    graphql(`
      mutation SigninPage_Signin($username: String!, $password: String!) {
        signin(input: { username: $username, password: $password }) {
          ... on SigninSucceededPayload {
            user {
              id
              ...GlobalNav_Profile
            }
          }
          ... on SigninFailedPayload {
            message
          }
        }
      }
    `)
  );
  const onSubmit: SubmitHandler<FormSchema> = useCallback(
    async ({ username, password }) => {
      if (!(await verifyTurnstile())) {
        // TODO: 何らかの警告を出す
        return;
      }

      const { data, error } = await signin({ username, password });
      if (error || !data) {
        // TODO: エラー処理
        return;
      }
      switch (data.signin.__typename) {
        case "SigninSucceededPayload":
          updateGuard();
          return;
        case "SigninFailedPayload":
          {
            const { message } = data.signin;
            switch (message) {
              case SigninFailedMessage.UserNotFound:
                setError("username", { message: "存在しないユーザーです" });
                break;
              case SigninFailedMessage.WrongPassword:
                setError("password", { message: "誤ったパスワード" });
                break;
            }
          }
          return;
      }
    },
    [setError, signin, updateGuard, verifyTurnstile]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        className,
        ["rounded-lg"],
        ["px-8", "pt-[3rem]", "pb-[calc(3rem-0.25rem)]"],
        ["flex", "flex-col", "gap-y-2"],
        ["bg-slate-100"],
        ["border", "border-slate-200"],
        ["shadow-lg"]
      )}
    >
      <div className={clsx(["grid"], ["grid-cols-1"], ["gap-y-4"])}>
        <label className={clsx(["flex", "flex-col"])}>
          <InputWithIcon
            Icon={AtSymbolIcon}
            Input={(props) => (
              <TextInput
                {...props}
                {...register("username")}
                placeholder="ユーザーネーム"
              />
            )}
          />
          {errors.username && (
            <p className={clsx(["mt-1"], ["text-xs"], ["text-red-600"])}>
              {errors.username.message}
            </p>
          )}
        </label>
        <label className={clsx(["flex", "flex-col"])}>
          <InputWithIcon
            Icon={LockClosedIcon}
            Input={(props) => (
              <PasswordInput
                {...props}
                {...register("password")}
                placeholder="パスワード"
              />
            )}
          />
          {errors.password && (
            <p className={clsx(["mt-1"], ["text-xs"], ["text-red-600"])}>
              {errors.password.message}
            </p>
          )}
        </label>
      </div>
      <div>
        <BlueButton className={clsx(["w-full"], ["py-2"])}>ログイン</BlueButton>
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
