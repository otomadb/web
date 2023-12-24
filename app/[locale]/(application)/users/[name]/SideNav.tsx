import clsx from "clsx";
import { ReactNode } from "react";

import MyLikesPageLink from "~/app/[locale]/(application)/me/likes/Link";
import MyMylistsPageLink from "~/app/[locale]/(application)/me/mylists/Link";
import UserLikesPageLink2 from "~/app/[locale]/(application)/users/[name]/likes/Link";
import UserMylistsPageLink from "~/app/[locale]/(application)/users/[name]/mylists/Link";
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
  isMyPage = false,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  isMyPage?: boolean;
  primaryFragment: FragmentType<typeof SideNavPrimaryFragment>;
}) {
  const primaryFragment = useFragment(
    SideNavPrimaryFragment,
    props.primaryFragment
  );
  const LikesPageLink: React.FC<{
    className?: string;
    children: ReactNode;
  }> = isMyPage
    ? (props) => <MyLikesPageLink {...props} />
    : (props) => <UserLikesPageLink2 {...props} fragment={primaryFragment} />;
  const MylistsPageLink: React.FC<{
    className?: string;
    children: ReactNode;
  }> = isMyPage
    ? (props) => <MyMylistsPageLink {...props} />
    : (props) => <UserMylistsPageLink {...props} fragment={primaryFragment} />;

  return (
    <nav
      style={style}
      className={clsx(className, "flex flex-col bg-obsidian-darker")}
    >
      <LikesPageLink
        className={clsx(
          "flex p-4 text-sm text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
        )}
      >
        いいねした動画
      </LikesPageLink>
      <div>
        <MylistsPageLink
          className={clsx(
            "flex p-4 text-sm text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
          )}
        >
          マイリスト一覧
        </MylistsPageLink>
      </div>
    </nav>
  );
}
