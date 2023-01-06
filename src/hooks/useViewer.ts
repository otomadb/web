"use client";

import "client-only";

import { useQuery } from "urql";

import { graphql } from "~/gql";
import { UseViewerDocument } from "~/gql/graphql";

graphql(`
  query UseViewer {
    whoami {
      id
    }
  }
`);

export const useViewer = () =>
  useQuery({
    query: UseViewerDocument,
    // requestPolicy: "cache-and-network",
  });
