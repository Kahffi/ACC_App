import { z } from "zod";

const EMAIL_STRING = z.string().email();

const USERNAME_STRING = z
  .string()
  .min(5, {
    message: "Username must contain at least 5 characters",
  })
  .max(50);
const PASSWORD_STRING = z
  .string()
  .min(5, {
    message: "Password must contain at least 5 characters",
  })
  .max(50);

export const loginSchema = z.object({
  email: EMAIL_STRING,
  password: PASSWORD_STRING,
});

export const signUpSchema = z.object({
  email: EMAIL_STRING,
  username: USERNAME_STRING,
  password: PASSWORD_STRING,
});
