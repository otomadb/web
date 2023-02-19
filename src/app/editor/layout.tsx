"use client";

import "client-only";

import { EditorPageGuard } from "./Guard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <EditorPageGuard>{children}</EditorPageGuard>;
}
