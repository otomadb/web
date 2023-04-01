const apiBasePath = "/api/auth/";

const port = process.env.APP_PORT || 3000;
export const websiteDomain =
  process.env.APP_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  `http://localhost:${port}`;

export const appInfo = {
  appName: "SuperTokens Demo App",
  websiteDomain,
  apiDomain: websiteDomain,
  apiBasePath,
};
