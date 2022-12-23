"use client";

import { useMemo } from "react";
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
        title
        thumbnailUrl
      }
    }
  }
`);

export const useIsAlready = (sourceId: string | undefined) => {
  const [{ data: alreadyCheckData }] = useQuery({
    query: RegisterNicovideoPage_AlreadyCheckDocument,
    pause: !sourceId,
    variables: sourceId ? { sourceId } : undefined,
    requestPolicy: "network-only",
  });
  return useMemo(
    () => alreadyCheckData?.findNicovideoVideoSource,
    [alreadyCheckData?.findNicovideoVideoSource]
  );
};
