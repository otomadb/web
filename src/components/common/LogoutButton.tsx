"use client";

import "client-only";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "urql";

import { graphql } from "~/gql";
import {
  LogoutButton_FetchViewerDocument,
  LogoutButton_SignoutDocument,
} from "~/gql/graphql";

graphql(`
  mutation LogoutButton_Signout {
    signout {
      ... on SignoutSucceededPayload {
        session {
          user {
            ...GlobalNav_ProfileIndicator
          }
        }
      }
      ... on SignoutFailedPayload {
        message
      }
    }
  }

  query LogoutButton_FetchViewer {
    whoami {
      id
      ...GlobalNav_ProfileIndicator
    }
  }
`);
export const LogoutButton: React.FC<{ className?: string }> = ({
  className,
}) => {
  const router = useRouter();
  const [{ data: viewerData }, afterlogin] = useQuery({
    query: LogoutButton_FetchViewerDocument,
    requestPolicy: "cache-and-network",
  });
  useEffect(() => {
    if (viewerData?.whoami === null) router.replace("/");
  }, [viewerData, router]);

  const [{ data: loginData }, signout] = useMutation(
    LogoutButton_SignoutDocument
  );
  useEffect(() => {
    if (!loginData) return;

    if (loginData.signout.__typename === "SignoutSucceededPayload")
      afterlogin();
  }, [afterlogin, loginData]);

  return (
    <button
      className={clsx(className)}
      type="button"
      onClick={() => signout({})}
    >
      ログアウト
    </button>
  );
};