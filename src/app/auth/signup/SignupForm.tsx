"use client";

import "client-only";

import {
  AtSymbolIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import clsx from "clsx";
import React, { useCallback, useContext, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "urql";
import * as z from "zod";

import { AuthPageGuardContext } from "~/app/auth/Guard";
import { SigninLinkPage } from "~/app/auth/signin/Link";
import { BlueButton } from "~/components/common/Button";
import { PasswordInput } from "~/components/common/PasswordInput";
import { TextInput } from "~/components/common/TextInput";
import { graphql } from "~/gql";
import { TurnstileVerifyResponse } from "~/turnstile";

import { InputWithIcon } from "../InputWithIcon";

const formSchema = z.object({
  name: z.string().min(3, { message: "ユーザーネームは3文字以上です" }),
  displayName: z.string().min(1, { message: "1文字以上" }),
  email: z.string().email({ message: "メールアドレスの形式でない" }),
  password: z.string().min(8, { message: "パスワードは8文字以上" }),
  passwordRepeat: z.string().min(8, { message: "パスワードは8文字以上" }),
});
type FormSchema = z.infer<typeof formSchema>;
export const SignupForm: React.FC<{ className?: string }> = ({ className }) => {
  const updateGuard = useContext(AuthPageGuardContext);

  const turnstileRef = useRef<TurnstileInstance>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const [, signup] = useMutation(
    graphql(`
      mutation SignupPage_Signup(
        $name: String!
        $displayName: String!
        $password: String!
        $email: String!
      ) {
        signup(
          input: {
            name: $name
            displayName: $displayName
            password: $password
            email: $email
          }
        ) {
          ... on SignupNameAlreadyExistsError {
            name
          }
          ... on SignupEmailAlreadyExistsError {
            email
          }
          ... on SignupSucceededPayload {
            user {
              id
              ...GlobalNav_Profile
            }
          }
        }
      }
    `)
  );
  const onSubmit: SubmitHandler<FormSchema> = useCallback(
    async ({ name, displayName, email, password }) => {
      if (!turnstileToken) {
        // TODO: 何らかの警告を出す
        return;
      }
      const verifyTurnstile: TurnstileVerifyResponse = await fetch(
        "/api/turnstile",
        { method: "POST", body: new URLSearchParams({ token: turnstileToken }) }
      ).then((r) => r.json());
      if (!verifyTurnstile.success) {
        turnstileRef.current?.reset();
        // TODO: 何らかの警告を出す
        return;
      }

      const { data, error } = await signup({
        name,
        displayName,
        email,
        password,
      });
      if (error || !data) {
        // TODO: エラー処理
        return;
      }

      switch (data.signup.__typename) {
        case "SignupSucceededPayload":
          updateGuard();
          return;
        case "SignupNameAlreadyExistsError":
          setError("name", { message: "既に登録されているユーザーネームです" });
          return;
        case "SignupEmailAlreadyExistsError":
          setError("email", {
            message: "既に登録されているメールアドレスです",
          });
          return;
        default:
          // TODO: 他のエラー処理
          return;
      }
    },
    [setError, signup, turnstileToken, updateGuard]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
        <label className={clsx(["flex", "flex-col"])}>
          <InputWithIcon
            Icon={AtSymbolIcon}
            Input={(props) => (
              <TextInput
                {...props}
                {...register("name")}
                placeholder="ユーザーネーム"
              />
            )}
          />
          {errors.name && (
            <p className={clsx(["mt-1"], ["text-xs"], ["text-red-600"])}>
              {errors.name.message}
            </p>
          )}
        </label>
        <label className={clsx(["flex", "flex-col"])}>
          <InputWithIcon
            Icon={UserIcon}
            Input={(props) => (
              <TextInput
                {...props}
                {...register("displayName")}
                placeholder="表示される名前"
              />
            )}
          />
          {errors.displayName && (
            <p className={clsx(["mt-1"], ["text-xs"], ["text-red-600"])}>
              {errors.displayName.message}
            </p>
          )}
        </label>
        <label className={clsx(["flex", "flex-col"])}>
          <InputWithIcon
            Icon={EnvelopeIcon}
            Input={(props) => (
              <TextInput
                {...props}
                {...register("email")}
                placeholder="メールアドレス"
              />
            )}
          />
          {errors.email && (
            <p className={clsx(["mt-1"], ["text-xs"], ["text-red-600"])}>
              {errors.email.message}
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
        <label className={clsx(["flex", "flex-col"])}>
          <InputWithIcon
            Icon={LockClosedIcon}
            Input={(props) => (
              <PasswordInput
                {...props}
                {...register("passwordRepeat", {
                  validate: (value) => {
                    console.log(getValues("password"), value);
                    return (
                      getValues("password") === value ||
                      "パスワードが一致しません"
                    );
                  },
                })}
                placeholder="パスワードの再入力"
              />
            )}
          />
          {errors.passwordRepeat && (
            <p className={clsx(["mt-1"], ["text-xs"], ["text-red-600"])}>
              {errors.passwordRepeat.message}
            </p>
          )}
        </label>
      </div>
      <div>
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
          onSuccess={(token) => {
            setTurnstileToken(token);
          }}
        />
      </div>
      <div>
        <BlueButton
          className={clsx(["w-full"], ["py-2"])}
          disabled={!turnstileToken}
        >
          ユーザー登録
        </BlueButton>
      </div>
      <div className={clsx(["mt-4"])}>
        <p>
          <SigninLinkPage
            className={clsx(
              ["text-blue-400", "hover:text-blue-500"],
              ["text-sm"]
            )}
          >
            ユーザー登録が既に済んでいるなら
          </SigninLinkPage>
        </p>
      </div>
    </form>
  );
};
