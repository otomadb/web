import clsx from "clsx";

import NotificationsList from "./NotificationsList";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <main className={clsx("container mx-auto max-w-screen-lg py-4")}>
      <NotificationsList />
    </main>
  );
}
