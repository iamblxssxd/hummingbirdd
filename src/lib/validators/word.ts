import { z } from "zod"

export const WordValidator = z.object({
  word: z.string(),
  definition: z.string(),
  shortDefinition: z.string(),
  favorite: z.boolean(),
  // wordId: z.string(),
})

export type CreateWordPayload = z.infer<typeof WordValidator>
