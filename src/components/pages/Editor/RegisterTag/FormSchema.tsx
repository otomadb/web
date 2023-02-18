import * as z from "zod";

export const formSchema = z.object({
  primaryName: z.string().min(1, "タグ名は1文字以上で"),
  extraNames: z.optional(
    z.array(z.object({ name: z.string().min(1, "タグ名は1文字以上で") }))
  ),
  explicitParentTagId: z.optional(z.string()),
  implicitParents: z.array(z.object({ tagId: z.string() })),
  resolveSemitags: z.array(z.object({ semitagId: z.string() })),
});

export type FormSchema = z.infer<typeof formSchema>;
