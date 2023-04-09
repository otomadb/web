"use client";
import "client-only";

import clsx from "clsx";

import { TagSearcher } from "~/components/TagSearcher";

const Optional: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  handleSelect(): void;
  query: string;
  registered: boolean;
}> = ({ className, style, query, handleSelect, registered }) => {
  return (
    <button
      type="button"
      aria-label="仮タグの追加"
      tabIndex={0}
      disabled={registered}
      style={style}
      className={clsx(
        className,
        ["w-full"],
        ["px-2", "py-2"],
        ["bg-white", "disabled:bg-slate-200", "hover:bg-blue-200"],
        ["text-sm", "text-left"]
      )}
      onClick={(e) => {
        handleSelect();
      }}
    >
      {!registered && (
        <>
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
        </>
      )}
      {registered && (
        <>
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
        </>
      )}
    </button>
  );
};

export default function OptionalSemitagTagSearcher({
  className,
  style,
  handleSelectTag,
  handleSelectSemitag,
  isExistsSemitag,
}: {
  className?: string;
  style?: React.CSSProperties;
  handleSelectTag(tagId: string): void;
  handleSelectSemitag(semitagName: string): void;
  isExistsSemitag(query: string): boolean;
}) {
  return (
    <TagSearcher
      className={className}
      style={style}
      handleSelect={(tagId) => {
        handleSelectTag(tagId);
      }}
      Optional={({ query }) => {
        return (
          <Optional
            query={query}
            registered={isExistsSemitag(query)}
            handleSelect={() => handleSelectSemitag(query)}
          />
        );
      }}
    />
  );
}
