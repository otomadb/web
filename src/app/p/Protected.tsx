"use client";

import gqlRequest from "graphql-request";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import SessionReact from "supertokens-auth-react/recipe/session";

import { graphql } from "~/gql";

export const ProtectedPage: React.FC = () => {
  const router = useRouter();
  const session = useSessionContext();

  const clk = useCallback(async () => {
    const res = await fetch("/api/mankind");
    if (res.status === 200) {
      const json = await res.json();
      alert(JSON.stringify(json));
    }
  }, []);

  const signout = useCallback(async () => {
    SessionReact.signOut();
    router.push("/");
  }, [router]);

  return (
    <div>
      {!session.loading && <div>{session.userId}</div>}
      <button type="button" onClick={() => clk()}>
        Click
      </button>
      <button
        type="button"
        onClick={async (e) => {
          e.preventDefault();
          await gqlRequest(
            "/api/graphql",
            graphql(`
              query Fuck {
                whoami {
                  id
                }
              }
            `)
          );
        }}
      >
        Fuck
      </button>
      <button type="button" onClick={() => signout()}>
        Logout
      </button>
    </div>
  );
};
