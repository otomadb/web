import clsx from "clsx";

import { FragmentType, getFragment, graphql } from "~/gql";
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
  const { type } = getFragment(Fragment, props.fragment);
  return (
    <span
      className={clsx(
        className,
        type === Type.Character && ["text-character-700"],
        type === Type.Class && [],
        type === Type.Music && ["text-music-700"],
        type === Type.Copyright && ["text-copyright-700"],
        type === Type.Event && ["text-event-700"],
        type === Type.Phrase && ["text-phrase-700"],
        type === Type.Series && ["text-series-700"],
        type === Type.Style && [],
        type === Type.Subtle && ["text-slate-700"],
        type === Type.Tactics && [],
        type === Type.Unknown && ["text-slate-700"]
      )}
    >
      {type === Type.Character && "キャラクター"}
      {type === Type.Class && "分類"}
      {type === Type.Music && "曲"}
      {type === Type.Copyright && "作品名"}
      {type === Type.Event && "イベント"}
      {type === Type.Phrase && "セリフ"}
      {type === Type.Series && "シリーズ"}
      {type === Type.Style && "性質"}
      {type === Type.Subtle && "重複"}
      {type === Type.Tactics && "戦法"}
      {type === Type.Unknown && "未定義"}
    </span>
  );
};
