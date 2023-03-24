import clsx from "clsx";
import React, { ReactNode } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";
import { TagType } from "~/gql/graphql";

export const Fragment = graphql(`
  fragment CommonTag on Tag {
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
  ParentName?: React.FC<{ className?: string; children: ReactNode }>;
}> = ({
  className,
  Name = ({ className, children }) => (
    <span className={clsx(className)}>{children}</span>
  ),
  ParentName = ({ className, children }) => (
    <span className={clsx(className)}>{children}</span>
  ),
  ...props
}) => {
  const fragment = useFragment(Fragment, props.fragment);
  const { type, explicitParent } = fragment;
  return (
    <span
      className={clsx(
        className,
        ["border", "rounded-sm"],
        type === TagType.Character && [
          "bg-character-50",
          "border-character-500",
        ],
        type === TagType.Class && ["bg-slate-50", "border-slate-400"],
        type === TagType.Copyright && [
          "bg-copyright-50",
          "border-copyright-300",
        ],
        type === TagType.Event && ["bg-event-50", "border-event-400"],
        type === TagType.Music && ["bg-music-50", "border-music-400"],
        type === TagType.Phrase && ["bg-phrase-50", "border-phrase-400"],
        type === TagType.Series && ["bg-series-50", "border-series-400"],
        type === TagType.Style && ["bg-slate-50", "border-slate-400"],
        type === TagType.Subtle && ["bg-slate-50", "border-slate-400"],
        type === TagType.Tactics && ["bg-slate-50", "border-slate-400"],
        type === TagType.Unknown && ["bg-slate-50", "border-slate-400"]
      )}
    >
      <Name
        className={clsx(
          type === TagType.Character && ["text-character-800"],
          type === TagType.Class && ["text-slate-800"],
          type === TagType.Copyright && ["text-copyright-800"],
          type === TagType.Event && ["text-event-800"],
          type === TagType.Music && ["text-music-800"],
          type === TagType.Phrase && ["text-phrase-800"],
          type === TagType.Series && ["text-series-800"],
          type === TagType.Style && ["text-slate-800"],
          type === TagType.Subtle && ["text-slate-800"],
          type === TagType.Tactics && ["text-slate-800"],
          type === TagType.Unknown && ["text-slate-800"]
        )}
      >
        {fragment.name}
      </Name>
      {explicitParent && (
        <ParentName
          className={clsx(
            type === TagType.Character && ["text-character-700"],
            type === TagType.Class && ["text-slate-700"],
            type === TagType.Copyright && ["text-copyright-700"],
            type === TagType.Event && ["text-event-700"],
            type === TagType.Music && ["text-music-700"],
            type === TagType.Phrase && ["text-phrase-700"],
            type === TagType.Series && ["text-series-700"],
            type === TagType.Style && ["text-slate-700"],
            type === TagType.Subtle && ["text-slate-700"],
            type === TagType.Tactics && ["text-slate-700"],
            type === TagType.Unknown && ["text-slate-700"]
          )}
        >
          ({explicitParent.name})
        </ParentName>
      )}
    </span>
  );
};
