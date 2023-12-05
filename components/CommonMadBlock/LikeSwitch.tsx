"use client";

import clsx from "clsx";

import {
  LikeButtonPresentation,
  LikeSwitchSkelton,
} from "~/components/LikeToggleSwitchSkelton";
import {
  FilledHeartPictogram,
  OutlineHeartPictogram,
} from "~/components/Pictogram";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Presentation: LikeButtonPresentation = ({
  className,
  style,
  unlike,
  like,
  current,
}) => {
  return (
    <button
      type="button"
      role="checkbox"
      disabled={typeof current === "undefined"}
      aria-checked={typeof current === "undefined" ? "mixed" : current}
      onClick={() => {
        if (typeof current === "undefined") return;
        current ? unlike() : like();
      }}
      className={clsx(className, "group/like")}
      style={style}
    >
      {typeof current === "undefined" ? (
        <></>
      ) : current ? (
        <FilledHeartPictogram
          className={clsx("h-8 w-8 text-like-primary/75")}
        />
      ) : (
        <OutlineHeartPictogram
          className={clsx(
            "h-8 w-8 text-snow-lightest/75 transition-colors duration-100 group-hover/like:text-like-primary/75"
          )}
        />
      )}
    </button>
  );
};

export const LikeSwitchFragment = graphql(`
  fragment CommonMadBlock_LikeSwitch on Video {
    ...LikeSwitchSkelton
  }
`);
const LikeSwitch: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof LikeSwitchFragment>;
}> = ({ fragment, ...props }) => {
  return (
    <LikeSwitchSkelton
      {...props}
      fragment={useFragment(LikeSwitchFragment, fragment)}
      Presentation={Presentation}
    />
  );
};
export default LikeSwitch;
