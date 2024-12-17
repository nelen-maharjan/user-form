import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().min(5, { message: "Name must be at least 5 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
});
