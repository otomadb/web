import { RequestPagesGuard } from "./Guard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RequestPagesGuard>{children}</RequestPagesGuard>;
}
