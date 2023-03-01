import { Inner } from "~/components/pages/User/You/Likes/Inner";

export const dynamic = "force-dynamic";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "あなたがいいねした動画",
};

export default async function Page() {
  return <Inner />;
}
