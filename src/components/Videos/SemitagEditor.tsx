"use client";
import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";
import { useMutation, useQuery } from "urql";

import { BlueButton, RedButton } from "~/components/common/Button";
import { Tag } from "~/components/common/Tag";
import { TagSearcher } from "~/components/common/TagSearcher";
import { graphql } from "~/gql";
import {
  VideoPage_ResolveSemitagDocument,
  VideoPage_SemitagEditor_SemitagDocument,
} from "~/gql/graphql";

graphql(`
  query VideoPage_SemitagEditor_Semitag($semitagId: ID!) {
    semitag(id: $semitagId) {
      id
      name
    }
  }

  mutation VideoPage_ResolveSemitag($input: ResolveSemitagInput!) {
    resovleSemitag(input: $input) {
      semitag {
        id
        video {
          ...VideoPage_TagsSection
          ...VideoPage_SemitagsSection
        }
      }
    }
  }
`);
export const SemitagEditor: React.FC<{
  className?: string;
  semitagId: string;
  handleSelected(): void;
}> = ({ className, semitagId, handleSelected }) => {
  const [{ data: semitagData }] = useQuery({
    query: VideoPage_SemitagEditor_SemitagDocument,
    variables: { semitagId },
  });
  const semitagName = useMemo(() => semitagData?.semitag.name, [semitagData]);

  const [, trigger] = useMutation(VideoPage_ResolveSemitagDocument);
  const [resolvedToTagId, setResolvedToTagId] = useState<string | undefined>(
    undefined
  );

  const handleResolve = useCallback(async () => {
    await trigger({ input: { id: semitagId, tagId: resolvedToTagId } });
    handleSelected();
  }, [handleSelected, resolvedToTagId, semitagId, trigger]);

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
        <TagSearcher handleSelect={(id) => setResolvedToTagId(id)} />
      </div>
      <div className={clsx(["mt-2"])}>
        <p className={clsx(["text-xs"], ["text-slate-600"])}>
          {resolvedToTagId && (
            <>
              <Tag
                className={clsx(["inline-block"])}
                tagId={resolvedToTagId}
                Wrapper={(props) => <span {...props} />}
              />
              として解決する
            </>
          )}
          {!resolvedToTagId && <>棄却する</>}
        </p>
      </div>
      <div className={clsx(["mt-4"], ["flex", "justify-end"])}>
        <div className={clsx(["flex"], ["gap-x-2"])}>
          <RedButton onClick={() => setResolvedToTagId(undefined)}>
            <div className={clsx(["px-2"], ["py-0.5"], ["text-sm"])}>
              やり直す
            </div>
          </RedButton>
          <BlueButton onClick={() => handleResolve()}>
            <div className={clsx(["px-2"], ["py-0.5"], ["text-sm"])}>確定</div>
          </BlueButton>
        </div>
      </div>
    </div>
  );
};
