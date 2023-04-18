import clsx from "clsx";

import { FragmentType, graphql, useFragment } from "~/gql";

import RequestsGridItem from "./RequestsGridItem";

export const Fragment = graphql(`
  fragment AllNicovideoRequestsPage_RequestsGrid on NicovideoRegistrationRequestConnection {
    nodes {
      id
      ...AllNicovideoRequestsPage_RequestsGridItem
    }
  }
`);
export default function RequestsGrid({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}) {
  const { nodes } = useFragment(Fragment, props.fragment);

  return (
    <div className={clsx(className, ["@container"])}>
      <div
        className={clsx([
          "grid",
          ["grid-cols-1", "@[1024px]:grid-cols-2", "@[1536px]:grid-cols-3"],
          ["gap-x-1", "gap-y-1"],
        ])}
      >
        {nodes.map((node) => (
          <RequestsGridItem key={node.id} fragment={node} />
        ))}
      </div>
    </div>
  );
}
