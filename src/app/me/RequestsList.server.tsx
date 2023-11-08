import clsx from "clsx";
import { ComponentProps, Suspense } from "react";

import YoutubeRequestLink from "~/app/requests/youtube/[sourceId]/Link";
import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

import ListItem from "./RequestsListItem";

export const Inner = async ({
  getNodes,
}: {
  getNodes(): Promise<
    {
      id: string;
      sourceId: string;
      fragment: ComponentProps<typeof ListItem>["fragment"];
    }[]
  >;
}) => {
  const nodes = await getNodes();

  return (
    <div
      className={clsx([
        "flex gap-x-2 border border-slate-800 bg-slate-950 py-4 @container",

        "snap-x snap-mandatory scroll-pl-4 overflow-x-scroll scroll-smooth",
      ])}
    >
      {nodes.map(({ id, sourceId, fragment }) => (
        <div
          key={id}
          className={clsx(
            ["shrink-0 snap-start first:ml-4 last:mr-4"],
            [
              "w-full @[512px]:w-1/2 @[640px]:w-1/3 @[768px]:w-1/4 @[1024px]:w-1/6",
            ]
          )}
        >
          <ListItem
            key={id}
            fragment={fragment}
            className={clsx("h-full")}
            PageLink={({ children, ...props }) => (
              <YoutubeRequestLink sourceId={sourceId} {...props}>
                {children}
              </YoutubeRequestLink>
            )}
          />
        </div>
      ))}
    </div>
  );
};

export async function YoutubeRequestsList({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={clsx(className)} style={style}>
      <Suspense fallback={<span>リクエストを取得中です</span>}>
        <Inner
          getNodes={async () => {
            const result = await fetchGql(
              graphql(`
                query MyTopPage_YoutubeRequestsList {
                  findUncheckedYoutubeRegistrationRequests(
                    input: { first: 18 }
                  ) {
                    nodes {
                      id
                      sourceId
                      ...MyTopPage_RequestsListItem
                    }
                  }
                }
              `),
              {}
            );

            if (isErr(result))
              throw new Error("Failed to fetch recent requests");

            const { findUncheckedYoutubeRegistrationRequests } = result.data;
            return findUncheckedYoutubeRegistrationRequests.nodes.map(
              (fragment) => ({
                fragment,
                id: fragment.id,
                sourceId: fragment.sourceId,
              })
            );
          }}
        />
      </Suspense>
    </div>
  );
}

export async function NicovideoRequestsList({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={clsx(className)} style={style}>
      <Suspense fallback={<span>リクエストを取得中です</span>}>
        <Inner
          getNodes={async () => {
            const result = await fetchGql(
              graphql(`
                query MyTopPage_NicovideoRequestsList {
                  findNicovideoRegistrationRequests(first: 18, checked: false) {
                    nodes {
                      id
                      sourceId
                      ...MyTopPage_RequestsListItem
                    }
                  }
                }
              `),
              {}
            );

            if (isErr(result))
              throw new Error("Failed to fetch recent requests");

            const { findNicovideoRegistrationRequests } = result.data;
            return findNicovideoRegistrationRequests.nodes.map((fragment) => ({
              fragment,
              id: fragment.id,
              sourceId: fragment.sourceId,
            }));
          }}
        />
      </Suspense>
    </div>
  );
}
