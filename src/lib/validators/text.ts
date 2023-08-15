// TODO add validators
import { z } from "zod"

export const TextValidator = z.object({
  title: z.string(),
  text: z.string(),
})

export type CreateTextPayload = z.infer<typeof TextValidator>
