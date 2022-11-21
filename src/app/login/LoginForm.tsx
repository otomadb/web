"use client";

import clsx from "clsx";
import gqlRequest from "graphql-request";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

import { graphql } from "~/gql";
import { stateAccessToken, stateRefreshToken } from "~/states/tokens";

const LoginSchema = graphql(`
  mutation Login($input: SigninInput) {
    signin(input: $input) {
      accessToken
      refreshToken
      user {
        id
        name
        displayName
      }
    }
  }
`);

export const LoginForm: React.FC<{ className?: string }> = ({ className }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [, setAccessToken] = useRecoilState(stateAccessToken);
  const [, setRefreshToken] = useRecoilState(stateRefreshToken);

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
            } = await gqlRequest("http://localhost:8080/graphql", LoginSchema, {
              input: { name: username, password },
            });

            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
          } catch (e) {}
        }}
      >
        Signin
      </button>
    </form>
  );
};
