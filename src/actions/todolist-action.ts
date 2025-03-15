"use server";

import prisma from "@/lib/prisma";
import { Todo } from "../types/todo";
import { revalidatePath } from "next/cache";

type getAllTodosProps = {
  userId: string;
  query?: string;
};

export async function getAllTodos({
  userId,
  query,
}: getAllTodosProps): Promise<Todo[] | null> {
  console.log("Query in database: ", query);

  const todos = await prisma.todolist.findMany({
    where: {
      userId: userId,
      ...(query && {
        todo: {
          contains: query,
        },
      }),
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

type UpdateTodoResponse = {
  success: boolean;
  message: string;
};

export async function updateStatus({ todoId, status }: UpdateStatusProps) {
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
      } as UpdateTodoResponse;
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
    } as UpdateTodoResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }

    return {
      success: false,
      message: "Error updating todo",
    } as UpdateTodoResponse;
  }
}

type UpdateTodoTextProps = {
  todoId: string;
  text: string;
};

export async function updateTodoText({ todoId, text }: UpdateTodoTextProps) {
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
      } as UpdateTodoResponse;
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
    } as UpdateTodoResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }

    return {
      success: false,
      message: "Error updating todo",
    } as UpdateTodoResponse;
  }
}
