import { CommonHead } from "~/app/CommonHead";

export default async function Head() {
  return (
    <>
      <CommonHead />
      <title>{`ログイン - Otomad Database`}</title>
    </>
  );
}
