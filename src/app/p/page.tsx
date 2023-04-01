import "server-only";

import { ProtectedPage } from "./Protected";

export default async function Page() {
  return <ProtectedPage />;
}
