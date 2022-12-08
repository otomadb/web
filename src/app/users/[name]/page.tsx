import clsx from "clsx";

import { UserIcon } from "~/components/UserIcon";

import { getData } from "./getData";

export const revalidate = 60;

export default async function Page({ params }: { params: { name: string } }) {
  const details = await getData(params.name);
  const { icon, name, displayName } = details;

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
