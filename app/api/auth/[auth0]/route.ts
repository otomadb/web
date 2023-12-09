import {
  AppRouterOnError,
  handleAuth,
  handleLogin,
  handleLogout,
} from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      scope: [
        "check:semitag",
        "create:mylist",
        "create:registration_request",
        "create:tag",
        "create:tagging",
        "create:video",
        "edit:mylist",
        "edit:tag",
        "email",
        "openid",
        "remove:tagging",
        "update:mylist_registration",
      ].join(" "),
    },
    returnTo: "/",
  }),
  logout: handleLogout({
    returnTo: "/",
  }),
  onError: ((req, error) => {
    console.error(error);
  }) satisfies AppRouterOnError,
});
