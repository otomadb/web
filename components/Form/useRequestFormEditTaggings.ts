import { useMemo, useReducer } from "react";

import { FragmentType } from "~/gql";

import { TagButtonFragment } from "./TagButton";

const useRequestEditTags = () => {
  const [taggings, dispatchTags] = useReducer(
    (
      prev: { id: string; fragment: FragmentType<typeof TagButtonFragment> }[],
      action:
        | {
            type: "append";
            tagId: string;
            fragment: FragmentType<typeof TagButtonFragment>;
          }
        | { type: "remove"; tagId: string }
        | { type: "clear" }
    ) => {
      switch (action.type) {
        case "append":
          if (prev.map(({ id }) => id).includes(action.tagId)) return prev;
          return [...prev, { id: action.tagId, fragment: action.fragment }];
        case "remove":
          return prev.filter(({ id }) => id !== action.tagId);
        case "clear":
          return [];
      }
    },
    []
  );
  const payload = useMemo(
    () => taggings.map(({ id }) => ({ tagId: id, note: null })),
    [taggings]
  );

  return {
    taggings,
    taggingsPayload: payload,
    isSelecting: (tagId: string) =>
      taggings.map(({ id }) => id).includes(tagId),
    appendTag: (
      tagId: string,
      fragment: FragmentType<typeof TagButtonFragment>
    ) => dispatchTags({ type: "append", tagId, fragment }),
    removeTag: (tagId: string) => dispatchTags({ type: "remove", tagId }),
    clearTags: () => dispatchTags({ type: "clear" }),
  };
};

export default useRequestEditTags;
