import clsx from "clsx";

import NotificationsList from "./NotificationsList";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <main
      className={clsx(["py-4"], ["container", "max-w-screen-lg", "mx-auto"])}
    >
      <NotificationsList />
    </main>
  );
}
