"use server";

import prisma from "@/lib/prisma";
import { Todo } from "../types/todo";
import { revalidatePath } from "next/cache";
import {
  CreateTodoSchema,
  UpdateStatusSchema,
  UpdateTextSchema,
} from "@/validation/todo-validation";

type getAllTodosProps = {
  userId: string;
  query?: string;
};

export async function getAllTodos({
  userId,
  query,
}: getAllTodosProps): Promise<Todo[] | null> {
  const todos = await prisma.todolist.findMany({
    where: {
      userId: userId,
      ...(query && {
        todo: {
          contains: query,
        },
      }),
    },

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      todo: true,
      status: true,
      createdAt: true,
    },
  });

  return todos;
}

type UpdateStatusProps = {
  todoId: string;
  status: boolean;
};

type TodoResponse = {
  success: boolean;
  message: string;
};

export async function updateStatus({ todoId, status }: UpdateStatusProps) {
  try {
    const validatedData = UpdateStatusSchema.safeParse({
      id: todoId,
      status: status,
    });

    if (!validatedData.success) {
      return {
        success: validatedData.success,
        message: validatedData.error?.flatten().fieldErrors?.status?.[0],
      } as TodoResponse;
    }

    const isExists = await prisma.todolist.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!isExists) {
      return {
        success: false,
        message: "Todo not found",
      } as TodoResponse;
    }

    const todo: Todo = await prisma.todolist.update({
      where: {
        id: todoId,
      },
      data: {
        status: !status,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: todo.status ? "Marked as completed" : "Marked as incompleted",
    } as TodoResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }

    return {
      success: false,
      message: "Error updating todo",
    } as TodoResponse;
  }
}

type UpdateTodoTextProps = {
  todoId: string;
  text: string;
};

export async function updateTodoText({ todoId, text }: UpdateTodoTextProps) {
  try {
    const validatedData = UpdateTextSchema.safeParse({
      id: todoId,
      todo: text,
    });

    if (!validatedData.success) {
      return {
        success: validatedData.success,
        message: validatedData.error?.flatten().fieldErrors?.todo?.[0],
      } as TodoResponse;
    }

    const isExists = await prisma.todolist.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!isExists) {
      return {
        success: false,
        message: "Todo not found",
      } as TodoResponse;
    }

    await prisma.todolist.update({
      where: {
        id: todoId,
      },
      data: {
        todo: text,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Todo updated successfully",
    } as TodoResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }

    return {
      success: false,
      message: "Error updating todo",
    } as TodoResponse;
  }
}

type CreateTodoProps = {
  userId: string | undefined;
  text: string;
  status: boolean;
};

export async function createTodo({ userId, text, status }: CreateTodoProps) {
  try {
    const validatedData = CreateTodoSchema.safeParse({
      userId: userId,
      todo: text,
      status: status,
    });

    if (!validatedData.success) {
      return {
        success: validatedData.success,
        message: validatedData.error?.flatten().fieldErrors?.todo?.[0],
      } as TodoResponse;
    }

    if (!userId) {
      return {
        success: false,
        message: "User id is required",
      } as TodoResponse;
    }

    const isExists = await prisma.todolist.findFirst({
      where: {
        userId: userId,
        todo: text,
      },
    });

    if (isExists) {
      return {
        success: false,
        message: "Todo cannot be duplicate",
      } as TodoResponse;
    }

    await prisma.todolist.create({
      data: {
        userId: userId,
        todo: text,
        status: status,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Successfully created",
    } as TodoResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }

    return {
      success: false,
      message: "Error updating todo",
    } as TodoResponse;
  }
}

export async function deleteTodo({ todoId }: { todoId: string }) {
  try {
    const isExists = await prisma.todolist.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!isExists) {
      return {
        success: false,
        message: "Todo not found",
      } as TodoResponse;
    }

    await prisma.todolist.delete({
      where: {
        id: todoId,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Deleted successfully",
    } as TodoResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }

    return {
      success: false,
      message: "Error updating todo",
    } as TodoResponse;
  }
}
