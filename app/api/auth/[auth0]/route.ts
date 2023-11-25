import { handleAuth, handleLogin } from "@auth0/nextjs-auth0/edge";

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      scope: [
        "openid",
        "check:semitag",
        "create:mylist",
        "create:registration_request",
        "create:tag",
        "create:tagging",
        "create:video",
        "edit:mylist",
        "remove:tagging",
        "update:mylist_registration",
      ].join(" "),
    },
  }),
});
