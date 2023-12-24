import z from "zod";

import { schemaPageParams as S } from "../schema";

export const schemaPageParams = S;
export type PageParams = z.infer<typeof schemaPageParams>;
