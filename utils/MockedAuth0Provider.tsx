import { ReactNode } from "react";

export const MockedAuth0Provider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};
