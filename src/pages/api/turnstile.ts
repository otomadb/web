import type { NextApiRequest, NextApiResponse } from "next";

import { TurnstileVerifyResponse } from "~/turnstile";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TurnstileVerifyResponse>
) {
  const form = new URLSearchParams();
  form.append("secret", process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY);
  form.append("response", req.body["token"]);
  form.append("remoteip", req.headers["x-forwarded-for"] as string);

  const result = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: form }
  );
  const data = (await result.json()) as TurnstileVerifyResponse;

  if (!data.success) return res.status(400).json(data);
  return res.status(200).json(data);
}
