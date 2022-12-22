"use client";

import "client-only";

import {
  AtSymbolIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { SigninLink } from "../common/Link";
import { useSignup } from "./useSignup";

const formSchema = z.object({
  name: z.string().min(3, { message: "ユーザーネームは3文字以上です" }),
  displayName: z.string().min(1, { message: "1文字以上" }),
  email: z.string().email({ message: "メールアドレスの形式でない" }),
  password: z.string().min(8, { message: "パスワードは8文字以上" }),
  passwordRepeat: z.string().min(8, { message: "パスワードは8文字以上" }),
});
type FormSchema = z.infer<typeof formSchema>;

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
  const trySignup = useSignup({
    onSuccess() {
      router.replace("/");
    },
    onError(status) {
      switch (status) {
        case "USER_NAME_ALREADY_REGISTERED":
          setError("name", {
            message: "既に登録されているユーザーネームです",
          });
          break;
        case "EMAIL_ALREADY_REGISTERED":
          setError("email", {
            message: "既に登録されているメールアドレスです",
          });
          break;
        case "UNKNOWN":
          break;
      }
    },
  });
  const onSubmit: SubmitHandler<FormSchema> = async ({
    name,
    displayName,
    email,
    password,
  }) => {
    await trySignup({ name, displayName, email, password });
  };

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
        <div>
          <label
            className={clsx(
              ["flex"],
              ["border", "border-slate-300"],
              ["rounded-md"],
              ["overflow-hidden"]
            )}
          >
            <div
              className={clsx(
                ["flex-shrink-0"],
                ["flex"],
                ["px-4"],
                [["bg-teal-400"]]
              )}
            >
              <AtSymbolIcon
                className={clsx(
                  ["place-self-center"],
                  [["w-6"], ["h-6"]],
                  ["text-teal-100"]
                )}
              />
            </div>
            <input
              {...register("name")}
              type="text"
              aria-label="User name"
              placeholder={"ユーザーネーム"}
              className={clsx(
                ["flex-grow"],
                ["px-4", "py-2"],
                ["rounded-r-md"],
                ["bg-slate-50"],
                ["outline-teal-300"],
                [
                  ["text-md"],
                  ["text-slate-900"],
                  ["placeholder:text-slate-300"],
                ]
              )}
            />
          </label>
          {errors.name && (
            <p className={clsx(["mt-1"], ["text-xs"], ["text-red-600"])}>
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label
            className={clsx(
              ["flex"],
              ["border", "border-slate-300"],
              ["rounded-md"],
              ["overflow-hidden"]
            )}
          >
            <div
              className={clsx(
                ["flex-shrink-0"],
                ["flex"],
                ["px-4"],
                [["bg-teal-400"]]
              )}
            >
              <UserCircleIcon
                className={clsx(
                  ["place-self-center"],
                  [["w-6"], ["h-6"]],
                  ["text-teal-100"]
                )}
              />
            </div>
            <input
              {...register("displayName")}
              type="text"
              aria-label="Display name"
              placeholder={"表示される名前"}
              className={clsx(
                ["flex-grow"],
                ["px-4", "py-2"],
                ["rounded-r-md"],
                ["bg-slate-50"],
                ["outline-teal-300"],
                [
                  ["text-md"],
                  ["text-slate-900"],
                  ["placeholder:text-slate-300"],
                ]
              )}
            />
          </label>
          {errors.displayName && (
            <p className={clsx(["mt-1"], ["text-xs"], ["text-red-600"])}>
              {errors.displayName.message}
            </p>
          )}
        </div>
        <div>
          <label
            className={clsx(
              ["flex"],
              ["border", "border-slate-300"],
              ["rounded-md"],
              ["overflow-hidden"]
            )}
          >
            <div
              className={clsx(
                ["flex-shrink-0"],
                ["flex"],
                ["px-4"],
                [["bg-teal-400"]]
              )}
            >
              <EnvelopeIcon
                className={clsx(
                  ["place-self-center"],
                  [["w-6"], ["h-6"]],
                  ["text-teal-100"]
                )}
              />
            </div>
            <input
              {...register("email")}
              type="text"
              aria-label="Email"
              placeholder={"メールアドレス"}
              className={clsx(
                ["flex-grow"],
                ["px-4", "py-2"],
                ["rounded-r-md"],
                ["bg-slate-50"],
                ["outline-teal-300"],
                [
                  ["text-md"],
                  ["text-slate-900"],
                  ["placeholder:text-slate-300"],
                ]
              )}
            />
          </label>
          {errors.email && (
            <p className={clsx(["mt-1"], ["text-xs"], ["text-red-600"])}>
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label
            className={clsx(
              ["flex"],
              ["border", "border-slate-300"],
              ["rounded-md"],
              ["overflow-hidden"]
            )}
          >
            <div
              className={clsx(
                ["flex-shrink-0"],
                ["flex"],
                ["px-4"],
                [["bg-teal-400"]]
              )}
            >
              <LockClosedIcon
                className={clsx(
                  ["place-self-center"],
                  [["w-6"], ["h-6"]],
                  ["text-teal-100"]
                )}
              />
            </div>
            <input
              {...register("password")}
              type="password"
              aria-label="Password"
              placeholder={"パスワード"}
              className={clsx(
                ["flex-grow"],
                ["px-4", "py-2"],
                ["rounded-r-md"],
                ["bg-slate-50"],
                ["outline-teal-300"],
                [
                  ["text-md"],
                  ["text-slate-900"],
                  ["placeholder:text-slate-300"],
                ]
              )}
            />
          </label>
          {errors.password && (
            <p className={clsx(["mt-1"], ["text-xs"], ["text-red-600"])}>
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <label
            className={clsx(
              ["flex"],
              ["border", "border-slate-300"],
              ["rounded-md"],
              ["overflow-hidden"]
            )}
          >
            <div
              className={clsx(
                ["flex-shrink-0"],
                ["flex"],
                ["px-4"],
                [["bg-teal-400"]]
              )}
            >
              <LockClosedIcon
                className={clsx(
                  ["place-self-center"],
                  [["w-6"], ["h-6"]],
                  ["text-teal-100"]
                )}
              />
            </div>
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
              type="password"
              aria-label="Retype password"
              placeholder={"パスワードの再入力"}
              className={clsx(
                ["flex-grow"],
                ["px-4", "py-2"],
                ["rounded-r-md"],
                ["bg-slate-50"],
                ["outline-teal-300"],
                [
                  ["text-md"],
                  ["text-slate-900"],
                  ["placeholder:text-slate-300"],
                ]
              )}
            />
          </label>
          {errors.passwordRepeat && (
            <p className={clsx(["mt-1"], ["text-xs"], ["text-red-600"])}>
              {errors.passwordRepeat.message}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        aria-label="Signup"
        className={clsx(
          ["mt-8"],
          [["py-2"]],
          ["group"],
          ["transition-colors", "duration-75"],
          ["disabled:bg-slate-300", ["bg-teal-400", "hover:bg-teal-500"]],
          [
            "border",
            "disabled:border-slate-300",
            ["border-teal-300", "hover:border-teal-400"],
          ],
          ["rounded-md"]
        )}
      >
        <span
          className={clsx(
            ["font-bold"],
            ["transition-colors", "duration-75"],
            [
              "group-disabled:text-slate-200",
              ["text-teal-100", "group-hover:text-teal-200"],
            ]
          )}
        >
          登録
        </span>
      </button>
      <div className={clsx(["mt-4"])}>
        <p>
          <SigninLink
            className={clsx(
              ["text-blue-400", "hover:text-blue-500"],
              ["text-sm"]
            )}
          >
            ユーザー登録が既に済んでいるなら
          </SigninLink>
        </p>
      </div>
    </form>
  );
};
