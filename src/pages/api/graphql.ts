import { NextApiHandler } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

const handler = (async (req, res) => {
  return httpProxyMiddleware(req, res, {
    target: process.env.GRAPHQL_API_ENDPOINT,
    proxyTimeout: 5000,
    pathRewrite: [{ patternStr: "^/api/graphql", replaceStr: "/graphql" }],
  });
}) satisfies NextApiHandler;
export default handler;
