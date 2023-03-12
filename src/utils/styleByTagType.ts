import { TagType } from "~/gql/graphql";

export const styleByTagType = (type: TagType, prefix: string, s = 400) => [
  {
    [`${prefix}-character-${s}`]: type === TagType.Character,
    [`${prefix}-music-${s}`]: type === TagType.Music,
    [`${prefix}-copyright-${s}`]: type === TagType.Copyright,
    [`${prefix}-event-${s}`]: type === TagType.Event,
    [`${prefix}-series-${s}`]: type === TagType.Series,
  },
];
