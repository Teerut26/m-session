import { z } from "zod";
export interface SearchResponseInterface {
  items: Item[];
  nextpage: string;
  suggestion: any;
  corrected: boolean;
}

export interface Item {
  url: string;
  type: string;
  title: string;
  thumbnail: string;
  uploaderName: string;
  uploaderUrl: string;
  uploaderAvatar: string;
  uploadedDate?: string;
  shortDescription: string;
  duration: number;
  views: number;
  uploaded: number;
  uploaderVerified: boolean;
  isShort: boolean;
}

export const SearchResponseZod = z.object({
  items: z.array(
    z.union([
      z.object({
        url: z.string(),
        type: z.string(),
        title: z.string(),
        thumbnail: z.string(),
        uploaderName: z.string(),
        uploaderUrl: z.string(),
        uploaderAvatar: z.null(),
        uploadedDate: z.null(),
        shortDescription: z.null(),
        duration: z.number(),
        views: z.number(),
        uploaded: z.number(),
        uploaderVerified: z.boolean(),
        isShort: z.boolean(),
      }),
      z.object({
        url: z.string(),
        type: z.string(),
        title: z.string(),
        thumbnail: z.string(),
        uploaderName: z.string(),
        uploaderUrl: z.null(),
        uploaderAvatar: z.null(),
        uploadedDate: z.null(),
        shortDescription: z.null(),
        duration: z.number(),
        views: z.number(),
        uploaded: z.number(),
        uploaderVerified: z.boolean(),
        isShort: z.boolean(),
      }),
    ])
  ),
  nextpage: z.string(),
  suggestion: z.string(),
  corrected: z.boolean(),
});
