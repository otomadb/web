"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

import CallToast from "~/components/Toaster/CallToast";

export const NotifyEmailVerifycation: React.FC = () => {
  const { user } = useUser();

  if (user?.email_verified !== false) return;

  return (
    <CallToast duration={10000} type="warn">
      メールアドレスの確認が完了していません。
    </CallToast>
  );
};
