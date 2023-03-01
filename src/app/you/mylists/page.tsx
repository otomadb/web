import { Inner } from "~/components/pages/User/You/Mylists/Inner";

export const dynamic = "force-dynamic";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "あなたのマイリスト",
};

export default async function Page() {
  return <Inner />;
}
