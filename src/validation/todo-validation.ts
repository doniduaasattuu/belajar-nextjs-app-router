import { z } from "zod";

export const BaseTodoSchema = z.object({
  id: z.string().uuid(),
  todo: z.string().trim().min(5).max(50),
  status: z.boolean({ message: "Todo status is required" }),
});

export const UpdateStatusSchema = BaseTodoSchema.pick({
  id: true,
  status: true,
});

export const UpdateTextSchema = BaseTodoSchema.pick({
  id: true,
  todo: true,
});

export const CreateTodoSchema = BaseTodoSchema.pick({
  todo: true,
  status: true,
});

export class TodoValidation {
  static readonly UPDATE_STATUS: z.ZodType = UpdateStatusSchema;
  static readonly UPDATE_TEXT: z.ZodType = UpdateTextSchema;
  static readonly CREATE: z.ZodType = CreateTodoSchema;
}
