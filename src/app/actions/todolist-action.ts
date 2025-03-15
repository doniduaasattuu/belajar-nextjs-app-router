"use server";

import prisma from "@/lib/prisma";
import { Todo } from "../types/todo";
import { revalidatePath } from "next/cache";

type getAllTodosProps = {
  userId: string;
};

export async function getAllTodos({
  userId,
}: getAllTodosProps): Promise<Todo[] | null> {
  const todos = await prisma.todolist.findMany({
    where: { userId: userId },
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

type UpdateStatusResponse = {
  success: boolean;
  message: string;
};

export async function updateStatus({ todoId, status }: UpdateStatusProps) {
  const isExists = await prisma.todolist.findUnique({
    where: {
      id: todoId,
    },
  });

  if (isExists) {
    return {
      success: false,
      message: "Todo not found",
    } as UpdateStatusResponse;
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
  } as UpdateStatusResponse;
}
