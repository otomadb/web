import z from "zod";

export const schemaPageParams = z.object({ name: z.string() });
export type PageParams = z.infer<typeof schemaPageParams>;
