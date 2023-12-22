import clsx from "clsx";

import UserPageLink, {
  UserPageLinkFragment,
} from "~/app/[locale]/(application)/users/[name]/Link";
import { FragmentType, graphql, makeFragmentData, useFragment } from "~/gql";

export const UserDisplayNameLinkFragment = graphql(`
  fragment UserDisplayNameLink on User {
    ...Link_User
    displayName
  }
`);
export default function UserDisplayNameLink({
  size = "small",
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof UserDisplayNameLinkFragment>;
  /**
   * @default "small"
   */
  size?: "small";
}) {
  const fragment = useFragment(UserDisplayNameLinkFragment, props.fragment);

  return (
    <div className={clsx(className)} style={style}>
      <UserPageLink fragment={fragment}>{fragment.displayName}</UserPageLink>
    </div>
  );
}

export const mockUserDisplayNameLink = makeFragmentData(
  {
    displayName: "User1",
    ...makeFragmentData(
      {
        name: "user1",
      },
      UserPageLinkFragment
    ),
  },
  UserDisplayNameLinkFragment
);
