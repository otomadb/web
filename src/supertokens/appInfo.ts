import { AppInfo } from "supertokens-node/lib/build/types";

const port = process.env.APP_PORT || 3000;
export const websiteDomain =
  process.env.APP_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  `http://localhost:${port}`;

export const appInfo: AppInfo = {
  appName: "OtoMADB",
  websiteDomain,
  apiDomain: websiteDomain,
  apiBasePath: "/api/auth/",
};
