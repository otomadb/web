import "client-only";

import { atom, useRecoilState } from "recoil";

import { localstorageEffect } from "./useAccessToken";

const stateRefreshToken = atom<string | null>({
  key: "refreshToken",
  default: null,
  effects: [localstorageEffect("refresh_token")],
});

export const useRefreshToken = () => useRecoilState(stateRefreshToken);
