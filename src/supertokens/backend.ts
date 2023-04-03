import { TypeInput } from "supertokens-node/lib/build/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import EmailVerification from "supertokens-node/recipe/emailverification";
import Session from "supertokens-node/recipe/session";
import UserRoles, { UserRoleClaim } from "supertokens-node/recipe/userroles";

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
      EmailPassword.init({
        signUpFeature: {
          formFields: [{ id: "name" }, { id: "display_name" }],
        },
        override: {
          apis: (originalImplementation) => {
            return {
              ...originalImplementation,
              async signUpPOST(input) {
                if (originalImplementation.signUpPOST === undefined)
                  throw Error("Should never come here");

                // First we call the original implementation
                const response = await originalImplementation.signUpPOST(input);

                console.dir(response);

                // If sign up was successful
                if (response.status === "OK") {
                  // We can get the form fields from the input like this
                  const formFields = input.formFields;
                  const user = response.user;

                  console.dir(formFields);
                  console.dir(user);
                  // some post sign up logic
                }

                return response;
              },
            };
          },
        },
      }),
      EmailVerification.init({ mode: "REQUIRED" }),
      Session.init({
        override: {
          functions: (originalImpl) => {
            return {
              ...originalImpl,
              createNewSession: async (input) => {
                input.accessTokenPayload = {
                  ...input.accessTokenPayload,
                  ...(await UserRoleClaim.build(
                    input.userId,
                    input.userContext
                  )),
                };
                return originalImpl.createNewSession(input);
              },
            };
          },
        },
        jwt: {
          enable: true,
        },
      }),
      UserRoles.init(),
      Dashboard.init(),
    ],
    isInServerlessEnv: true,
  };
}
