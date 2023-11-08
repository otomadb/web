import clsx from "clsx";

import SettingsPageGuard from "./Guard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SettingsPageGuard>
      <main className={clsx("container mx-auto max-w-screen-lg py-8")}>
        {children}
      </main>
    </SettingsPageGuard>
  );
}
