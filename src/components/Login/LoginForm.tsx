"use client";

import "client-only";

import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import ky from "ky";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "urql";
import * as z from "zod";

import { AuthFormButton } from "~/components/common/AuthForm/Button";
import { AuthFormInput } from "~/components/common/AuthForm/FormInput";
import { LinkSignup } from "~/components/common/Link";
import { graphql } from "~/gql";
import { UseLoginDocument } from "~/gql/graphql";
import { useLoginPath } from "~/rest";

const formSchema = z.object({
  name: z.string({ required_error: "ユーザーネームを入力してください" }),
  password: z.string({ required_error: "パスワードを入力してください" }),
});
type FormSchema = z.infer<typeof formSchema>;

graphql(`
  query UseLogin {
    whoami {
      id
      ...GlobalNav_Profile
    }
  }
`);
export const useLogin = () => {
  const url = useLoginPath();
  const [, update] = useQuery({ query: UseLoginDocument, pause: true });

  return useCallback(
    async ({
      name,
      password,
    }: {
      name: string;
      password: string;
    }): Promise<{ ok: true } | { ok: false; error: string }> => {
      const result = await ky.post(url, {
        json: { name, password },
        throwHttpErrors: false,
        credentials: "include",
      });
      if (!result.ok) {
        const { error } = await result.json<{ error: string }>();
        return { ok: false, error };
      } else {
        update({ requestPolicy: "network-only" });
        return { ok: true };
      }
    },
    [update, url]
  );
};

export const LoginForm: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();
  const triggerLogin = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = useCallback(
    async ({ name, password }) => {
      const result = await triggerLogin({ name, password });
      if (result.ok) {
        router.replace("/");
      } else {
        const { error } = result;
        switch (error) {
          case "user not found":
            setError("name", { message: "存在しないユーザーです" });
            break;
          case "password wrong":
            setError("password", { message: "誤ったパスワード" });
            break;
          default:
            break;
        }
      }
    },
    [router, setError, triggerLogin]
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
              {...register("name")}
              {...props}
              type={"text"}
              placeholder="ユーザーネーム"
            ></input>
          )}
          Icon={(props) => <AtSymbolIcon {...props} />}
          error={errors.name}
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
