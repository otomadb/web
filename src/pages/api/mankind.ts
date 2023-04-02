import supertokens from "supertokens-node";
import { superTokensNextWrapper } from "supertokens-node/nextjs";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

import backendConfig from "~/supertokens/backend";

supertokens.init(backendConfig());

const handler = async (
  req: any, // TODO: type
  res: any // TODO: type
) => {
  await superTokensNextWrapper(
    async (next) => {
      return await verifySession()(req, res, next);
    },
    req,
    res
  );

  return res.json({
    note: "Fetch any data from your application for authenticated user after using verifySession middleware",
    userId: req.session.getUserId(),
    sessionHandle: req.session.getHandle(),
    accessTokenPayload: req.session.getAccessTokenPayload(),
  });
};
export default handler;
