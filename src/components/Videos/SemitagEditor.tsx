"use client";
import clsx from "clsx";
import React, { useMemo, useState } from "react";
import { useQuery } from "urql";

import { Tag } from "~/components/common/Tag";
import { TagSearcher } from "~/components/common/TagSearcher";
import { graphql } from "~/gql";
import { VideoPage_SemitagEditor_SemitagDocument } from "~/gql/graphql";

graphql(`
  query VideoPage_SemitagEditor_Semitag($semitagId: ID!) {
    semitag(id: $semitagId) {
      id
      name
    }
  }
`);
export const SemitagEditor: React.FC<{
  className?: string;
  semitagId: string;
}> = ({ className, semitagId }) => {
  const [{ data: semitagData }] = useQuery({
    query: VideoPage_SemitagEditor_SemitagDocument,
    variables: { semitagId },
  });
  const semitagName = useMemo(() => semitagData?.semitag.name, [semitagData]);

  const [resolvedTo, setResolvedTo] = useState<string | undefined>(undefined);

  return (
    <div
      className={clsx(
        className,
        ["bg-white"],
        ["border", "border-slate-300"],
        ["px-4", "py-2"],
        ["rounded"],
        ["flex", "flex-col", "items-stretch"]
      )}
    >
      <p className={clsx(["text-xs"], ["text-slate-900"])}>
        仮タグ
        {semitagData && (
          <span
            className={clsx(
              ["inline-block"],
              ["font-bold"],
              ["px-1", "py-0.5"],
              ["text-slate-800"]
            )}
          >
            {semitagName}
          </span>
        )}
        を編集する
      </p>
      <div className={clsx(["mt-2"])}>
        <TagSearcher handleSelect={(id) => setResolvedTo(id)} />
      </div>
      <div className={clsx(["mt-2"])}>
        <p className={clsx(["text-xs"])}>
          {resolvedTo && (
            <span>
              <Tag
                className={clsx(["inline-block"])}
                tagId={resolvedTo}
                Wrapper={(props) => <span {...props} />}
              />
              として解決する
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
