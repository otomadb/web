import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextApiHandler } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

const handler = (async (req, res) => {
  const accessToken = await getAccessToken(req, res)
    .then(({ accessToken }) => accessToken)
    .catch(() => null);
  return httpProxyMiddleware(req, res, {
    target: process.env.NEXT_PUBLIC_API_ENDPOINT, // TODO: NEXT_PUBLICではない
    proxyTimeout: 5000,
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    pathRewrite: [{ patternStr: "^/api/graphql", replaceStr: "/graphql" }],
  });
}) satisfies NextApiHandler;
export default handler;
