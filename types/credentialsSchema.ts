import { z } from "zod"

export const credentialsSchema = z.object({
  id: z.number(),
  platform: z.string(),
  username: z.string(),
  password: z.string(),
})