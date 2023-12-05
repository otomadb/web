import clsx from "clsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={clsx("container mx-auto max-w-screen-lg py-8")}>
      {children}
    </main>
  );
}
