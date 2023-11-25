import clsx from "clsx";
import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";
import { TagType } from "~/gql/graphql";

export const CommonTagFragment = graphql(`
  fragment CommonTag on Tag {
    name
    type
    explicitParent {
      id
      name
    }
  }
`);

export default function CommonTag({
  className,
  size,
  disabled = false,
  hoverable = false,
  selectable = false,
  selected,
  ...props
}: {
  className?: string;
  size: "xs" | "small";
  fragment: FragmentType<typeof CommonTagFragment>;
  disabled?: boolean;
  hoverable?: boolean;
  selectable?: boolean;
  selected?: boolean;
}) {
  const fragment = useFragment(CommonTagFragment, props.fragment);
  const { type, explicitParent } = fragment;
  return (
    <div
      aria-disabled={disabled}
      aria-selected={selected}
      className={clsx(
        className,
        "group flex border",
        {
          xs: "gap-x-0.5 px-1 py-0.5 text-xxs",
          small: "gap-x-1 px-2 py-1 text-sm",
        }[size],
        hoverable && "transition-colors duration-75",
        {
          [TagType.Category]: undefined,
          [TagType.Copyright]: [
            "border-tag-copyright-frame bg-tag-copyright-bg aria-disabled:border-tag-copyright-frameDisabled aria-disabled:bg-tag-copyright-bgDisabled",
            hoverable &&
              "group-hover:border-tag-copyright-frameHover group-hover:bg-tag-copyright-bgHover",
            selectable &&
              "group-aria-selected:border-tag-copyright-frameHover group-aria-selected:bg-tag-copyright-bgHover",
          ],
          [TagType.Character]: [
            "aria-disabled:bg-tag-character-950 border-tag-character-primary bg-tag-character-bgDisabled aria-disabled:border-tag-character-frameDisabled",
            hoverable &&
              "group-hover:border-tag-character-frameHover group-hover:bg-tag-character-bgHover",
            selectable &&
              "group-aria-selected:border-tag-character-frameHover group-aria-selected:bg-tag-character-bgHover",
          ],
          [TagType.Class]: [
            "border-tag-class-frame bg-tag-class-bgDisabled aria-disabled:border-tag-class-frameDisabled aria-disabled:bg-tag-class-bgDisabled",
            hoverable &&
              "group-hover:border-tag-class-frameHover group-hover:bg-tag-class-bgHover",
            selectable &&
              "group-aria-selected:border-tag-class-frameHover group-aria-selected:bg-tag-class-bgHover",
          ],
          [TagType.Event]: [
            "border-tag-event-frame bg-tag-event-bgDisabled aria-disabled:border-tag-event-frameDisabled aria-disabled:bg-tag-event-bgDisabled",
            hoverable &&
              "group-hover:border-tag-event-frameHover group-hover:bg-tag-event-bgHover",
            selectable &&
              "group-aria-selected:border-tag-event-frameHover group-aria-selected:bg-tag-event-bgHover",
          ],
          [TagType.Music]: [
            "border-tag-music-frame bg-tag-music-bg aria-disabled:border-tag-music-frameDisabled aria-disabled:bg-tag-music-bgDisabled",
            hoverable &&
              "group-hover:border-tag-music-frameHover group-hover:bg-tag-music-bgHover",
            selectable &&
              "group-aria-selected:border-tag-music-frameHover group-aria-selected:bg-tag-music-bgHover",
          ],
          [TagType.Phrase]: [
            "border-tag-phrase-frame bg-tag-phrase-bgDisabled aria-disabled:border-tag-phrase-frameDisabled aria-disabled:bg-tag-phrase-bgDisabled",
            hoverable &&
              "group-hover:border-tag-phrase-frameHover group-hover:bg-tag-phrase-bgHover",
            selectable &&
              "group-aria-selected:border-tag-phrase-frameHover group-aria-selected:bg-tag-phrase-bgHover",
          ],
          [TagType.Series]: [
            "border-tag-series-frame bg-tag-series-bgDisabled aria-disabled:border-tag-series-frameDisabled aria-disabled:bg-tag-series-bgDisabled",
            hoverable &&
              "group-hover:border-tag-series-frameHover group-hover:bg-tag-series-bgHover",
            selectable &&
              "group-aria-selected:border-tag-series-frameHover group-aria-selected:bg-tag-series-bgHover",
          ],
          [TagType.Style]: [
            "border-tag-style-disabled bg-tag-style-bgDisabled aria-disabled:border-tag-style-frameDisabled aria-disabled:bg-tag-style-bgDisabled",
            hoverable &&
              "group-hover:border-tag-style-frameHover group-hover:bg-tag-style-bgHover",
            selectable &&
              "group-aria-selected:border-tag-style-frameHover group-aria-selected:bg-tag-style-bgHover",
          ],
          [TagType.Subtle]: [
            "border-tag-subtle-disabled bg-tag-subtle-bgDisabled aria-disabled:border-tag-subtle-frameDisabled aria-disabled:bg-tag-subtle-bgDisabled",
            hoverable &&
              "group-hover:border-tag-subtle-frameHover group-hover:bg-tag-subtle-bgHover",
            selectable &&
              "group-aria-selected:border-tag-subtle-frameHover group-aria-selected:bg-tag-subtle-bgHover",
          ],
          [TagType.Tactics]: [
            "border-tag-tactics-disabled bg-tag-tactics-bgDisabled aria-disabled:border-tag-tactics-frameDisabled aria-disabled:bg-tag-tactics-bgDisabled",
            hoverable &&
              "group-hover:border-tag-tactics-frameHover group-hover:bg-tag-tactics-bgHover",
            selectable &&
              "group-aria-selected:border-tag-tactics-frameHover group-aria-selected:bg-tag-tactics-bgHover",
          ],
          [TagType.Unknown]: [
            "border-tag-unknown-disabled bg-tag-unknown-bgDisabled aria-disabled:border-tag-unknown-frameDisabled aria-disabled:bg-tag-unknown-bgDisabled",
            hoverable &&
              "group-hover:border-tag-unknown-frameHover group-hover:bg-tag-unknown-bgHover",
            selectable &&
              "group-aria-selected:border-tag-unknown-frameHover group-aria-selected:bg-tag-unknown-bgHover",
          ],
        }[type]
      )}
    >
      <span
        className={clsx(
          "font-bold",
          hoverable && "transition-colors duration-75",
          {
            [TagType.Category]: undefined,
            [TagType.Copyright]: [
              "text-tag-copyright-primary group-aria-disabled:text-tag-copyright-disabled",
              hoverable && "group-hover:text-tag-copyright-vivid",
              selectable && "group-aria-selected:text-tag-copyright-vivid",
            ],
            [TagType.Character]: [
              "text-tag-character-primary group-aria-disabled:text-tag-character-disabled",
              hoverable && "group-hover:text-tag-character-vivid",
              selectable && "group-aria-selected:text-tag-character-vivid",
            ],
            [TagType.Class]: [
              "text-tag-class-primary group-aria-disabled:text-tag-class-disabled",
              hoverable && "group-hover:text-tag-class-vivid",
              selectable && "group-aria-selected:text-tag-class-vivid",
            ],
            [TagType.Event]: [
              "text-tag-event-primary group-aria-disabled:text-tag-event-disabled",
              hoverable && "group-hover:text-tag-event-vivid",
              selectable && "group-aria-selected:text-tag-event-vivid",
            ],
            [TagType.Music]: [
              "text-tag-music-primary group-aria-disabled:text-tag-music-disabled",
              hoverable && "group-hover:text-tag-music-vivid",
              selectable && "group-aria-selected:text-tag-music-vivid",
            ],
            [TagType.Phrase]: [
              "text-tag-phrase-primary group-aria-disabled:text-tag-phrase-disabled",
              hoverable && "group-hover:text-tag-phrase-vivid",
              selectable && "group-aria-selected:text-tag-phrase-vivid",
            ],
            [TagType.Series]: [
              "text-tag-series-primary group-aria-disabled:text-tag-series-disabled",
              hoverable && "group-hover:text-tag-series-vivid",
              selectable && "group-aria-selected:text-tag-series-vivid",
            ],
            [TagType.Style]: [
              "text-tag-style-primary group-aria-disabled:text-tag-style-disabled",
              hoverable && "group-hover:text-tag-style-vivid",
              selectable && "group-aria-selected:text-tag-style-vivid",
            ],
            [TagType.Subtle]: [
              "text-tag-subtle-primary group-aria-disabled:text-tag-subtle-disabled",
              hoverable && "group-hover:text-tag-subtle-vivid",
              selectable && "group-aria-selected:text-tag-subtle-vivid",
            ],
            [TagType.Tactics]: [
              "text-tag-tactics-primary group-aria-disabled:text-tag-tactics-disabled",
              hoverable && "group-hover:text-tag-tactics-vivid",
              selectable && "group-aria-selected:text-tag-tactics-vivid",
            ],
            [TagType.Unknown]: [
              "text-tag-unknown-primary group-aria-disabled:text-tag-unknown-disabled",
              hoverable && "group-hover:text-tag-unknown-vivid",
              selectable && "group-aria-selected:text-tag-unknown-vivid",
            ],
          }[type]
        )}
      >
        {fragment.name}
      </span>
      {explicitParent && (
        <span
          className={clsx(
            hoverable && "transition-colors duration-75",
            {
              [TagType.Category]: undefined,
              [TagType.Copyright]: [
                "text-tag-copyright-secondary group-aria-disabled:text-tag-copyright-disabled",
                hoverable && "group-hover:text-tag-copyright-vivid",
                selectable && "group-aria-selected:text-tag-copyright-vivid",
              ],
              [TagType.Character]: [
                "text-tag-character-secondary group-aria-disabled:text-tag-character-disabled",
                hoverable && "group-hover:text-tag-character-vivid",
                selectable && "group-aria-selected:text-tag-character-vivid",
              ],
              [TagType.Class]: [
                "text-tag-class-secondary group-aria-disabled:text-tag-class-disabled",
                hoverable && "group-hover:text-tag-class-vivid",
                selectable && "group-aria-selected:text-tag-class-vivid",
              ],
              [TagType.Event]: [
                "text-tag-event-secondary group-aria-disabled:text-tag-event-disabled",
                hoverable && "group-hover:text-tag-event-vivid",
                selectable && "group-aria-selected:text-tag-event-vivid",
              ],
              [TagType.Music]: [
                "text-tag-music-secondary group-aria-disabled:text-tag-music-disabled",
                hoverable && "group-hover:text-tag-music-vivid",
                selectable && "group-aria-selected:text-tag-music-vivid",
              ],
              [TagType.Phrase]: [
                "text-tag-phrase-secondary group-aria-disabled:text-tag-phrase-disabled",
                hoverable && "group-hover:text-tag-phrase-vivid",
                selectable && "group-aria-selected:text-tag-phrase-vivid",
              ],
              [TagType.Series]: [
                "text-tag-series-secondary group-aria-disabled:text-tag-series-disabled",
                hoverable && "group-hover:text-tag-series-vivid",
                selectable && "group-aria-selected:text-tag-series-vivid",
              ],
              [TagType.Style]: [
                "text-tag-style-secondary group-aria-disabled:text-tag-style-disabled",
                hoverable && "group-hover:text-tag-style-vivid",
                selectable && "group-aria-selected:text-tag-style-vivid",
              ],
              [TagType.Subtle]: [
                "text-tag-subtle-secondary group-aria-disabled:text-tag-subtle-disabled",
                hoverable && "group-hover:text-tag-subtle-vivid",
                selectable && "group-aria-selected:text-tag-subtle-vivid",
              ],
              [TagType.Tactics]: [
                "text-tag-tactics-secondary group-aria-disabled:text-tag-tactics-disabled",
                hoverable && "group-hover:text-tag-tactics-vivid",
                selectable && "group-aria-selected:text-tag-tactics-vivid",
              ],
              [TagType.Unknown]: [
                "text-tag-unknown-secondary group-aria-disabled:text-tag-unknown-disabled",
                hoverable && "group-hover:text-tag-unknown-vivid",
                selectable && "group-aria-selected:text-tag-unknown-vivid",
              ],
            }[type]
          )}
        >
          ({explicitParent.name})
        </span>
      )}
    </div>
  );
}
