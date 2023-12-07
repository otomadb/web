import { useMemo, useReducer } from "react";

import { FragmentType } from "~/gql";

import { TagButtonFragment } from "./TagButton";

const useRegisterFormEditTaggings = () => {
  const [tags, dispatchTags] = useReducer(
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
          return [
            ...new Set([
              ...prev,
              { id: action.tagId, fragment: action.fragment },
            ]),
          ];
        case "remove":
          return prev.filter(({ id }) => id !== action.tagId);
        case "clear":
          return [];
      }
    },
    []
  );
  const tagIds = useMemo(() => tags.map(({ id }) => id), [tags]);

  return {
    tags,
    taggingsPayload: tagIds,
    isSelecting: (tagId: string) => tagIds.includes(tagId),
    appendTag: (
      tagId: string,
      fragment: FragmentType<typeof TagButtonFragment>
    ) => dispatchTags({ type: "append", tagId, fragment }),
    removeTag: (tagId: string) => dispatchTags({ type: "remove", tagId }),
    clearTags: () => dispatchTags({ type: "clear" }),
  };
};
export default useRegisterFormEditTaggings;
