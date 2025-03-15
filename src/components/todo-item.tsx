"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "./ui/checkbox";
import { formattedDate } from "@/lib/utils";
import { Todo } from "@/types/todo";
import { updateStatus } from "@/actions/todolist-action";
import { toast } from "sonner";
import TodoActions from "./todo-action";

type TodoItemProps = {
  todo: Todo;
};

const handleCheckboxChange = async (todoId: string, status: boolean) => {
  const response = await updateStatus({ todoId, status });

  if (!response.success) {
    toast.error("Error", {
      description: response.message,
    });
  }
};

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <TableRow key={todo.id} className="border-none min-w-[350px]">
      <TableCell className="w-10">
        <div className=" h-4 flex items-end">
          <Checkbox
            className="cursor-pointer"
            id={`${todo.id}`}
            checked={todo.status}
            onCheckedChange={() => handleCheckboxChange(todo.id, todo.status)}
          />
        </div>
      </TableCell>
      <TableCell>
        <label htmlFor={`${todo.id}`}>
          <p className="text-wrap cursor-pointer">{todo.todo}</p>
        </label>
      </TableCell>
      <TableCell className="text-right text-muted-foreground items-center">
        {formattedDate(todo.createdAt.toString())}
      </TableCell>
      <TableCell className="text-center items-center w-10">
        <TodoActions todo={todo} />
      </TableCell>
    </TableRow>
  );
}
