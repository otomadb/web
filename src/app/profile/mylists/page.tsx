import { Mylists } from "~/components/pages/UserMylists";

export default async function Page() {
  return (
    <div>
      <h1>あなたのマイリスト一覧</h1>
      <Mylists />
    </div>
  );
}
