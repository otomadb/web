"use client";

import "client-only";

import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "urql";
import * as z from "zod";

import { LinkSignup } from "~/app/auth/signup/Link";
import { graphql } from "~/gql";
import {
  SigninFailedMessage,
  SigninPage_FetchViewerDocument,
  SigninPage_SigninDocument,
} from "~/gql/graphql";

import { AuthFormButton } from "../Button";
import { AuthFormInput } from "../FormInput";

const formSchema = z.object({
  name: z.string({ required_error: "ユーザーネームを入力してください" }),
  password: z.string({ required_error: "パスワードを入力してください" }),
});
type FormSchema = z.infer<typeof formSchema>;

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

  query SigninPage_FetchViewer {
    whoami {
      id
      ...GlobalNav_Profile
    }
  }
`);

export const SigninForm: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const [{ data: viewerData }, aftersignin] = useQuery({
    query: SigninPage_FetchViewerDocument,
    requestPolicy: "cache-and-network",
  });
  useEffect(() => {
    if (viewerData?.whoami) router.replace("/");
  }, [viewerData, router]);

  const [{ data: signinData }, signin] = useMutation(SigninPage_SigninDocument);
  useEffect(() => {
    if (!signinData) return;

    if (signinData.signin.__typename === "SigninFailedPayload") {
      const { message } = signinData.signin;
      switch (message) {
        case SigninFailedMessage.UserNotFound:
          setError("name", { message: "存在しないユーザーです" });
          break;
        case SigninFailedMessage.WrongPassword:
          setError("password", { message: "誤ったパスワード" });
          break;
      }
    } else aftersignin();
  }, [aftersignin, signinData, setError]);

  const onSubmit: SubmitHandler<FormSchema> = useCallback(
    async ({ name, password }) => signin({ username: name, password }),
    [signin]
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
