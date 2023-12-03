import clsx from "clsx";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={clsx(
        "mx-auto w-full max-w-screen-lg rounded-lg border border-obsidian-primary bg-obsidian-darker px-8 py-12"
      )}
    >
      {children}
    </main>
  );
}
