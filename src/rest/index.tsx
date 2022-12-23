import "client-only";

import ky from "ky";
import React, { ReactNode, useCallback, useContext } from "react";

const RestContext = React.createContext<{ base?: "/" | string }>({});
export const RestProvider: React.FC<{
  children: ReactNode;
  value: {
    base: "/" | string;
  };
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
      ky.post(
        base === "/" ? "/auth/login" : new URL("/auth/login", base).toString(),
        {
          json: { name, password },
          throwHttpErrors: false,
          credentials: "include",
        }
      ),
    [base]
  );
};
