import { YouMustLogin } from "~/components/YouMustLogin";

import { Profile } from "./Profile";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <YouMustLogin>
      <Profile />
    </YouMustLogin>
  );
}
