import { NextApiHandler } from "next";
import supertokens from "supertokens-node";
import { middleware } from "supertokens-node/framework/express";
import { superTokensNextWrapper } from "supertokens-node/nextjs";
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import SessionNode from "supertokens-node/recipe/session";

import { appInfo } from "~/supertokens/appInfo";

supertokens.init({
  framework: "express",
  supertokens: {
    // this is the location of the SuperTokens core.
    connectionURI: "https://try.supertokens.com",
  },
  appInfo,
  recipeList: [EmailPasswordNode.init(), SessionNode.init(), Dashboard.init()],
  isInServerlessEnv: true,
});

const handler: NextApiHandler = async (req, res) => {
  await superTokensNextWrapper(
    async (next) => {
      res.setHeader(
        "Cache-Control",
        "no-cache, no-store, max-age=0, must-revalidate"
      );
      await middleware()(req as any, res as any, next);
    },
    req,
    res
  );
  if (!res.writableEnded) {
    res.status(404).send("Not found");
  }
};
export default handler;
