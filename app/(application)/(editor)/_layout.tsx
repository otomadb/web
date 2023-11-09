import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { ReactNode } from "react";

/*
export default function Layout({ children }: { children: React.ReactNode }) {
  const a = await getSession();
  return <Guard>{children}</Guard>;
}

*/

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default withPageAuthRequired(Layout, {});
