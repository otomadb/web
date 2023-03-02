"use client";

import "client-only";

import clsx from "clsx";
import { useQuery } from "urql";

import { LinkRegisterNicovideo } from "~/app/editor/nicovideo/Link";
import { FragmentType, getFragment as useFragment, graphql } from "~/gql";

const Fragment = graphql(`
  fragment NicovideoRequestPage_EditorButtonFragment on NicovideoRegistrationRequest {
    sourceId
  }
`);
export const Editor: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, fragment }) => {
  const { sourceId } = useFragment(Fragment, fragment);
  const [{ data }] = useQuery({
    query: graphql(`
      query NicovideoRequestPage_EditorButton_Check {
        whoami {
          id
          isEditor
        }
      }
    `),
    requestPolicy: "cache-and-network",
  });

  return (
    <div className={clsx(className)}>
      {data?.whoami?.isEditor && (
        <LinkRegisterNicovideo sourceId={sourceId}>
          登録する
        </LinkRegisterNicovideo>
      )}
    </div>
  );
};
