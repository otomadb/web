import clsx from "clsx";

import { MylistLinkSwitch } from "~/components/MylistLinkSwitch";
import { FragmentType, graphql, useFragment } from "~/gql";

import { MylistListItem } from "./MylistsListItem";

export const Fragment = graphql(`
  fragment UserMylistsPage_MylistsList on MylistConnection {
    nodes {
      ...MylistLinkSwitch
      ...UserMylistsPage_MylistsListItem
      id
    }
  }
`);
export const MylistsList: React.FC<{
  className?: string;
  fetcher: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fetcher);

  return (
    <div className={clsx(className, ["flex flex-col items-stretch gap-y-2"])}>
      {fragment.nodes.length === 0 && (
        <p>取得可能なマイリストは存在しませんでした</p>
      )}
      {fragment.nodes.map((mylist) => (
        <MylistListItem
          key={mylist.id}
          fragment={mylist}
          Link={(props) => <MylistLinkSwitch fragment={mylist} {...props} />}
        />
      ))}
    </div>
  );
};
