"use client";

import "client-only";

import clsx from "clsx";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useIntersection } from "react-use";

import { PageInfo } from "~/gql/graphql";

export const InfiniteVideosGrid: React.FC<{
  className?: string;
  initAfter?: string;
  Fetcher: React.FC<{ after?: string; pushAfter(after: string): void }>;
}> = ({ className, initAfter, Fetcher }) => {
  const [afters, setAfters] = useState<string[]>(initAfter ? [initAfter] : []);

  const pushAfter = useCallback(
    (next: string) =>
      setAfters((prev) => (prev.includes(next) ? prev : [...prev, next])),
    []
  );
  return (
    <div className={clsx(className, ["flex", "flex-col"])}>
      {!initAfter && <Fetcher pushAfter={pushAfter} />}
      {afters.map((after) => (
        <Fetcher key={after} after={after} pushAfter={pushAfter} />
      ))}
    </div>
  );
};

export function FetcherContainer<TNode>({
  useQuery,
  Presentation,
  pushAfter,
}: {
  useQuery: () => {
    nodes?: TNode;
    pageInfo?: Pick<PageInfo, "endCursor" | "hasNextPage">;
  };
  Presentation: React.FC<{ nodes: TNode }>;
  pushAfter(after: string): void;
}): JSX.Element {
  const { nodes, pageInfo } = useQuery();
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, { threshold: 1 });
  const readnext = useMemo(
    () =>
      pageInfo?.hasNextPage &&
      (!intersection || 1 <= intersection.intersectionRatio),
    [intersection, pageInfo?.hasNextPage]
  );
  useEffect(() => {
    if (readnext && pageInfo?.endCursor) {
      pushAfter(pageInfo?.endCursor);
    }
  }, [pageInfo?.endCursor, pushAfter, readnext]);

  return (
    <div>
      {nodes && (
        <>
          <Block>
            <Presentation nodes={nodes} />
          </Block>
          {!readnext && (
            <div ref={intersectionRef}>
              <span>LOADING</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const Block: React.FC<{
  className?: string;
  children: ReactNode;
}> = ({ className, children }) => {
  return (
    <div className={clsx(className, ["@container/block"])}>
      <div
        className={clsx([
          "grid",
          [
            "grid-cols-1",
            "@[512px]/block:grid-cols-2",
            "@[768px]/block:grid-cols-3",
            "@[1024px]/block:grid-cols-4",
            "@[1536px]/block:grid-cols-6",
          ],
          ["gap-x-2"],
          ["gap-y-2"],
        ])}
      >
        {children}
      </div>
    </div>
  );
};
