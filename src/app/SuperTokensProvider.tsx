"use client";

import { ReactNode } from "react";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";

import frontendConfig from "~/supertokens/frontend";

if (typeof window !== "undefined") SuperTokensReact.init(frontendConfig());

function SuperTokensProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  /*
  useEffect(() => {
    async function doRefresh() {
      if (pageProps.fromSupertokens === "needs-refresh") {
        if (await Session.attemptRefreshingSession()) {
          location.reload();
        } else {
          // user has been logged out
          SuperTokensReact.redirectToAuth();
        }
      }
    }
    doRefresh();
  }, [pageProps.fromSupertokens]);
  if (pageProps.fromSupertokens === "needs-refresh") {
    return null;
  }
  */

  return <SuperTokensWrapper>{children}</SuperTokensWrapper>;
}

export default SuperTokensProvider;
