import clsx from "clsx";

export function LoginLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href="/api/auth/login" className={clsx(className)}>
      {children}
    </a>
  );
}

export function LogoutLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href="/api/auth/logout" className={clsx(className)}>
      {children}
    </a>
  );
}
