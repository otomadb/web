"use client";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";

import { graphql } from "~/gql";
import { gqlClient } from "~/gql/client";
import { stateAccessToken, stateRefreshToken } from "~/states/tokens";
import { stateWhoAmI } from "~/states/whoami";

const RefreshTokenDocument = graphql(`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      accessToken
      refreshToken
    }
  }
`);

const WhoAmIDocument = graphql(`
  query Profile {
    whoami {
      id
      name
      displayName
      icon
    }
  }
`);

export const WhoAmI: React.FC = () => {
  const [accessToken, setAccessToken] = useRecoilState(stateAccessToken);
  const [refreshToken, setRefreshToken] = useRecoilState(stateRefreshToken);
  const [, setWhoAmI] = useRecoilState(stateWhoAmI);

  useEffect(() => {
    const refresh = async () => {
      if (!accessToken && refreshToken) {
        const { refreshToken: payload } = await gqlClient.request(
          RefreshTokenDocument,
          {
            token: refreshToken,
          }
        );
        if (!payload) return;
        setAccessToken(payload.accessToken);
        setRefreshToken(payload.refreshToken);
      }
    };
    refresh();
  }, [accessToken, refreshToken, setAccessToken, setRefreshToken]);

  useSWR(
    accessToken !== null ? [WhoAmIDocument, accessToken] : null,
    async (doc, token) =>
      gqlClient.request(doc, {}, { Authorization: `Bearer ${token}` }),
    {
      onSuccess(data) {
        const {
          whoami: { id, name, displayName, icon },
        } = data;
        setWhoAmI({
          id,
          name,
          displayName,
          icon,
        });
      },
      onError() {
        setAccessToken(null);
      },
    }
  );

  return null;
};
