import clsx from "clsx";

import { UserIcon } from "~/components/UserIcon";
import { graphql } from "~/gql";
import { gqlRequest } from "~/utils/gqlRequest";

export const revalidate = 60;

export default async function Page({ params }: { params: { name: string } }) {
  const { user } = await gqlRequest(
    graphql(`
      query UserPage($name: String!) {
        user(name: $name) {
          id
          name
          displayName
          icon
        }
      }
    `),
    { name: params.name }
  );
  const { icon, name, displayName } = user;

  return (
    <>
      <div>
        <UserIcon className={clsx([])} src={icon} name={name} />
        <p>@{name}</p>
        <p>{displayName}</p>
      </div>
    </>
  );
}
