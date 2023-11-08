import "server-only";

import clsx from "clsx";

import AboutPage from "~/app/(landing)/about/page";
import { CallToast } from "~/components/Toaster";

import LoginCheck from "./LoginCheck";

export default async function Page({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  return (
    <LoginCheck>
      <AboutPage />
      {searchParams.error === "access_denied" && (
        <CallToast duration={10000}>
          <p className={clsx()}>次のことを確認してください。</p>
          <ul className={clsx("flex list-decimal flex-col pl-4")}>
            <li className={clsx("text-sm")}>メール認証しましたか？</li>
          </ul>
        </CallToast>
      )}
    </LoginCheck>
  );
}
