import clsx from "clsx";

import SettingsPageGuard from "./Guard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SettingsPageGuard>
      <main
        className={clsx(["container", "max-w-screen-lg", "mx-auto"], ["py-8"])}
      >
        {children}
      </main>
    </SettingsPageGuard>
  );
}
