import clsx from "clsx";
import React, { ReactNode } from "react";

import { LinkTag } from "~/components/common/Link";
import { graphql } from "~/gql";
import { PseudoTagType, VideoPage_TagFragment } from "~/gql/graphql";

graphql(`
  fragment VideoPage_Tag on Tag {
    id
    name
    pseudoType
    explicitParent {
      id
      name
    }
  }
`);

export const Tag: React.FC<{
  className?: string;
  tag: VideoPage_TagFragment;
  Wrapper?: React.FC<{ className?: string; children: ReactNode }>;
}> = ({
  className,
  tag,
  Wrapper = (props) => <LinkTag tagId={tag.id} {...props} />,
}) => {
  const { name, pseudoType, explicitParent } = tag;
  return (
    <Wrapper
      className={clsx(
        className,
        ["flex"],
        ["items-center"],
        ["whitespace-nowrap"],
        ["bg-white"],
        [
          "border",
          "border-gray-200",
          [
            "border-l-4",
            {
              "border-l-character-400": pseudoType === PseudoTagType.Character,
              "border-l-music-400": pseudoType === PseudoTagType.Music,
              "border-l-copyright-400": pseudoType === PseudoTagType.Copyright,
              "border-l-event-400": pseudoType === PseudoTagType.Event,
              "border-l-series-400": pseudoType === PseudoTagType.Series,
            },
          ],
        ],
        ["shadow-sm"],
        ["rounded"],
        ["pr-2", "pl-1.5", "py-0.5"],
        ["text-xs"]
      )}
    >
      <span className={clsx(["text-slate-800"])}>{name}</span>
      {explicitParent?.name && (
        <span className={clsx(["ml-0.5"], ["text-slate-500"])}>
          ({explicitParent.name})
        </span>
      )}
    </Wrapper>
  );
};
