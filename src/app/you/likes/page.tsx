export const dynamic = "force-dynamic";

import type { Metadata } from "next";

import { Inner } from "./Inner";
export const metadata: Metadata = {
  title: "あなたがいいねした動画",
};

export default async function Page() {
  return <Inner />;
}
