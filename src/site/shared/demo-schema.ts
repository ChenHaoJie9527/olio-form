import * as v from "valibot";

export const demoSchema = v.object({
  email: v.pipe(v.string(), v.email("Please enter a valid email address.")),
  password: v.pipe(v.string(), v.minLength(8, "Password must be at least 8 characters.")),
  newsletter: v.boolean(),
});
