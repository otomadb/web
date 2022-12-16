"use client";

import "client-only";

import ky from "ky";
import { rest } from "msw";
import { useCallback } from "react";
import { useQuery } from "urql";

import { WhoamiDocument } from "~/gql/graphql";

export const mockLogoutHandler = rest.post(
  new URL("/auth/logout", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
  async (req, res, ctx) => {
    return res(
      ctx.cookie("otmd-session", "", {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        expires: new Date(Date.now() - 1),
      })
    );
  }
);

export const useLogout = ({ onSuccess }: { onSuccess(): void }) => {
  const [, updateGql] = useQuery({
    query: WhoamiDocument,
    requestPolicy: "network-only",
  });

  const handler = useCallback(async () => {
    const result = await ky.post(
      new URL("/auth/logout", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
      { throwHttpErrors: false, credentials: "include" }
    );
    console.dir(result);
    if (result.ok) {
      onSuccess();
      updateGql();
    }
  }, [onSuccess, updateGql]);
  return handler;
};
