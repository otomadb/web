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
import { LinkSignup } from "~/app/auth/signup/Link";
import { graphql } from "~/gql";
import { SigninFailedMessage } from "~/gql/graphql";

import { AuthFormButton } from "../Button";
import { AuthFormInput } from "../FormInput";

const formSchema = z.object({
  username: z.string({ required_error: "ユーザーネームを入力してください" }),
  password: z.string({ required_error: "パスワードを入力してください" }),
});
type FormSchema = z.infer<typeof formSchema>;

export const SigninForm: React.FC<{ className?: string }> = ({ className }) => {
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
    [setError, signin, updateGuard]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        className,
        ["rounded-lg"],
        ["px-8", "pt-[3rem]", "pb-[calc(3rem-0.25rem)]"],
        ["flex", "flex-col"],
        ["bg-slate-100"],
        ["border", "border-slate-200"],
        ["shadow-lg"]
      )}
    >
      <div className={clsx(["grid"], ["grid-cols-1"], ["gap-y-4"])}>
        <AuthFormInput
          Input={(props) => (
            <input
              {...register("username")}
              {...props}
              type={"text"}
              placeholder="ユーザーネーム"
            ></input>
          )}
          Icon={(props) => <AtSymbolIcon {...props} />}
          error={errors.username}
        />
        <AuthFormInput
          Icon={(props) => <LockClosedIcon {...props} />}
          Input={(props) => (
            <input
              {...register("password")}
              {...props}
              type={"password"}
              placeholder="パスワード"
            ></input>
          )}
          error={errors.password}
        />
      </div>
      <AuthFormButton className={clsx("mt-6")} text="ログイン" />
      <div className={clsx(["mt-4"])}>
        <p>
          <LinkSignup
            className={clsx(
              ["text-blue-400", "hover:text-blue-500"],
              ["text-sm"]
            )}
          >
            ユーザー登録をしていないなら
          </LinkSignup>
        </p>
      </div>
    </form>
  );
};
