"use client";

import clsx from "clsx";
import React, { useMemo, useState } from "react";

import quotes from "./quotes";

export default function Quote({
  className,
  style,
  initIndex: index,
}: {
  className?: string;
  style?: React.CSSProperties;
  initIndex: number;
}) {
  const [qi, setQi] = useState(index);
  const q = useMemo(() => quotes[qi], [qi]);

  return (
    <figure
      className={clsx(className, "flex select-none flex-col gap-y-1")}
      style={style}
      onClick={() => {
        setQi(
          (prev) =>
            (prev + Math.ceil((quotes.length - 1) * Math.random())) %
            quotes.length
        );
      }}
    >
      <blockquote
        className={clsx(
          "break-all font-serif text-sm font-bold text-snow-primary"
        )}
      >
        {q.quote}
        {q.saidby && (
          <span
            className={clsx(
              "ml-1 italic text-snow-darker before:mr-0.5 before:content-['―']"
            )}
          >
            {q.saidby}
          </span>
        )}
      </blockquote>
      <figcaption
        className={clsx(
          "break-all font-serif text-xs text-snow-darkest before:mr-0.5 before:content-['―']"
        )}
      >
        {q.ref.author && <span>{q.ref.author}</span>}
        {q.ref.series && <span className={clsx("italic")}>{q.ref.series}</span>}
        <cite className={clsx("font-bold italic")}>『{q.ref.title}』</cite>
        {q.ref.from && <span>{q.ref.from}より</span>}
      </figcaption>
    </figure>
  );
}
