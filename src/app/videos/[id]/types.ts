"use client";

import { PseudoTagType as GqlPseudoTagType } from "~/gql/graphql";

export type PseudoTagType =
  | "CHARACTER"
  | "CLASS"
  | "COPYRIGHT"
  | "EVENT"
  | "MUSIC"
  | "PHRASE"
  | "SERIES"
  | "STYLE"
  | "TACTICS"
  | "SUBTLE"
  | "UNKNOWN";

export const parsePseudoTagType = (t: GqlPseudoTagType): PseudoTagType => {
  switch (t) {
    case GqlPseudoTagType.Character:
      return "CHARACTER";
    case GqlPseudoTagType.Class:
      return "CLASS";
    case GqlPseudoTagType.Copyright:
      return "COPYRIGHT";
    case GqlPseudoTagType.Event:
      return "EVENT";
    case GqlPseudoTagType.Music:
      return "MUSIC";
    case GqlPseudoTagType.Phrase:
      return "PHRASE";
    case GqlPseudoTagType.Series:
      return "SERIES";
    case GqlPseudoTagType.Style:
      return "STYLE";
    case GqlPseudoTagType.Tactics:
      return "TACTICS";
    case GqlPseudoTagType.Subtle:
      return "SUBTLE";
    case GqlPseudoTagType.Unknown:
      return "UNKNOWN";
  }
};

export type TagType = {
  id: string;
  name: string;
  // type: string;
  explicitParent: { id: string; name: string } | null;
  type: PseudoTagType;
};

export type HistoryItemType = {
  id: string;
  createdAt: string;
  user: { id: string; name: string; displayName: string; icon: string };
} & (
  | { type: "REGISTER" }
  | { type: "ADD_TITLE"; title: string }
  | { type: "DELETE_TITLE"; title: string }
  | { type: "CHANGE_PRIMARY_TITLE"; from: string | null; to: string }
  | { type: "ADD_THUMBNAIL"; thumbnail: string }
  | { type: "DELETE_THUMBNAIL"; thumbnail: string }
  | { type: "CHANGE_PRIMARY_THUMBNAIL"; from: string | null; to: string }
  | { type: "ADD_TAG"; tag: TagType }
  | { type: "DELETE_TAG"; tag: TagType }
  | { type: "ADD_NICONICO_SOURCE" }
);
