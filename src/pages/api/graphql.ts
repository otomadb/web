import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";
import supertokens from "supertokens-node";
import { superTokensNextWrapper } from "supertokens-node/nextjs";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

import backendConfig from "~/supertokens/backend";

supertokens.init(backendConfig());

const handler = async (
  req: NextApiRequest & Parameters<ReturnType<typeof verifySession>>[0],
  res: NextApiResponse & Parameters<ReturnType<typeof verifySession>>[1]
) => {
  await superTokensNextWrapper(
    async (next) => {
      return await verifySession()(req, res, next);
    },
    req,
    res
  );

  const accessToken = req.session?.getAccessTokenPayload().jwt;

  return httpProxyMiddleware(req, res, {
    target: process.env.NEXT_PUBLIC_API_ENDPOINT, // TODO: NEXT_PUBLICではない
    proxyTimeout: 5000,
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    pathRewrite: [{ patternStr: "^/api/graphql", replaceStr: "/graphql" }],
  });
};
export default handler;
