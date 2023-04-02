import supertokens from "supertokens-node";
import { middleware } from "supertokens-node/framework/express";
import { superTokensNextWrapper } from "supertokens-node/nextjs";

import backendConfig from "~/supertokens/backend";

export const config = { runtime: "nodejs" };

supertokens.init(backendConfig());

const handler = async (
  req: any, // TODO: type
  res: any // TODO: type
) => {
  await superTokensNextWrapper(
    async (next) => {
      res.setHeader(
        "Cache-Control",
        "no-cache, no-store, max-age=0, must-revalidate"
      );
      await middleware()(req, res, next);
    },
    req,
    res
  );
  if (!res.writableEnded) {
    res.status(404).send("Not found");
  }
};
export default handler;
