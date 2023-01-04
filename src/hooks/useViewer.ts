"use client";

import "client-only";

import { useQuery } from "urql";

import { graphql } from "~/gql";
import { ViewerDocument } from "~/gql/graphql";

graphql(`
  query Viewer {
    whoami {
      id
      name
      displayName
      icon
    }
  }
`);

export const useViewer = () =>
  useQuery({ query: ViewerDocument, requestPolicy: "cache-and-network" });
