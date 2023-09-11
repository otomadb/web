import { ReactNode } from "react";
import {
  createClient as createUrqlClient,
  fetchExchange,
  Provider as UrqlProvider,
} from "urql";

export const MockUrqlProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <UrqlProvider
      value={createUrqlClient({ url: "/graphql", exchanges: [fetchExchange] })}
    >
      {children}
    </UrqlProvider>
  );
};
