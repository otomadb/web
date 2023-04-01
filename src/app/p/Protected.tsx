"use client";

import React from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

export const ProtectedPage: React.FC = () => {
  const session = useSessionContext();

  return <p>?</p>;
};
