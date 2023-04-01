"use client";

import { ReactNode } from "react";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";

import { appInfo } from "~/supertokens/appInfo";

if (typeof window !== "undefined") {
  SuperTokensReact.init({
    appInfo,
    recipeList: [EmailPasswordReact.init(), SessionReact.init()],
  });
}

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
