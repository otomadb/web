"use client";

import "client-only";

import React from "react";
import { Toaster as HotToastToaster } from "react-hot-toast";

export const Toaster: React.FC = () => {
  return <HotToastToaster position={"bottom-right"} />;
};
