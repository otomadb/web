import clsx from "clsx";

import { TagSearcher } from "~/components/TagSearcher";

export default function OptionalSemitagTagSearcher({
  handleSelectTag,
  handleSelectSemitag,
  isExistsSemitag,
}: {
  handleSelectTag(tagId: string): void;
  handleSelectSemitag(semitagName: string): void;
  isExistsSemitag(query: string): boolean;
}) {
  return (
    <TagSearcher
      handleSelect={(tagId) => handleSelectTag(tagId)}
      Optional={({ query }) => {
        return (
          <div className={clsx(["py-1"])}>
            {isExistsSemitag(query) && (
              <div className={clsx(["text-sm"])}>
                <span
                  className={clsx(
                    ["bg-white"],
                    ["border", "border-gray-200"],
                    ["rounded"],
                    ["px-2", "py-0.5"]
                  )}
                >
                  {query}
                </span>
                <span>は既に仮タグとして追加されています</span>
              </div>
            )}
            {!isExistsSemitag(query) && (
              <button
                className={clsx(
                  ["text-sm"],
                  ["border"],
                  ["rounded"],
                  ["px-2", "py-1"],
                  ["bg-white", "hover:bg-blue-200"]
                )}
                onClick={(e) => {
                  e.currentTarget.blur();
                  handleSelectSemitag(query);
                }}
              >
                <span
                  className={clsx(
                    ["bg-white"],
                    ["border", "border-gray-200"],
                    ["rounded"],
                    ["px-2", "py-0.5"]
                  )}
                >
                  {query}
                </span>
                <span>を仮タグとして追加</span>
              </button>
            )}
          </div>
        );
      }}
    />
  );
}
