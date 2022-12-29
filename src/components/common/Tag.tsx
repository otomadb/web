import clsx from "clsx";
import React, { ReactNode, useMemo } from "react";
import { useQuery } from "urql";

import { LinkTag } from "~/components/common/Link";
import { getFragment, graphql } from "~/gql";
import {
  Component_TagDocument,
  Component_TagFragmentDoc,
  PseudoTagType,
} from "~/gql/graphql";

graphql(`
  fragment Component_Tag on Tag {
    id
    name
    pseudoType
    explicitParent {
      id
      name
    }
  }

  query Component_Tag($id: ID!) {
    tag(id: $id) {
      ...Component_Tag
    }
  }
`);

export const Tag: React.FC<{
  className?: string;
  tagId: string;
  Wrapper?: React.FC<{ className?: string; children: ReactNode }>;
}> = ({
  className,
  tagId,
  Wrapper = (props) => <LinkTag tagId={tagId} {...props} />,
}) => {
  const [{ data }] = useQuery({
    query: Component_TagDocument,
    variables: {
      id: tagId,
    },
  });
  const tag = getFragment(Component_TagFragmentDoc, data?.tag);
  const type = useMemo(() => tag?.pseudoType, [tag]);

  return (
    <Wrapper
      className={clsx(
        className,
        ["items-center"],
        ["whitespace-nowrap"],
        ["bg-white"],
        [
          "border",
          "border-gray-200",
          [
            "border-l-4",
            {
              "border-l-character-400": type === PseudoTagType.Character,
              "border-l-music-400": type === PseudoTagType.Music,
              "border-l-copyright-400": type === PseudoTagType.Copyright,
              "border-l-event-400": type === PseudoTagType.Event,
              "border-l-series-400": type === PseudoTagType.Series,
            },
          ],
        ],
        ["shadow-sm"],
        ["rounded"],
        ["pr-2", "pl-1.5", "py-0.5"],
        ["text-xs"]
      )}
    >
      {tag && (
        <>
          <span className={clsx(["text-slate-800"])}>{tag.name}</span>
          {tag.explicitParent && (
            <span className={clsx(["ml-0.5"], ["text-slate-500"])}>
              ({tag.explicitParent.name})
            </span>
          )}
        </>
      )}
    </Wrapper>
  );
};
