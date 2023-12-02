import clsx from "clsx";

import UserLikesPageLink2 from "~/app/(v2)/users/[name]/likes/Link";
import UserMylistsPageLink from "~/app/(v2)/users/[name]/mylists/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

export const SideNavPrimaryFragment = graphql(`
  fragment UserPage_SideNav on User {
    ...UserMylistsPageLink
    ...UserLikesPageLink2
  }
`);
export const SideNavMylistsFragment = graphql(`
  fragment UserPage_SideNavMylists on User {
    mylists(range: [PUBLIC]) {
      nodes {
        id
      }
    }
  }
`);
export default function SideNav({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  primaryFragment: FragmentType<typeof SideNavPrimaryFragment>;
}) {
  const primaryFragment = useFragment(
    SideNavPrimaryFragment,
    props.primaryFragment
  );

  return (
    <nav
      style={style}
      className={clsx(className, "flex flex-col bg-obsidian-darker")}
    >
      <UserLikesPageLink2
        fragment={primaryFragment}
        className={clsx(
          "flex p-4 text-sm text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
        )}
      >
        いいねした動画
      </UserLikesPageLink2>
      <div>
        <UserMylistsPageLink
          fragment={primaryFragment}
          className={clsx(
            "flex p-4 text-sm text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
          )}
        >
          マイリスト
        </UserMylistsPageLink>
      </div>
    </nav>
  );
}
