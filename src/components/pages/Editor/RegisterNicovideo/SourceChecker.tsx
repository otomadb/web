"use client";
import "client-only";

import clsx from "clsx";
import { useQuery } from "urql";

import { getFragment, graphql } from "~/gql";
import {
  EditorRegisterNicovideoPage_SourceAlreadyRegisteredFragmentDoc,
  RegisterNicovideoPage_OriginalSourceFragmentDoc,
  RegisterNicovideoPage_SourceCheckerDocument,
} from "~/gql/graphql";

import { OriginalSource } from "./OriginalSource";
import { SourceAlreadyExists as SourceAlreadyRegistered } from "./SourceAlreadyRegistered";

graphql(`
  query RegisterNicovideoPage_SourceChecker($sourceId: String!) {
    fetchNicovideo(input: { sourceId: $sourceId }) {
      source {
        ...RegisterNicovideoPage_OriginalSource
      }
    }
    findNicovideoVideoSource(input: { sourceId: $sourceId }) {
      id
      ...EditorRegisterNicovideoPage_SourceAlreadyRegistered
    }
  }
`);
export const SourceChecker: React.FC<{
  className?: string;
  sourceId: string;
  toggleTag: (id: string) => void;
}> = ({ className, sourceId, toggleTag }) => {
  const [{ data }] = useQuery({
    query: RegisterNicovideoPage_SourceCheckerDocument,
    variables: { sourceId },
    requestPolicy: "cache-and-network",
  });

  return (
    <div className={clsx(className)}>
      {data?.findNicovideoVideoSource && (
        <SourceAlreadyRegistered
          fragment={getFragment(
            EditorRegisterNicovideoPage_SourceAlreadyRegisteredFragmentDoc,
            data.findNicovideoVideoSource
          )}
        />
      )}
      {!data?.findNicovideoVideoSource && data?.fetchNicovideo.source && (
        <OriginalSource
          fragment={getFragment(
            RegisterNicovideoPage_OriginalSourceFragmentDoc,
            data.fetchNicovideo.source
          )}
          toggleTag={toggleTag}
        />
      )}
    </div>
  );
};
