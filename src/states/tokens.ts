"use client";
import { atom, AtomEffect } from "recoil";

export const localstorageEffect =
  (key: string): AtomEffect<string | null> =>
  ({ setSelf, onSet }) => {
    if (typeof window === "undefined" || !window.localStorage) return;

    const saved = window.localStorage.getItem(key);
    if (!!saved) setSelf(JSON.parse(saved));

    onSet((newValue, _, isReset) => {
      isReset
        ? window.localStorage.removeItem(key)
        : window.localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const stateAccessToken = atom<string | null>({
  key: "accessToken",
  default: null,
  effects: [localstorageEffect("access_token")],
});

export const stateRefreshToken = atom<string | null>({
  key: "refreshToken",
  default: null,
  effects: [localstorageEffect("refresh_token")],
});
