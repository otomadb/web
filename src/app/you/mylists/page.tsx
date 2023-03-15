export const dynamic = "force-dynamic";

import type { Metadata } from "next";

import { Inner } from "./Inner";
export const metadata: Metadata = {
  title: "あなたのマイリスト",
};

export default async function Page() {
  return <Inner />;
}
