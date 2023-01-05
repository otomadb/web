import { Inner } from "~/components/pages/YouMylist/Inner";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  return <Inner mylistId={params.id} />;
}
