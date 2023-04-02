import { SuperTokensConfig } from "supertokens-auth-react/lib/build/types";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import Session from "supertokens-auth-react/recipe/session";

import { appInfo } from "./appInfo";

export default function frontendConfig(): SuperTokensConfig {
  return {
    appInfo,
    recipeList: [
      EmailPassword.init({
        useShadowDom: false,
      }),
      EmailVerification.init({ mode: "REQUIRED", useShadowDom: false }),
      Session.init(),
    ],
  };
}
