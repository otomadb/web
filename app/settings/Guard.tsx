"use client";
import "client-only";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ReactNode } from "react";

const SettingsPageGuard = withAuthenticationRequired(
  ({ children }: { children: ReactNode }) => <>{children}</>,
  { loginOptions: {} }
);
export default SettingsPageGuard;
