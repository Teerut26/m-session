import { z } from "zod";

export const SearchResponseZod = z.object({
  youtubeId: z.string().optional(),
  title: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  artists: z
    .array(
      z.object({
        name: z.string(),
        id: z.string().optional(),
      })
    )
    .optional(),
  album: z.string().optional(),
  isExplicit: z.boolean().optional(),
  duration: z
    .object({
      label: z.string(),
      totalSeconds: z.number(),
    })
    .optional(),
});
