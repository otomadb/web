"use client";

import "client-only";

import {
  AtSymbolIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "urql";
import * as z from "zod";

import { AuthFormButton } from "~/components/common/AuthForm/Button";
import { AuthFormInput } from "~/components/common/AuthForm/FormInput";
import { LinkSignin } from "~/components/common/Link";
import { graphql } from "~/gql";
import {
  SignupFailedMessage,
  SignupPage_FetchViewerDocument,
  SignupPage_SignupDocument,
} from "~/gql/graphql";

const formSchema = z.object({
  name: z.string().min(3, { message: "ユーザーネームは3文字以上です" }),
  displayName: z.string().min(1, { message: "1文字以上" }),
  email: z.string().email({ message: "メールアドレスの形式でない" }),
  password: z.string().min(8, { message: "パスワードは8文字以上" }),
  passwordRepeat: z.string().min(8, { message: "パスワードは8文字以上" }),
});
type FormSchema = z.infer<typeof formSchema>;

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
      ... on SignupSuccessedPayload {
        user {
          id
          ...GlobalNav_Profile
        }
      }
      ... on SignupFailedPayload {
        message
      }
    }
  }

  query SignupPage_FetchViewer {
    whoami {
      id
      ...GlobalNav_Profile
    }
  }
`);
export const SignupForm: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const [{ data: viewerData }, afterlogin] = useQuery({
    query: SignupPage_FetchViewerDocument,
    requestPolicy: "cache-and-network",
  });
  useEffect(() => {
    if (viewerData?.whoami) router.replace("/");
  }, [viewerData, router]);

  const [{ data: loginData }, signup] = useMutation(SignupPage_SignupDocument);
  useEffect(() => {
    if (!loginData) return;

    if (loginData.signup.__typename === "SignupFailedPayload") {
      const { message } = loginData.signup;
      switch (message) {
        case SignupFailedMessage.ExistsUsername:
          setError("name", { message: "既に登録されているユーザーネームです" });
          break;
        case SignupFailedMessage.ExistsEmail:
          setError("email", {
            message: "既に登録されているメールアドレスです",
          });
          break;
      }
    } else afterlogin();
  }, [afterlogin, loginData, setError]);

  const onSubmit: SubmitHandler<FormSchema> = async ({
    name,
    displayName,
    email,
    password,
  }) => signup({ name, displayName, email, password });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        className,
        ["rounded-lg"],
        ["px-8", "py-12"],
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
          Input={(props) => (
            <input
              {...register("displayName")}
              {...props}
              type={"text"}
              placeholder="表示される名前"
            ></input>
          )}
          Icon={(props) => <UserIcon {...props} />}
          error={errors.displayName}
        />
        <AuthFormInput
          Input={(props) => (
            <input
              {...register("email")}
              {...props}
              type={"text"}
              placeholder="メールアドレス"
            ></input>
          )}
          Icon={(props) => <EnvelopeIcon {...props} />}
          error={errors.email}
        />
        <AuthFormInput
          Input={(props) => (
            <input
              {...register("password")}
              {...props}
              type={"password"}
              placeholder="パスワード"
            ></input>
          )}
          Icon={(props) => <LockClosedIcon {...props} />}
          error={errors.password}
        />
        <AuthFormInput
          Input={(props) => (
            <input
              {...register("passwordRepeat", {
                validate: (value) => {
                  console.log(getValues("password"), value);
                  return (
                    getValues("password") === value ||
                    "パスワードが一致しません"
                  );
                },
              })}
              {...props}
              type={"password"}
              placeholder="パスワードの再入力"
            ></input>
          )}
          Icon={(props) => <LockClosedIcon {...props} />}
          error={errors.passwordRepeat}
        />
      </div>
      <AuthFormButton className={clsx("mt-6")} text="ユーザー登録" />
      <div className={clsx(["mt-4"])}>
        <p>
          <LinkSignin
            className={clsx(
              ["text-blue-400", "hover:text-blue-500"],
              ["text-sm"]
            )}
          >
            ユーザー登録が既に済んでいるなら
          </LinkSignin>
        </p>
      </div>
    </form>
  );
};
