import clsx from "clsx";

import UserPageLink from "~/app/[locale]/(application)/users/[name]/Link";
import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

export const UserIconLinkFragment = graphql(`
  fragment UserIconLink on User {
    ...UserIcon
    ...Link_User
  }
`);
export default function UserIconLink({
  size = "small",
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof UserIconLinkFragment>;
  /**
   * @default "small"
   */
  size?: "small";
}) {
  const fragment = useFragment(UserIconLinkFragment, props.fragment);

  return (
    <div className={clsx(className)} style={style}>
      <UserPageLink fragment={fragment}>
        <UserIcon size={{ small: 24 }[size]} fragment={fragment} />
      </UserPageLink>
    </div>
  );
}
