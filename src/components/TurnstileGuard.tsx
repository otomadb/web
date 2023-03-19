"use client";
import "client-only";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import React, {
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

import { TurnstileVerifyResponse } from "~/turnstile";

const TurnstileGuardContext = React.createContext<{
  token: string | null;
  removeToken(): void;
  verify(): Promise<boolean>;
}>({
  token: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeToken: () => {},
  verify: async () => false,
});
export const useTurnstileGuard = () => useContext(TurnstileGuardContext);
export const TurnstileGuard: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [token, setToken] = useState<string | null>(null);
  const verify = useCallback(async () => {
    if (!token) return false;

    const res = await fetch("/api/turnstile", {
      method: "POST",
      body: new URLSearchParams({ token }),
    });
    const data: TurnstileVerifyResponse = await res.json();

    if (!data.success) {
      turnstileRef.current?.reset();
      setToken(null);
      return false;
    }

    return true;
  }, [token]);

  return (
    <TurnstileGuardContext.Provider
      value={{
        token,
        removeToken: () => setToken(null),
        verify,
      }}
    >
      {!token && (
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
          onSuccess={(token) => {
            setToken(token);
          }}
        />
      )}
      {token && <>{children}</>}
    </TurnstileGuardContext.Provider>
  );
};
