"use client";

import "client-only";

import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { AuthFormButton } from "~/components/common/AuthForm/Button";
import { AuthFormInput } from "~/components/common/AuthForm/FormInput";
import { SignupLink } from "~/components/common/Link";

import { useLogin } from "./useLogin";

const formSchema = z.object({
  name: z.string(),
  password: z.string(),
});
type FormSchema = z.infer<typeof formSchema>;

export const LoginForm: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const tryLogin = useLogin({
    onSuccess() {
      router.replace("/");
    },
    onError(status) {
      switch (status) {
        case "NO_USER":
          setError("name", { message: "存在しないユーザーです" });
          break;
        case "WRONG_PASSWORD":
          setError("password", { message: "誤ったパスワード" });
          break;
        case "UNKNOWN":
          break;
      }
    },
  });
  const onSubmit: SubmitHandler<FormSchema> = async ({ name, password }) => {
    await tryLogin({ name, password });
  };

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
          {...register("name")}
          Icon={(props) => <AtSymbolIcon {...props} />}
          type={"text"}
          placeholder="ユーザーネーム"
          error={errors.name}
        />
        <AuthFormInput
          {...register("name")}
          Icon={(props) => <LockClosedIcon {...props} />}
          type={"password"}
          placeholder="パスワード"
          error={errors.password}
        />
      </div>
      <AuthFormButton
        className={clsx("mt-6")}
        aria-label="ログイン"
        text="ログイン"
      />
      <div className={clsx(["mt-4"])}>
        <p>
          <SignupLink
            className={clsx(
              ["text-blue-400", "hover:text-blue-500"],
              ["text-sm"]
            )}
          >
            ユーザー登録をしていないなら
          </SignupLink>
        </p>
      </div>
    </form>
  );
};
