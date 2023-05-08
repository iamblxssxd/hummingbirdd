// TODO add validators
import { z } from 'zod'

export const TextValidator = z.object({
  text: z.string().min(10).max(1000),
})

export type CreateTextPayload = z.infer<typeof TextValidator>
