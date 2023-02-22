import { AuthPagesGuard } from "./Guard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthPagesGuard>{children}</AuthPagesGuard>;
}
