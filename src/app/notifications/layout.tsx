import { Guard } from "./Guard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Guard>{children}</Guard>;
}
