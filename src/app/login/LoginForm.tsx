"use client";

import "client-only";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useIsLoggedIn } from "~/hooks/useIsLoggedIn";
import { useLogin } from "~/hooks/useLogin";

export const LoginForm: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const isLoggedIn = useIsLoggedIn();
  const login = useLogin({
    onSuccess() {
      router.replace("/");
    },
    onError(status) {
      console.log(status);
    },
  });

  if (isLoggedIn) {
    router.replace("/");
    return null;
  }

  return (
    <form className={clsx(className, ["flex", "flex-col"])}>
      <label>
        <span>Username</span>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className={clsx(["border"])}
        ></input>
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className={clsx(["border"])}
        ></input>
      </label>
      <button
        type="button"
        onClick={async () => {
          if (!name || !password) return;
          login({ name, password });
        }}
      >
        Signin
      </button>
    </form>
  );
};
