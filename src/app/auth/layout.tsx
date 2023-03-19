import clsx from "clsx";

import { TurnstileGuard } from "~/components/TurnstileGuard";

import { AuthPagesGuard } from "./Guard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthPagesGuard>
      <div className={clsx(["flex", ["justify-center"], ["items-center"]])}>
        <TurnstileGuard>{children}</TurnstileGuard>
      </div>
    </AuthPagesGuard>
  );
}
