import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { ReactNode } from "react";

export default withPageAuthRequired(
  function Layout({ children }: { children: ReactNode }) {
    return <>{children}</>;
  },
  { returnTo: "/" }
);
