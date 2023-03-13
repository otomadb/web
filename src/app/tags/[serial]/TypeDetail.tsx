import clsx from "clsx";

import { FragmentType, getFragment, graphql } from "~/gql";
import { TagType } from "~/gql/graphql";

export const Fragment = graphql(`
  fragment TagPageLayout_TypeDetail on Tag {
    type
  }
`);
export const TypeDetail: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const { type } = getFragment(Fragment, props.fragment);
  return (
    <div className={clsx(className, ["flex", "items-center"], ["gap-x-2"])}>
      <h2 className={clsx(["text-sm", "text-slate-600"])}>タグのタイプ</h2>
      <div className={clsx(["flex", "gap-x-2"])}>
        <span
          className={clsx(
            type === TagType.Character && ["text-character-700"],
            type === TagType.Class && [],
            type === TagType.Music && ["text-music-700"],
            type === TagType.Copyright && ["text-copyright-700"],
            type === TagType.Event && ["text-event-700"],
            type === TagType.Phrase && ["text-phrase-700"],
            type === TagType.Series && ["text-series-700"],
            type === TagType.Style && [],
            type === TagType.Subtle && ["text-slate-700"],
            type === TagType.Tactics && [],
            type === TagType.Unknown && ["text-slate-700"]
          )}
        >
          {type === TagType.Character && "キャラクター"}
          {type === TagType.Class && "分類"}
          {type === TagType.Music && "曲"}
          {type === TagType.Copyright && "作品名"}
          {type === TagType.Event && "イベント"}
          {type === TagType.Phrase && "セリフ"}
          {type === TagType.Series && "シリーズ"}
          {type === TagType.Style && "性質"}
          {type === TagType.Subtle && "重複"}
          {type === TagType.Tactics && "戦法"}
          {type === TagType.Unknown && "未定義"}
        </span>
      </div>
    </div>
  );
};
