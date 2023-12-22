import clsx from "clsx";

import Paginator from "~/components/Paginator";
import { FragmentType, graphql, useFragment } from "~/gql";

import MylistRegistrationsItem from "./MylistRegistrationsItem";

export const MylistRegistrationsFragment = graphql(`
  fragment UserPage_MylistRegistrations on MylistRegistrationsByOffsetPayload {
    nodes {
      id
      ...UserMylistPage_Registration
    }
  }
`);
export default function MylistRegistrations({
  title,
  pathname,
  noc,
  currentPage: page,
  pageMax,
  ...props
}: {
  /**
   * タイトル
   */
  title: string;
  /**
   * 何も登録がなかった場合の文章
   */
  noc: string;

  pathname: string;
  pageMax: number;
  currentPage: number;
  fragment: FragmentType<typeof MylistRegistrationsFragment>;
}): JSX.Element {
  const fragment = useFragment(MylistRegistrationsFragment, props.fragment);
  const { nodes } = fragment;

  return (
    <div className={clsx("@container/mylist")}>
      <div className={clsx("flex w-full items-center px-4 py-2")}>
        <div className="shrink-0 grow">
          <h1 className="text-xl font-bold text-snow-primary">{title}</h1>
        </div>
        <Paginator
          size="sm"
          className={clsx()}
          pageMax={pageMax}
          currentPage={page}
          pathname={pathname}
        />
      </div>
      {nodes.length === 0 && (
        <div>
          <p className={clsx("text-center text-sm text-snow-darker")}>{noc}</p>
        </div>
      )}
      {nodes.length >= 1 && (
        <>
          <div
            className={clsx(
              "grid w-full grid-cols-1 flex-col gap-2 @[512px]/mylist:grid-cols-2 @[768px]/mylist:grid-cols-3 @[1024px]/mylist:grid-cols-4"
            )}
          >
            {nodes.map((node) => (
              <MylistRegistrationsItem key={node.id} fragment={node} />
            ))}
          </div>
          <div
            className={clsx("flex w-full items-center justify-end px-4 py-2")}
          >
            <Paginator
              size="sm"
              className={clsx()}
              pageMax={pageMax}
              currentPage={page}
              pathname={pathname}
            />
          </div>
        </>
      )}
    </div>
  );
}
