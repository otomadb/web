import clsx from "clsx";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={clsx(
        ["my-12"],
        ["container", "max-w-screen-lg", "mx-auto"],
        ["px-8"]
      )}
    >
      {children}
    </main>
  );
}
