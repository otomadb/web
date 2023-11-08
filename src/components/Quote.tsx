import { css, keyframes } from "@emotion/css";
import clsx from "clsx";
import React from "react";

export const quotes: {
  quote: string;
  saidby?: string;
  ref: {
    title: string;
    author?: string;
    from?: string;
    series?: string;
  };
}[] = [
  {
    quote: "お前の好きなものが分かってよかった",
    ref: {
      author: "リザルナーグ",
      title: "テレフォン・ハンバーガー",
      from: "コメント欄",
    },
  },
  {
    quote: "みんなも一緒にやってみようよ",
    saidby: "ドナルド・マクドナルド",
    ref: {
      title: "ランランルーってなんなんだー？",
      series: "ドナルドのウワサ",
    },
  },
  {
    quote: "死ぬほど好きすぎて！",
    ref: {
      author: "Otomadology",
      title: "ラーメン屋の親父コア",
      from: "投稿者コメント",
    },
  },
  {
    quote: "これまで生きてきた22年をまとめてみました！",
    ref: {
      author: "ｽﾐﾜｹ",
      title: "俺の人生を形作った素材でRay of hope",
      from: "投稿者コメント",
    },
  },
  {
    quote: "こんばんは～",
    ref: {
      author: "本格的挨拶祭性作委淫会",
      title: "こんばんは～（挨拶の大切さを訴えないと叱られるから）",
      from: "コメント欄",
    },
  },
  {
    quote: "思い出これしかないの？",
    ref: {
      author: "JR根岸線「関内駅」から徒歩5分,他",
      title: "本格的アメゲイ祭 - いまだ消えないこの臨場感 -",
      from: "コメント欄",
    },
  },
];

const blur = keyframes`
  from {
    translate: 0 12px;
    opacity: 0;
  }

  to {
    translate: 0 0;
    opacity: 1;
  }
`;
export default function Quote({
  className,
  style,
  index,
}: {
  className?: string;
  style?: React.CSSProperties;
  index: number;
}) {
  const q = quotes[index % quotes.length];

  return (
    <figure
      className={clsx(
        className,
        ["flex flex-col items-center"],
        css`
          & {
            animation: ${blur} both 1s cubic-bezier(0.23, 1, 0.32, 1);
          }
        `
      )}
      style={style}
    >
      <blockquote>
        <span className={clsx("text-sm text-slate-700")}>{q.quote}</span>
        {q.saidby && (
          <span
            className={clsx([
              "ml-1 text-xs italic text-slate-500 before:mr-0.5 before:content-['―']",
            ])}
          >
            {q.saidby}
          </span>
        )}
      </blockquote>
      <figcaption
        className={clsx([
          "mt-1 text-xs text-slate-500 before:mr-0.5 before:content-['―']",
        ])}
      >
        {q.ref.author && <span>{q.ref.author}</span>}
        {q.ref.series && <span className={clsx("italic")}>{q.ref.series}</span>}
        <cite className={clsx("italic")}>『{q.ref.title}』</cite>
        {q.ref.from && <span>{q.ref.from}より</span>}
      </figcaption>
    </figure>
  );
}
