"use client";
import React, { useEffect } from "react";

import { graphql } from "~/gql";
import { useAccessToken } from "~/hooks/useAccessToken";
import { useGraphQLClient } from "~/hooks/useGraphQLClient";
import { useRefreshToken } from "~/hooks/useRefreshToken";

const RefreshTokenDocument = graphql(`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      accessToken
      refreshToken
    }
  }
`);

export const TokenRefresher: React.FC = () => {
  const gqlClient = useGraphQLClient();
  const [accessToken, setAccessToken] = useAccessToken();
  const [refreshToken, setRefreshToken] = useRefreshToken();

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
  }, [gqlClient, accessToken, refreshToken, setAccessToken, setRefreshToken]);

  return null;
};
