"use client";

import clsx from "clsx";
import React from "react";

import LikeSwitchSkelton from "~/components/LikeToggleSwitchSkelton";
import {
  FilledHeartPictogram,
  OutlineHeartPictogram,
} from "~/components/Pictogram";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Presentation: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  current?: undefined | boolean;
  like(): void;
  unlike(): void;
}> = ({ className, style, current, like, unlike }) => {
  return (
    <button
      role="checkbox"
      onClick={() => {
        if (current === undefined) return;
        current ? unlike() : like();
      }}
      aria-checked={
        current === undefined ? "mixed" : current ? "true" : "false"
      }
      disabled={current === undefined}
      style={style}
      className={clsx(
        className,
        "group flex items-center justify-center gap-x-2 border py-2 transition-colors duration-100 ",
        "disabled:border-obsidian-lightest disabled:bg-obsidian-lighter",
        "border-obsidian-lighter bg-obsidian-primary hover:bg-obsidian-darker",
        "aria-checked:border-like-darker aria-checked:bg-like-darkest aria-checked:hover:bg-like-darker"
      )}
    >
      <div className={clsx("h-6 w-6")}>
        {current ? (
          <FilledHeartPictogram
            className={clsx(
              "h-full w-full animate-[like_0.5s_cubic-bezier(0.175,0.885,0.320,1.275)] transition-colors duration-75",
              "text-like-primary"
            )}
          />
        ) : (
          <OutlineHeartPictogram
            className={clsx(
              "h-full w-full  transition-colors duration-75",
              "group-disabled:text-obsidian-lightest",
              "text-snow-darker group-hover:text-snow-primary"
            )}
          />
        )}
      </div>
      <div
        className={clsx(
          "ml-1 text-sm font-bold transition-colors duration-75",
          "group-disabled:text-obsidian-lightest",
          "text-snow-darker group-hover:text-snow-primary",
          "group-aria-checked:animate-[fade-slide-l-to-r_0.5s] group-aria-checked:text-like-lighter group-aria-checked:group-hover:text-like-lightest"
        )}
      >
        いいね
      </div>
    </button>
  );
};

const LikeSwitchFragment = graphql(`
  fragment MadPageLayout_LikeSwitch on Video {
    ...LikeSwitchSkelton
  }
`);
export default function LikeButton({
  fragment,
  ...rest
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof LikeSwitchFragment>;
}) {
  return (
    <LikeSwitchSkelton
      {...rest}
      activate={true}
      fragment={useFragment(LikeSwitchFragment, fragment)}
      Presentation={Presentation}
    />
  );
}
