import clsx from "clsx";
import React, { ReactNode } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";
import { TagType } from "~/gql/graphql";

const Fragment = graphql(`
  fragment CommonTag on Tag {
    id
    name
    type
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
  const fragment = useFragment(Fragment, props.fragment);
  const { type, explicitParent } = fragment;
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
              "border-l-character-400": type === TagType.Character,
              "border-l-music-400": type === TagType.Music,
              "border-l-copyright-400": type === TagType.Copyright,
              "border-l-event-400": type === TagType.Event,
              "border-l-series-400": type === TagType.Series,
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
