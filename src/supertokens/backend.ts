import { TypeInput } from "supertokens-node/lib/build/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import EmailVerification from "supertokens-node/recipe/emailverification";
import Session from "supertokens-node/recipe/session";

import { appInfo } from "./appInfo";

export default function backendConfig(): TypeInput {
  return {
    framework: "express",
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_CORE_CONNECTION_URI,
      apiKey: process.env.SUPERTOKENS_CORE_API_KEY,
    },
    appInfo,
    recipeList: [
      EmailPassword.init(),
      EmailVerification.init({ mode: "REQUIRED" }),
      Session.init(),
      Dashboard.init(),
    ],
    isInServerlessEnv: true,
  };
}
