"use client";

import "client-only";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { graphql } from "~/gql";
import { gqlClient } from "~/gql/client";
import { useAccessToken } from "~/hooks/useAccessToken";
import { useRefreshToken } from "~/hooks/useRefreshToken";

const LoginDocument = graphql(`
  mutation Login($name: String!, $password: String!) {
    signin(input: { name: $name, password: $password }) {
      accessToken
      refreshToken
    }
  }
`);

export const LoginForm: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [storedAccessToken, setAccessToken] = useAccessToken();
  const [storedRefreshToken, setRefreshToken] = useRefreshToken();

  if (storedAccessToken !== null && storedRefreshToken !== null) {
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
          try {
            const {
              signin: { accessToken, refreshToken },
            } = await gqlClient.request(LoginDocument, {
              name: username,
              password,
            });
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            router.replace("/");
          } catch (e) {
            console.error(e);
          }
        }}
      >
        Signin
      </button>
    </form>
  );
};
