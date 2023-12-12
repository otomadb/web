import clsx from "clsx";
import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

export const CommonTagFragment = graphql(`
  fragment CommonTag on Tag {
    name
    belongTo {
      keyword
    }
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
  const { belongTo, explicitParent } = fragment;
  return (
    <div
      aria-disabled={disabled}
      aria-selected={selected}
      className={clsx(
        className,
        "group inline-flex border",
        {
          xs: "gap-x-0.5 px-1 py-0.5 text-xxs",
          small: "gap-x-1 px-2 py-1 text-sm",
        }[size],
        hoverable && "transition-colors duration-75",
        belongTo
          ? {
              copyright: [
                "border-tag-copyright-frame bg-tag-copyright-bg aria-disabled:border-tag-copyright-frameDisabled aria-disabled:bg-tag-copyright-bgDisabled",
                hoverable &&
                  "group-hover:border-tag-copyright-frameHover group-hover:bg-tag-copyright-bgHover",
                selectable &&
                  "group-aria-selected:border-tag-copyright-frameHover group-aria-selected:bg-tag-copyright-bgHover",
              ],
              character: [
                "aria-disabled:bg-tag-character-950 border-tag-character-primary bg-tag-character-bgDisabled aria-disabled:border-tag-character-frameDisabled",
                hoverable &&
                  "group-hover:border-tag-character-frameHover group-hover:bg-tag-character-bgHover",
                selectable &&
                  "group-aria-selected:border-tag-character-frameHover group-aria-selected:bg-tag-character-bgHover",
              ],
              music: [
                "border-tag-music-frame bg-tag-music-bg aria-disabled:border-tag-music-frameDisabled aria-disabled:bg-tag-music-bgDisabled",
                hoverable &&
                  "group-hover:border-tag-music-frameHover group-hover:bg-tag-music-bgHover",
                selectable &&
                  "group-aria-selected:border-tag-music-frameHover group-aria-selected:bg-tag-music-bgHover",
              ],
              phrase: [
                "border-tag-phrase-frame bg-tag-phrase-bgDisabled aria-disabled:border-tag-phrase-frameDisabled aria-disabled:bg-tag-phrase-bgDisabled",
                hoverable &&
                  "group-hover:border-tag-phrase-frameHover group-hover:bg-tag-phrase-bgHover",
                selectable &&
                  "group-aria-selected:border-tag-phrase-frameHover group-aria-selected:bg-tag-phrase-bgHover",
              ],
              series: [
                "border-tag-series-frame bg-tag-series-bgDisabled aria-disabled:border-tag-series-frameDisabled aria-disabled:bg-tag-series-bgDisabled",
                hoverable &&
                  "group-hover:border-tag-series-frameHover group-hover:bg-tag-series-bgHover",
                selectable &&
                  "group-aria-selected:border-tag-series-frameHover group-aria-selected:bg-tag-series-bgHover",
              ],
              class: [
                "border-tag-class-secondary bg-tag-class-back",
                hoverable &&
                  "hover:border-tag-class-secondary-vivid hover:bg-tag-class-back-vivid",
                "aria-selected:border-tag-class-secondary-vivid aria-selected:bg-tag-class-back-vivid",
                "aria-disabled:border-tag-class-secondary-muted aria-disabled:bg-tag-class-back-muted",
              ],
              realperson: [
                "border-tag-realperson-secondary bg-tag-realperson-back",
                hoverable &&
                  "hover:border-tag-realperson-secondary-vivid hover:bg-tag-realperson-back-vivid",
                "aria-selected:border-tag-realperson-secondary-vivid aria-selected:bg-tag-realperson-back-vivid",
                "aria-disabled:border-tag-realperson-secondary-muted aria-disabled:bg-tag-realperson-back-muted",
              ],
              style: [
                "border-tag-style-secondary bg-tag-style-back",
                hoverable &&
                  "hover:border-tag-style-secondary-vivid hover:bg-tag-style-back-vivid",
                "aria-selected:border-tag-style-secondary-vivid aria-selected:bg-tag-style-back-vivid",
                "aria-disabled:border-tag-style-secondary-muted aria-disabled:bg-tag-style-back-muted",
              ],
              technique: [
                "border-tag-technique-secondary bg-tag-technique-back",
                hoverable &&
                  "hover:border-tag-technique-secondary-vivid hover:bg-tag-technique-back-vivid",
                "aria-selected:border-tag-technique-secondary-vivid aria-selected:bg-tag-technique-back-vivid",
                "aria-disabled:border-tag-technique-secondary-muted aria-disabled:bg-tag-technique-back-muted",
              ],
              event: [
                "border-tag-event-secondary bg-tag-event-back",
                hoverable &&
                  "hover:border-tag-event-secondary-vivid hover:bg-tag-event-back-vivid",
                "aria-selected:border-tag-event-secondary-vivid aria-selected:bg-tag-event-back-vivid",
                "aria-disabled:border-tag-event-secondary-muted aria-disabled:bg-tag-event-back-muted",
              ],
            }[belongTo.keyword]
          : [
              "border-tag-subtle-disabled bg-tag-subtle-bgDisabled aria-disabled:border-tag-subtle-frameDisabled aria-disabled:bg-tag-subtle-bgDisabled",
              hoverable &&
                "group-hover:border-tag-subtle-frameHover group-hover:bg-tag-subtle-bgHover",
              selectable &&
                "group-aria-selected:border-tag-subtle-frameHover group-aria-selected:bg-tag-subtle-bgHover",
            ]
      )}
    >
      <span
        className={clsx(
          "font-bold",
          hoverable && "transition-colors duration-75",
          belongTo
            ? {
                copyright: [
                  "text-tag-copyright-primary group-aria-disabled:text-tag-copyright-disabled",
                  hoverable && "group-hover:text-tag-copyright-vivid",
                  selectable && "group-aria-selected:text-tag-copyright-vivid",
                ],
                character: [
                  "text-tag-character-primary group-aria-disabled:text-tag-character-disabled",
                  hoverable && "group-hover:text-tag-character-vivid",
                  selectable && "group-aria-selected:text-tag-character-vivid",
                ],
                music: [
                  "text-tag-music-primary group-aria-disabled:text-tag-music-disabled",
                  hoverable && "group-hover:text-tag-music-vivid",
                  selectable && "group-aria-selected:text-tag-music-vivid",
                ],
                phrase: [
                  "text-tag-phrase-primary group-aria-disabled:text-tag-phrase-disabled",
                  hoverable && "group-hover:text-tag-phrase-vivid",
                  selectable && "group-aria-selected:text-tag-phrase-vivid",
                ],
                series: [
                  "text-tag-series-primary group-aria-disabled:text-tag-series-disabled",
                  hoverable && "group-hover:text-tag-series-vivid",
                  selectable && "group-aria-selected:text-tag-series-vivid",
                ],
                class: [
                  "text-tag-class-primary",
                  "group-aria-selected:text-tag-class-primary-vivid",
                  "group-aria-disabled:text-tag-class-primary-muted",
                  hoverable && "group-hover:text-tag-class-primary-vivid",
                ],
                realperson: [
                  "text-tag-realperson-primary",
                  "group-aria-selected:text-tag-realperson-primary-vivid",
                  "group-aria-disabled:text-tag-realperson-primary-muted",
                  hoverable && "group-hover:text-tag-realperson-primary-vivid",
                ],
                style: [
                  "text-tag-style-primary",
                  "group-aria-selected:text-tag-style-primary-vivid",
                  "group-aria-disabled:text-tag-style-primary-muted",
                  hoverable && "group-hover:text-tag-style-primary-vivid",
                ],
                technique: [
                  "text-tag-technique-primary",
                  "group-aria-selected:text-tag-technique-primary-vivid",
                  "group-aria-disabled:text-tag-technique-primary-muted",
                  hoverable && "group-hover:text-tag-technique-primary-vivid",
                ],
                event: [
                  "text-tag-event-primary",
                  "group-aria-selected:text-tag-event-primary-vivid",
                  "group-aria-disabled:text-tag-event-primary-muted",
                  hoverable && "group-hover:text-tag-event-primary-vivid",
                ],
              }[belongTo.keyword]
            : [
                "text-tag-subtle-primary group-aria-disabled:text-tag-subtle-disabled",
                hoverable && "group-hover:text-tag-subtle-vivid",
                selectable && "group-aria-selected:text-tag-subtle-vivid",
              ]
        )}
      >
        {fragment.name}
      </span>
      {explicitParent && (
        <span
          className={clsx(
            hoverable && "transition-colors duration-75",
            belongTo
              ? {
                  copyright: [
                    "text-tag-copyright-secondary group-aria-disabled:text-tag-copyright-disabled",
                    hoverable && "group-hover:text-tag-copyright-vivid",
                    selectable &&
                      "group-aria-selected:text-tag-copyright-vivid",
                  ],
                  character: [
                    "text-tag-character-secondary group-aria-disabled:text-tag-character-disabled",
                    hoverable && "group-hover:text-tag-character-vivid",
                    selectable &&
                      "group-aria-selected:text-tag-character-vivid",
                  ],
                  music: [
                    "text-tag-music-secondary group-aria-disabled:text-tag-music-disabled",
                    hoverable && "group-hover:text-tag-music-vivid",
                    selectable && "group-aria-selected:text-tag-music-vivid",
                  ],
                  phrase: [
                    "text-tag-phrase-secondary group-aria-disabled:text-tag-phrase-disabled",
                    hoverable && "group-hover:text-tag-phrase-vivid",
                    selectable && "group-aria-selected:text-tag-phrase-vivid",
                  ],
                  series: [
                    "text-tag-series-secondary group-aria-disabled:text-tag-series-disabled",
                    hoverable && "group-hover:text-tag-series-vivid",
                    selectable && "group-aria-selected:text-tag-series-vivid",
                  ],
                  realperson: [
                    "text-tag-realperson-secondary",
                    "group-aria-selected:text-tag-realperson-secondary-vivid",
                    "group-aria-disabled:text-tag-realperson-secondary-muted",
                    hoverable &&
                      "group-hover:text-tag-realperson-secondary-vivid",
                  ],
                  class: [
                    "text-tag-class-secondary",
                    "group-aria-selected:text-tag-class-secondary-vivid",
                    "group-aria-disabled:text-tag-class-secondary-muted",
                    hoverable && "group-hover:text-tag-class-secondary-vivid",
                  ],
                  style: [
                    "text-tag-style-secondary",
                    "group-aria-selected:text-tag-style-secondary-vivid",
                    "group-aria-disabled:text-tag-style-secondary-muted",
                    hoverable && "group-hover:text-tag-style-secondary-vivid",
                  ],
                  technique: [
                    "text-tag-technique-secondary",
                    "group-aria-selected:text-tag-technique-secondary-vivid",
                    "group-aria-disabled:text-tag-technique-secondary-muted",
                    hoverable &&
                      "group-hover:text-tag-technique-secondary-vivid",
                  ],
                  event: [
                    "text-tag-event-secondary",
                    "group-aria-selected:text-tag-event-secondary-vivid",
                    "group-aria-disabled:text-tag-event-secondary-muted",
                    hoverable && "group-hover:text-tag-event-secondary-vivid",
                  ],
                }[belongTo.keyword]
              : [
                  "text-tag-subtle-secondary group-aria-disabled:text-tag-subtle-disabled",
                  hoverable && "group-hover:text-tag-subtle-vivid",
                  selectable && "group-aria-selected:text-tag-subtle-vivid",
                ]
          )}
        >
          ({explicitParent.name})
        </span>
      )}
    </div>
  );
}
