import clsx from "clsx";
import Link from "next/link";

import { FragmentType, graphql, useFragment } from "~/gql";

const calcPagination = (
  c: number,
  M: number
): {
  "1": boolean;
  "2": boolean;
  "C-s": boolean;
  "C-": number | null;
  "C": number | null;
  "C+": number | null;
  "C+s": boolean;
  "M-": boolean;
  "M": boolean;
} => {
  const Cm = 5 <= M ? Math.max(3, Math.min(c - 1, M - 4)) : null;
  const Cp = 7 <= M ? Math.max(5, Math.min(c + 1, M - 2)) : null;

  return {
    "1": 1 <= M,
    "2": 2 <= M,
    "C-s": Cm ? 3 < Cm : false,
    "C-": Cm,
    "C": 6 <= M ? Math.max(4, Math.min(c, M - 3)) : null,
    "C+": Cp,
    "C+s": Cp ? Cp < M - 2 : false,
    "M-": 4 <= M,
    "M": 3 <= M,
  };
};

export const AbstractPaginateLink = ({
  pathname,
  current,
  ths,
  size,
}: {
  pathname: string;
  current: number;
  ths: number;
  size: "sm" | "md";
}) => {
  return (
    <Link
      href={{ pathname, query: ths === 1 ? {} : { page: ths } }}
      aria-current={current === ths && "page"}
      className={clsx(
        "block rounded border border-obsidian-primary bg-obsidian-darker font-mono text-snow-primary hover:border-vivid-primary hover:bg-vivid-primary hover:text-obsidian-primary aria-current-page:border-vivid-primary aria-current-page:bg-vivid-primary aria-current-page:text-obsidian-primary",
        { sm: "text-base px-2 py-1", md: "text-xl px-4 py-2" }[size]
      )}
    >
      {ths}
    </Link>
  );
};

export function AbstractPagenation({
  className,
  currentPage,
  pageMax,
  PaginateLink,
  size,
}: {
  className?: string;
  currentPage: number;
  pageMax: number;
  PaginateLink(props: {
    current: number;
    ths: number;
    size: "sm" | "md";
  }): JSX.Element;
  size: "sm" | "md";
}) {
  if (pageMax === 1) return null;

  const pg = calcPagination(currentPage, pageMax);

  return (
    <div
      className={clsx(
        className,
        "flex items-center justify-center",
        { sm: "gap-x-2", md: "gap-x-4" }[size]
      )}
    >
      {pg["1"] && <PaginateLink size={size} current={currentPage} ths={1} />}
      {pg["2"] && <PaginateLink size={size} current={currentPage} ths={2} />}
      {pg["C-s"] && (
        <div>
          <span className={clsx("text-snow-darker")}>…</span>
        </div>
      )}
      {pg["C-"] && (
        <PaginateLink size={size} current={currentPage} ths={pg["C-"]} />
      )}
      {pg["C"] && (
        <PaginateLink size={size} current={currentPage} ths={pg["C"]} />
      )}
      {pg["C+"] && (
        <PaginateLink size={size} current={currentPage} ths={pg["C+"]} />
      )}
      {pg["C+s"] && (
        <div>
          <span className={clsx("text-snow-darker")}>…</span>
        </div>
      )}
      {pg["M-"] && (
        <PaginateLink size={size} current={currentPage} ths={pageMax - 1} />
      )}
      {pg["M"] && (
        <PaginateLink size={size} current={currentPage} ths={pageMax} />
      )}
    </div>
  );
}

const PaginateLink = ({
  serial,
  current,
  ths,
}: {
  serial: number;
  current: number;
  ths: number;
}) => {
  return (
    <Link
      href={{
        pathname: `/tags/${serial}`,
        query: ths === 1 ? {} : { page: ths },
      }}
      aria-current={current === ths && "page"}
      className={clsx(
        "block rounded border border-obsidian-primary bg-obsidian-darker px-4 py-2 font-mono text-xl text-snow-primary hover:border-vivid-primary hover:bg-vivid-primary hover:text-obsidian-primary aria-current-page:border-vivid-primary aria-current-page:bg-vivid-primary aria-current-page:text-obsidian-primary"
      )}
    >
      {ths}
    </Link>
  );
};

export const PagenationFragment = graphql(`
  fragment TagPage_Pagination on Tag {
    serial
  }
`);
export function Pagenation({
  className,
  currentPage,
  pageMax,
  ...props
}: {
  className?: string;
  currentPage: number;
  pageMax: number;
  fragment: FragmentType<typeof PagenationFragment>;
}) {
  const { serial } = useFragment(PagenationFragment, props.fragment);
  if (pageMax === 1) return null;

  const pg = calcPagination(currentPage, pageMax);

  return (
    <div
      className={clsx(
        className,
        "flex items-center justify-center gap-x-2 py-4 @container/pagination"
      )}
    >
      {pg["1"] && (
        <PaginateLink serial={serial} current={currentPage} ths={1} />
      )}
      {pg["2"] && (
        <PaginateLink serial={serial} current={currentPage} ths={2} />
      )}
      {pg["C-s"] && (
        <div>
          <span className={clsx("text-snow-darker")}>…</span>
        </div>
      )}
      {pg["C-"] && (
        <PaginateLink serial={serial} current={currentPage} ths={pg["C-"]} />
      )}
      {pg["C"] && (
        <PaginateLink serial={serial} current={currentPage} ths={pg["C"]} />
      )}
      {pg["C+"] && (
        <PaginateLink serial={serial} current={currentPage} ths={pg["C+"]} />
      )}
      {pg["C+s"] && (
        <div>
          <span className={clsx("text-snow-darker")}>…</span>
        </div>
      )}
      {pg["M-"] && (
        <PaginateLink serial={serial} current={currentPage} ths={pageMax - 1} />
      )}
      {pg["M"] && (
        <PaginateLink serial={serial} current={currentPage} ths={pageMax} />
      )}
    </div>
  );
}
