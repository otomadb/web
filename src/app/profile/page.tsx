import { YouMustLogin } from "~/components/common/YouMustLogin";
import { Profile } from "~/components/Profile/Profile";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <YouMustLogin>
      <Profile />
    </YouMustLogin>
  );
}
