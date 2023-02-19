"use client";
import "client-only";

import { ReactNode } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";
import { EditorPages_GuardDocument } from "~/gql/graphql";

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
};
