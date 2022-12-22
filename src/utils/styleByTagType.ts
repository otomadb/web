"use client";
import { PseudoTagType } from "~/gql/graphql";

export const styleByTagType = (
  type: PseudoTagType,
  prefix: string,
  s = 400
) => [
  {
    [`${prefix}-character-${s}`]: type === PseudoTagType.Character,
    [`${prefix}-music-${s}`]: type === PseudoTagType.Music,
    [`${prefix}-copyright-${s}`]: type === PseudoTagType.Copyright,
    [`${prefix}-event-${s}`]: type === PseudoTagType.Event,
    [`${prefix}-series-${s}`]: type === PseudoTagType.Series,
  },
];
