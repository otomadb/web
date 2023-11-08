import clsx from "clsx";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={clsx(["container mx-auto my-12 max-w-screen-lg px-8"])}>
      {children}
    </main>
  );
}
