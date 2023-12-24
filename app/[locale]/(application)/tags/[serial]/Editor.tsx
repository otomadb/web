"use client";

import clsx from "clsx";

import { useOpenTagCategorizerForm } from "~/components/FormWidget";
import useHasRole from "~/components/useHasRole";
import { FragmentType, graphql, useFragment } from "~/gql";

const TagEditorFragment = graphql(`
  fragment TagPageLayout_EditorPanel on Tag {
    id
  }
`);
const EditorPanel: React.FC<{
  className?: string;
  fragment: FragmentType<typeof TagEditorFragment>;
}> = ({ className, fragment }) => {
  const { id } = useFragment(TagEditorFragment, fragment);
  const hasRole = useHasRole();
  const openTagCategorizer = useOpenTagCategorizerForm();

  if (!hasRole) return null;

  return (
    <div className={clsx(className, "flex flex-col")}>
      <div
        role="button"
        className={clsx("text-xs text-snow-darkest")}
        onClick={() => {
          openTagCategorizer({ tagId: id });
        }}
      >
        タグのタイプを編集する
      </div>
    </div>
  );
};

export default EditorPanel;
