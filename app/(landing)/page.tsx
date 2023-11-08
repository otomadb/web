import AboutPage from "./about/page";

export default function Page({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  return (
    <>
      <AboutPage />
    </>
  );
}
