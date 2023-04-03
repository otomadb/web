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
        signInAndUpFeature: {
          signUpForm: {
            formFields: [
              {
                id: "name",
                label: "Name",
                placeholder: "Name",
                /*
                validate: async (value) => {
                  try {
                    const a = await gqlRequest(
                      new URL(
                        "/graphql",
                        process.env.NEXT_PUBLIC_API_ENDPOINT
                      ).toString(), // TODO: 後で"/api/graphql"に直す
                      graphql(`
                        query Supertokens_Signup_ValidateAlias(
                          $alias: String!
                        ) {
                          findUser(input: { name: $alias }) {
                            id
                          }
                        }
                      `),
                      { alias: value }
                    );
                    console.dir(a.findUser);
                    return undefined;
                  } catch (e) {
                    console.error(e);
                  }
                },
                */
              },
              {
                id: "display_name",
                label: "Display Name",
                placeholder: "Display name",
              },
            ],
          },
        },
      }),
      EmailVerification.init({ mode: "REQUIRED", useShadowDom: false }),
      Session.init(),
    ],
  };
}
