import SettingsPageGuard from "./Guard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SettingsPageGuard>{children}</SettingsPageGuard>;
}
