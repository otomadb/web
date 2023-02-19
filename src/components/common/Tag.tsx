import clsx from "clsx";
import React, { ReactNode, useMemo } from "react";

import { LinkTag } from "~/app/tags/[serial]/Link";
import { getFragment, graphql } from "~/gql";
import {
  CommonTagFragment,
  Component_TagFragment,
  Link_TagFragmentDoc,
  PseudoTagType,
} from "~/gql/graphql";

graphql(`
  fragment Component_Tag on Tag {
    ...Link_Tag
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
  tag: Component_TagFragment;
  Wrapper?: React.FC<{ className?: string; children: ReactNode }>;
}> = ({
  className,
  tag,
  Wrapper = (props) => (
    <LinkTag fragment={getFragment(Link_TagFragmentDoc, tag)} {...props} />
  ),
}) => {
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

graphql(`
  fragment CommonTag on Tag {
    id
    name
    pseudoType
    explicitParent {
      id
      name
    }
  }
`);
export const CommonTag: React.FC<{
  className?: string;
  fragment: CommonTagFragment;
  Wrapper?: React.FC<{ className?: string; children: ReactNode }>;
}> = ({
  className,
  fragment,
  Wrapper = ({ children, ...props }) => <div {...props}>{children}</div>,
}) => (
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
            "border-l-character-400":
              fragment.pseudoType === PseudoTagType.Character,
            "border-l-music-400": fragment.pseudoType === PseudoTagType.Music,
            "border-l-copyright-400":
              fragment.pseudoType === PseudoTagType.Copyright,
            "border-l-event-400": fragment.pseudoType === PseudoTagType.Event,
            "border-l-series-400": fragment.pseudoType === PseudoTagType.Series,
          },
        ],
      ],
      ["shadow-sm"],
      ["rounded"],
      ["pr-2", "pl-1.5", "py-0.5"],
      ["text-xs"]
    )}
  >
    <span className={clsx(["text-slate-800"])}>{fragment.name}</span>
    {fragment.explicitParent && (
      <span className={clsx(["ml-0.5"], ["text-slate-500"])}>
        ({fragment.explicitParent.name})
      </span>
    )}
  </Wrapper>
);
