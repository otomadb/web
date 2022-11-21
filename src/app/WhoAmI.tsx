"use client";
import { GraphQLClient } from "graphql-request";
import React from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";

import { graphql } from "~/gql";
import { stateAccessToken } from "~/states/tokens";
import { stateWhoAmI } from "~/states/whoami";

const ProfileDocument = graphql(`
  query Profile {
    whoami {
      id
      name
      displayName
      icon
    }
  }
`);

export const gqlClient = new GraphQLClient("http://localhost:8080/graphql");

export const WhoAmI: React.FC = () => {
  const [accessToken] = useRecoilState(stateAccessToken);
  const [, setWhoAmI] = useRecoilState(stateWhoAmI);

  useSWR(
    accessToken !== null ? [ProfileDocument, accessToken] : null,
    async (doc, token) =>
      gqlClient.request(doc, {}, { Authorization: `Bearer ${token}` }),
    {
      onSuccess(data) {
        const {
          whoami: { id, name, displayName, icon },
        } = data;
        console.dir(data);
        setWhoAmI({
          id,
          name,
          displayName,
          icon,
        });
      },
    }
  );

  return null;
};
