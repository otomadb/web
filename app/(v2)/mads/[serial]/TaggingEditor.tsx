import clsx from "clsx";

import { EditTaggingPictogram } from "~/components/Pictogram";
import { graphql } from "~/gql";
import { makeGraphQLClient2 } from "~/gql/fetch";

import TaggingSearcher from "./TaggingEditorTagSearcher";

const TaggingEditor = async ({
  className,
  madId,
}: {
  className?: string;
  madId: string;
}) => {
  const { getVideo, viewer } = await (
    await makeGraphQLClient2({ auth: "optional" })
  ).request(
    graphql(`
      query MadPageLayout_TaggingsEditor($id: ID!) {
        getVideo(id: $id) {
          ...MadPageLayout_TaggingsEditor_TagSearcher
        }
        viewer {
          hasRole(role: EDITOR)
        }
      }
    `),
    { id: madId }
  );

  if (!viewer?.hasRole) return null;

  return (
    <details className={clsx("group relative h-6 w-6 p-1")}>
      <summary
        className={clsx(
          "z-0 cursor-pointer list-none",
          "group-open:before:fixed group-open:before:inset-0 group-open:before:cursor-auto group-open:before:bg-black/50"
        )}
      >
        <EditTaggingPictogram
          className={clsx(
            "h-full w-full text-snow-primary group-open/button:text-vivid-primary group-hover/button:text-vivid-primary"
          )}
        />
      </summary>
      <div className="absolute left-full top-0 z-1 flex w-72 flex-col border border-obsidian-primary bg-obsidian-darker p-4">
        <div className={clsx("text-sm text-snow-darker")}>タグを編集</div>
        <TaggingSearcher className={clsx("mt-2 w-full")} fragment={getVideo} />
      </div>
    </details>
  );
};
export default TaggingEditor;
