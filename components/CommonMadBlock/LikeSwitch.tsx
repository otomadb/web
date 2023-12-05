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
      disabled={current === undefined}
      aria-checked={
        current === undefined ? "mixed" : current ? "true" : "false"
      }
      onClick={() => {
        if (current === undefined) return;
        current ? unlike() : like();
      }}
      className={clsx(className, "group/like h-8 w-8")}
      style={style}
    >
      {current === undefined ? (
        <OutlineHeartPictogram
          className={clsx("h-full w-full text-snow-darkest/25")}
        />
      ) : current ? (
        <FilledHeartPictogram
          className={clsx("h-full w-full text-like-primary/75")}
        />
      ) : (
        <OutlineHeartPictogram
          className={clsx(
            "h-full w-full text-snow-lightest/75 transition-colors duration-100 group-hover/like:text-like-primary/75"
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
  activate: boolean;
}> = ({ fragment, activate, ...props }) => {
  return (
    <LikeSwitchSkelton
      {...props}
      activate={activate}
      fragment={useFragment(LikeSwitchFragment, fragment)}
      Presentation={Presentation}
    />
  );
};
export default LikeSwitch;
