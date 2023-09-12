import clsx from "clsx";
import React from "react";

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
  disabled?: boolean;
}> = ({ className, disabled = false, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  const { type, explicitParent } = fragment;
  return (
    <span
      aria-disabled={disabled}
      className={clsx(
        className,
        ["group/tag"],
        ["border", "rounded-sm"],
        type === TagType.Character && [
          ["bg-character-50", "aria-disabled:bg-character-100"],
          ["border-character-500", "aria-disabled:border-character-300"],
        ],
        type === TagType.Class && [["bg-slate-50"], ["border-slate-400"]],
        type === TagType.Copyright && [
          ["bg-copyright-50"],
          ["border-copyright-300"],
        ],
        type === TagType.Event && [
          ["bg-event-50", "bg-event-100"],
          ["border-event-400", "border-event-300"],
        ],
        type === TagType.Music && [
          ["bg-music-50", "aria-disabled:bg-music-100"],
          ["border-music-400", "aria-disabled:border-music-300"],
        ],
        type === TagType.Phrase && [["bg-phrase-50"], ["border-phrase-400"]],
        type === TagType.Series && [
          ["bg-series-50", "aria-disabled:bg-series-100"],
          ["border-series-400", "aria-disabled:border-series-300"],
        ],
        type === TagType.Style && [["bg-slate-50"], ["border-slate-400"]],
        type === TagType.Subtle && [["bg-slate-50"], ["border-slate-400"]],
        type === TagType.Tactics && [["bg-slate-50"], ["border-slate-400"]],
        type === TagType.Unknown && [["bg-slate-50"], ["border-slate-400"]]
      )}
    >
      <span
        className={clsx(
          type === TagType.Character && [
            [
              "text-character-800",
              "group-aria-disabled/tag:text-character-400",
            ],
          ],
          type === TagType.Class && [["text-slate-800"]],
          type === TagType.Copyright && [["text-copyright-800"]],
          type === TagType.Event && [["text-event-800"]],
          type === TagType.Music && [
            ["text-music-800"],
            ["group-aria-disabled/tag:text-music-400"],
          ],
          type === TagType.Phrase && [["text-phrase-800"]],
          type === TagType.Series && [
            "text-series-800",
            "group-aria-disabled/tag:text-series-400",
          ],
          type === TagType.Style && [["text-slate-800"]],
          type === TagType.Subtle && [["text-slate-800"]],
          type === TagType.Tactics && [["text-slate-800"]],
          type === TagType.Unknown && [["text-slate-800"]]
        )}
      >
        {fragment.name}
      </span>
      {explicitParent && (
        <span
          className={clsx(
            type === TagType.Character && [["text-character-700"]],
            type === TagType.Class && [["text-slate-700"]],
            type === TagType.Copyright && [["text-copyright-700"]],
            type === TagType.Event && [["text-event-700"]],
            type === TagType.Music && [
              ["text-music-700"],
              ["group-aria-disabled/tag:text-music-400"],
            ],
            type === TagType.Phrase && [["text-phrase-700"]],
            type === TagType.Series && [
              "text-series-700",
              "group-group-aria-disabled/tag:text-series-400",
            ],
            type === TagType.Style && [["text-slate-700"]],
            type === TagType.Subtle && [["text-slate-700"]],
            type === TagType.Tactics && [["text-slate-700"]],
            type === TagType.Unknown && [["text-slate-700"]]
          )}
        >
          ({explicitParent.name})
        </span>
      )}
    </span>
  );
};

export const CommonTag2: React.FC<{
  className?: string;
  size: "xs" | "small";
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, size, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  const { type, explicitParent } = fragment;
  return (
    <div
      className={clsx(
        className,
        ["flex"],
        {
          xs: ["px-0.5", "py-0.25", "text-xs", "rounded-sm", "gap-x-0.5"],
          small: ["px-1", "py-0.5", "text-sm", "rounded", "gap-x-0.5"],
        }[size],
        ["border"],
        type === TagType.Character && [
          ["bg-character-900"],
          ["border-character-700"],
        ],
        type === TagType.Class && [["bg-slate-900"], ["border-slate-400"]],
        type === TagType.Copyright && [
          ["bg-copyright-900"],
          ["border-copyright-300"],
        ],
        type === TagType.Event && [["bg-event-900"], ["border-event-400"]],
        type === TagType.Music && [["bg-music-50"], ["border-music-400"]],
        type === TagType.Phrase && [["bg-phrase-50"], ["border-phrase-400"]],
        type === TagType.Series && [["bg-series-50"], ["border-series-400"]],
        type === TagType.Style && [["bg-slate-50"], ["border-slate-400"]],
        type === TagType.Subtle && [["bg-slate-50"], ["border-slate-400"]],
        type === TagType.Tactics && [["bg-slate-50"], ["border-slate-400"]],
        type === TagType.Unknown && [["bg-slate-50"], ["border-slate-400"]]
      )}
    >
      <span
        className={clsx(
          ["font-bold"],
          type === TagType.Character && [["text-character-300"]],
          type === TagType.Class && [["text-slate-300"]],
          type === TagType.Copyright && [["text-copyright-300"]],
          type === TagType.Event && [["text-event-300"]],
          type === TagType.Music && [["text-music-300"]],
          type === TagType.Phrase && [["text-phrase-300"]],
          type === TagType.Series && ["text-series-300"],
          type === TagType.Style && [["text-slate-300"]],
          type === TagType.Subtle && [["text-slate-300"]],
          type === TagType.Tactics && [["text-slate-300"]],
          type === TagType.Unknown && [["text-slate-300"]]
        )}
      >
        {fragment.name}
      </span>
      {explicitParent && (
        <span
          className={clsx(
            type === TagType.Character && [["text-character-500"]],
            type === TagType.Class && [["text-slate-500"]],
            type === TagType.Copyright && [["text-copyright-500"]],
            type === TagType.Event && [["text-event-500"]],
            type === TagType.Music && [["text-music-500"]],
            type === TagType.Phrase && [["text-phrase-500"]],
            type === TagType.Series && ["text-series-500"],
            type === TagType.Style && [["text-slate-500"]],
            type === TagType.Subtle && [["text-slate-500"]],
            type === TagType.Tactics && [["text-slate-500"]],
            type === TagType.Unknown && [["text-slate-500"]]
          )}
        >
          ({explicitParent.name})
        </span>
      )}
    </div>
  );
};
