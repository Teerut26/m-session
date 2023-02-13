export type SearchSuggestionResponseInterface = string[]

import { z } from "zod"

export const SearchSuggestionResponseZod = z.array(z.string())
