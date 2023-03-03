import clsx from "clsx";
import React, { ReactNode } from "react";

import { FragmentType, getFragment, graphql } from "~/gql";
import { PseudoTagType } from "~/gql/graphql";

const Fragment = graphql(`
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
  fragment: FragmentType<typeof Fragment>;
  Name?: React.FC<{ className?: string; children: ReactNode }>;
  ExpName?: React.FC<{ className?: string; children: ReactNode }>;
}> = ({
  className,
  Name = ({ className, children }) => (
    <span className={clsx(className, ["text-slate-800"])}>{children}</span>
  ),
  ExpName = ({ className, children }) => (
    <span className={clsx(className, ["text-slate-700"])}>{children}</span>
  ),
  ...props
}) => {
  const fragment = getFragment(Fragment, props.fragment);
  const { pseudoType, explicitParent } = fragment;
  return (
    <span
      className={clsx(
        className,
        ["inline-flex", ["items-center"]],
        ["bg-white"],
        [
          "border",
          [
            {
              "border-l-character-400": pseudoType === PseudoTagType.Character,
              "border-l-music-400": pseudoType === PseudoTagType.Music,
              "border-l-copyright-400": pseudoType === PseudoTagType.Copyright,
              "border-l-event-400": pseudoType === PseudoTagType.Event,
              "border-l-series-400": pseudoType === PseudoTagType.Series,
            },
          ],
        ]
        /*
        ["shadow-sm"],
        ["rounded"],
        ["pr-2", "pl-1.5", "py-0.5"],
        ["text-xs"]
        */
      )}
    >
      <Name>{fragment.name}</Name>
      {explicitParent && <ExpName>({explicitParent.name})</ExpName>}
    </span>
  );
};
