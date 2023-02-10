"use client";

import { useQuery } from "urql";

import { graphql } from "~/gql";
import { RegisterNicovideoPage_AlreadyCheckDocument } from "~/gql/graphql";

graphql(`
  query RegisterNicovideoPage_AlreadyCheck($sourceId: String!) {
    findNicovideoVideoSource(input: { sourceId: $sourceId }) {
      id
      sourceId
      video {
        id
        serial
        title
        thumbnailUrl
      }
    }
  }
`);

export const useIsAlready = (sourceId: string | undefined) => {
  const [{ data }] = useQuery({
    query: RegisterNicovideoPage_AlreadyCheckDocument,
    pause: !sourceId,
    variables: sourceId ? { sourceId } : undefined,
    requestPolicy: "network-only",
  });
  return data?.findNicovideoVideoSource;
};
