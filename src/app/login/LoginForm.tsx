"use client";

import "client-only";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useIsLoggedIn } from "~/hooks/useIsLoggedIn";
import { useLogin } from "~/hooks/useLogin";

export const LoginForm: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const isLoggedIn = useIsLoggedIn();
  const login = useLogin({
    onSuccess() {
      router.replace("/");
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
          value={username}
          onChange={(e) => {
            setUserName(e.target.value);
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
          if (!username) return;
          if (!password) return;
          login({ username, password });
        }}
      >
        Signin
      </button>
    </form>
  );
};
