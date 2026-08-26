import * as v from "valibot";

export const loginSchema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email."),
    v.email("Please enter a valid email address."),
  ),
  password: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your password."),
    v.minLength(8, "Password must be at least 8 characters."),
  ),
  rememberMe: v.pipe(v.boolean(), v.value(true, "Please check Remember me.")),
});
