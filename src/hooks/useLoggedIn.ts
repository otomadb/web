import "client-only";

import { useState } from "react";
import useSWR from "swr";

import { graphql } from "~/gql";
import { gqlClient } from "~/gql/client";

import { useAccessToken } from "./useAccessToken";

const WhoamiDocument = graphql(`
  query WhoAmI {
    whoami {
      id
    }
  }
`);

export const useLoggedIn = (): boolean => {
  const [accessToken, setAccessToken] = useAccessToken();
  const [whoami, setWhoAmI] = useState<null | {}>(null);

  useSWR(
    accessToken !== null ? [WhoamiDocument, accessToken] : null,
    async (doc, token) =>
      gqlClient.request(doc, {}, { Authorization: `Bearer ${token}` }),
    {
      refreshInterval: 10000,
      onSuccess(data) {
        const { whoami } = data;
        setWhoAmI({ id: whoami.id });
      },
      onError() {
        setAccessToken(null);
      },
    }
  );

  return !!accessToken;
};
