import "../styles/globals.css";

import { AppProps } from "next/app";
import Router from "next/router";
import { useEffect } from "react";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword";
import {
  default as Session,
  default as SessionReact,
} from "supertokens-auth-react/recipe/session";

import { appInfo } from "~/supertokens/appInfo";

if (typeof window !== "undefined") {
  SuperTokensReact.init({
    appInfo,
    recipeList: [EmailPasswordReact.init(), SessionReact.init()],
    windowHandler: (oI) => {
      return {
        ...oI,
        location: {
          ...oI.location,
          setHref: (href) => {
            Router.push(href);
          },
        },
      };
    },
  });
}

function MyApp({ Component, pageProps }: AppProps) {
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

  return (
    <SuperTokensWrapper>
      <Component {...pageProps} />
    </SuperTokensWrapper>
  );
}

export default MyApp;
