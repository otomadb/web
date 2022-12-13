import { YouMustLogin } from "~/components/YouMustLogin";

import { Profile } from "./Profile";

export default async function Page() {
  return (
    <YouMustLogin>
      <Profile />
    </YouMustLogin>
  );
}
