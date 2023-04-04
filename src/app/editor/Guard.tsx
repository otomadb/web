"use client";
import "client-only";

import { ReactNode } from "react";

import { graphql } from "~/gql";

graphql(`
  query EditorPages_Guard {
    whoami {
      id
      isEditor
    }
  }
`);
export const EditorPageGuard: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;

  /*
  const [{ data, fetching }] = useQuery({
    query: EditorPages_GuardDocument,
    requestPolicy: "network-only",
  });

  if (fetching)
    return (
      <div>
        <p>LOADING</p>
      </div>
    );

  if (!data?.whoami?.isEditor)
    return (
      <div>
        <p>編集者権限がありません。</p>
      </div>
    );

  return <>{children}</>;
  */
};
