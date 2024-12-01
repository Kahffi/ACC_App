import { z } from "zod";

const USERNAME_STRING = z
  .string()
  .min(5, {
    message: "Username must contain at least 5 characters",
  })
  .max(50, {
    message: "Password must contain at least 5 characters",
  });
const PASSWORD_STRING = z.string().min(5).max(50);

export const loginSchema = z.object({
  username: USERNAME_STRING,
  password: PASSWORD_STRING,
});

export const signUpSchema = z.object({
  username: USERNAME_STRING,
});
