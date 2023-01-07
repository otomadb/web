import "client-only";

import ky from "ky";
import React, { ReactNode, useCallback, useContext } from "react";

const RestContext = React.createContext<{ base: string }>({
  base: process.env.NEXT_PUBLIC_API_ENDPOINT,
});
export const RestProvider: React.FC<{
  children: ReactNode;
  value: { base: string };
}> = ({ children, value }) => {
  return (
    <RestContext.Provider value={{ base: value.base }}>
      {children}
    </RestContext.Provider>
  );
};

export const usePostAuthLogin = () => {
  const { base } = useContext(RestContext);

  return useCallback(
    ({ name, password }: { name: string; password: string }) =>
      ky.post(new URL("/api/auth/login", base).toString(), {
        json: { name, password },
        throwHttpErrors: false,
        credentials: "include",
      }),
    [base]
  );
};

export const usePostAuthSignup = () => {
  const { base } = useContext(RestContext);

  return useCallback(
    ({
      name,
      password,
      displayName,
      email,
    }: {
      name: string;
      displayName: string;
      password: string;
      email: string;
    }) =>
      ky.post(new URL("/api/auth/signup", base).toString(), {
        json: { name, password, displayName, email },
        throwHttpErrors: false,
        credentials: "include",
      }),
    [base]
  );
};

export const useGetRemoteNicovideo = () => {
  const { base } = useContext(RestContext);

  return useCallback(
    (sourceId: string) => {
      const url = new URL("/api/remote/nicovideo", base);
      url.searchParams.set("id", sourceId);
      return ky.get(url.toString(), {
        throwHttpErrors: false,
        credentials: "include",
      });
    },
    [base]
  );
};
