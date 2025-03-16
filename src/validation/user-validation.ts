import { z } from "zod";

export const BaseUserSchema = z.object({
  email: z.coerce
    .string()
    .email()
    .toLowerCase()
    .trim()
    .refine((value: string) => !/\s/.test(value), {
      message: "String cannot contain spaces",
    }),
  name: z.string({ message: "Name is required" }).min(3).max(100),
  password: z.string({ message: "Password is required" }).min(8),
  new_password: z.string({ message: "New Password is required" }).min(8),
});

export const RegisterUserSchema = BaseUserSchema.pick({
  email: true,
  name: true,
  password: true,
})
  .extend({
    confirm: z.string({ message: "Confirm password is required" }).min(8),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password don't match",
    path: ["confirm"],
  });

export const LoginUserSchema = BaseUserSchema.pick({
  email: true,
  password: true,
});

export class UserValidation {
  static readonly REGISTER: z.ZodType = RegisterUserSchema;
  static readonly LOGIN: z.ZodType = LoginUserSchema;
}
