import { ReactNode } from "react";
import {
  createClient as createUrqlClient,
  fetchExchange,
  Provider as UrqlProvider,
} from "urql";

export const MockedUrqlProvider: React.FC<{ children: ReactNode }> = ({
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
