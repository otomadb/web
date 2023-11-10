import clsx from "clsx";

import { FragmentType, graphql, useFragment } from "~/gql";
import { TagType as Type } from "~/gql/graphql";

const Fragment = graphql(`
  fragment TagType on Tag {
    type
  }
`);
export const TagType: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const { type } = useFragment(Fragment, props.fragment);
  return (
    <span
      className={clsx(
        className,
        {
          [Type.Category]: undefined,
          [Type.Character]: "text-tag-character-primary",
          [Type.Class]: "text-tag-class-primary",
          [Type.Music]: "text-tag-music-primary",
          [Type.Copyright]: "text-tag-copyright-primary",
          [Type.Event]: "text-tag-event-primary",
          [Type.Phrase]: "text-tag-phrase-primary",
          [Type.Series]: "text-tag-series-primary",
          [Type.Style]: "text-tag-style-primary",
          [Type.Subtle]: "text-tag-subtle-primary",
          [Type.Tactics]: "text-tag-tactics-primary",
          [Type.Unknown]: "text-tag-unknown-primary",
        }[type]
      )}
    >
      {
        {
          [Type.Category]: undefined,
          [Type.Character]: "キャラクター",
          [Type.Class]: "分類",
          [Type.Music]: "曲",
          [Type.Copyright]: "作品",
          [Type.Event]: "イベント",
          [Type.Phrase]: "セリフ",
          [Type.Series]: "シリーズ",
          [Type.Style]: "性質",
          [Type.Subtle]: "重複",
          [Type.Tactics]: "戦法",
          [Type.Unknown]: "未定義",
        }[type]
      }
    </span>
  );
};
