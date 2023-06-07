// TODO add validators
import { z } from 'zod'

export const TextValidator = z.object({
  text: z.string().min(10).max(1000),
  title: z.string(),
  wordDefinitions: z.object({
    word: z.string(),
    definition: z.string(),
    shortDefinition: z.string(),
    favorite: z.boolean(),
  }).array(),
  // title: z.string().optional(),
})

export type CreateTextPayload = z.infer<typeof TextValidator>
