import "dotenv/config"; // ✅ make sure this is the first line
import { z } from "zod";

export const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    MONGODB_URI: z.string(),
    MONGODB_DATABASE_NAME: z.string(),
  })
  .parse(process.env);
