import { Inner } from "~/pages/User/You/Mylist/Inner";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  return <Inner mylistId={params.id} />;
}
