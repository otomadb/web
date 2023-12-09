import clsx from "clsx";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={clsx("mx-auto w-full max-w-screen-lg px-8 py-12")}>
      <div
        className={clsx(
          "w-full rounded-lg border border-obsidian-primary bg-obsidian-darker p-8"
        )}
      >
        {children}
      </div>
    </main>
  );
}
