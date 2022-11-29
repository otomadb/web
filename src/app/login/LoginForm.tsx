"use client";

import "client-only";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { graphql } from "~/gql";
import { useGraphQLClient } from "~/hooks/useGraphQLClient";

import { useLoggedIn } from "../../hooks/useLoggedIn";

const LoginDocument = graphql(`
  mutation Login($name: String!, $password: String!) {
    signin(input: { name: $name, password: $password }) {
      accessToken
      refreshToken
    }
  }
`);

export const LoginForm: React.FC<{ className?: string }> = ({ className }) => {
  const gqlClient = useGraphQLClient();
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loggedIn = useLoggedIn();

  if (loggedIn) {
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
