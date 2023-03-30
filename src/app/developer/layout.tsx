"use client";

import "client-only";

import DeveloperPagesGuard from "./Guard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DeveloperPagesGuard>{children}</DeveloperPagesGuard>;
}
