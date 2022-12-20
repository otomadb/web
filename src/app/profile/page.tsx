import { Profile } from "~/components/Profile/Profile";
import { YouMustLogin } from "~/components/YouMustLogin";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <YouMustLogin>
      <Profile />
    </YouMustLogin>
  );
}
