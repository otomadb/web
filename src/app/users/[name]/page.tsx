import clsx from "clsx";
import { notFound } from "next/navigation";

import { UserIcon } from "~/components/common/UserIcon";
import { graphql } from "~/gql";
import { gqlRequest } from "~/utils/gqlRequest";

export const revalidate = 60;

export default async function Page({ params }: { params: { name: string } }) {
  const { findUser } = await gqlRequest(
    graphql(`
      query UserPage($name: String!) {
        findUser(input: { name: $name }) {
          id
          name
          displayName
          icon
        }
      }
    `),
    { name: params.name }
  );

  if (!findUser) {
    notFound();
  }

  const { icon, name, displayName } = findUser;

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
