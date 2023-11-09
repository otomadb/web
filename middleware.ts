import { NextResponse } from "next/server";

import { withTopRedirect } from "./middlewares/withTopRedirect";

export default withTopRedirect(() => NextResponse.next());
