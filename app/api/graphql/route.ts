import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  const { operationName, query, variables } = await req.json();
  const { accessToken } = await getAccessToken(req, new NextResponse(), {});

  const response = await fetch(process.env.GRAPHQL_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify({ operationName, query, variables }),
  });

  const data = await response.json();
  console.dir(data);
  return Response.json(data);
};
