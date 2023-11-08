import clsx from "clsx";

import { FragmentType, graphql, useFragment } from "~/gql";

import RequestsListItem from "./RequestsListItem";

export const Fragment = graphql(`
  fragment NicovideoRequestsPage_RequestsList on NicovideoRegistrationRequestConnection {
    nodes {
      id
      ...NicovideoRequestsPage_RequestsListItem
    }
  }
`);
export default function RequestsList({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof Fragment>;
}) {
  const { nodes } = useFragment(Fragment, props.fragment);

  return (
    <div
      className={clsx(className, [
        "flex flex-col divide-y divide-slate-800 border border-slate-700",
      ])}
      style={style}
    >
      {nodes.map((node) => (
        <RequestsListItem key={node.id} fragment={node} />
      ))}
    </div>
  );
}
