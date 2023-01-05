import { YouMustLogin } from "~/components/common/YouMustLogin";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <YouMustLogin>
      <></>
    </YouMustLogin>
  );
}
