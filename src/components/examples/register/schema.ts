import * as v from "valibot";

export const registerSchema = v.pipe(
  v.object({
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
    confirmPassword: v.pipe(v.string(), v.nonEmpty("Please confirm your password.")),
    terms: v.pipe(v.boolean(), v.value(true, "Please accept the terms and conditions.")),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "The two passwords do not match.",
    ),
    ["confirmPassword"],
  ),
);
