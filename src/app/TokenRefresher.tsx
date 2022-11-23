"use client";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import { graphql } from "~/gql";
import { gqlClient } from "~/gql/client";
import { stateAccessToken, stateRefreshToken } from "~/states/tokens";

const RefreshTokenDocument = graphql(`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      accessToken
      refreshToken
    }
  }
`);

export const TokenRefresher: React.FC = () => {
  const [accessToken, setAccessToken] = useRecoilState(stateAccessToken);
  const [refreshToken, setRefreshToken] = useRecoilState(stateRefreshToken);

  useEffect(() => {
    const refresh = async () => {
      if (!accessToken && refreshToken) {
        const { refreshToken: payload } = await gqlClient.request(
          RefreshTokenDocument,
          { token: refreshToken }
        );
        if (!payload) {
          setAccessToken(null);
          setRefreshToken(null);
          return;
        }
        setAccessToken(payload.accessToken);
        setRefreshToken(payload.refreshToken);
      }
    };
    refresh();
  }, [accessToken, refreshToken, setAccessToken, setRefreshToken]);

  return null;
};
