import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import axios from "axios";
import {
  SearchResponseInterface,
  SearchResponseZod,
} from "@/interfaces/SearchResponseInterface";
import { SearchSuggestionResponseInterface, SearchSuggestionResponseZod } from "@/interfaces/SearchSuggestionResponseInterface";
import { env } from "@/env/server.mjs";

export const musicRouter = createTRPCRouter({
  search: protectedProcedure
    .input(z.object({ keyword: z.string() }))
    .output(SearchSuggestionResponseZod)
    .mutation(async ({ input, ctx }) => {
      try {
        let { data } = await axios.get<SearchSuggestionResponseInterface>(
          `${env.YOUTUBE_ALTERNATIVE_BASE_URL}/suggestions?query=${input.keyword}`
        );
        return data as any;
      } catch (error: any) {
        console.log(error);
        
        throw new Error(error.message);
      }
    }),
});
