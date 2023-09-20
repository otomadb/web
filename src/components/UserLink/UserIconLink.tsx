import clsx from "clsx";

import { LinkUser as UserPageLink } from "~/app/users/[name]/Link";
import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
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
  fragment: FragmentType<typeof Fragment>;
  /**
   * @default "small"
   */
  size?: "small";
}) {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div className={clsx(className)} style={style}>
      <UserPageLink fragment={fragment}>
        <UserIcon size={{ small: 24 }[size]} fragment={fragment} />
      </UserPageLink>
    </div>
  );
}
