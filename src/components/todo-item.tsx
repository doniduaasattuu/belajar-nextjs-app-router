"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "./ui/checkbox";
import { Edit, MoreVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { formattedDate } from "@/lib/utils";
import { Todo } from "@/app/types/todo";
import { updateStatus } from "@/app/actions/todolist-action";
import { toast } from "sonner";

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
    <TableRow key={todo.id} className="border-none">
      <TableCell className="w-10">
        <div className=" h-4 flex items-end">
          <Checkbox
            id={`${todo.id}`}
            checked={todo.status}
            onCheckedChange={() => handleCheckboxChange(todo.id, todo.status)}
          />
        </div>
      </TableCell>
      <TableCell>
        <Label htmlFor={`${todo.id}`}>{todo.todo}</Label>
      </TableCell>
      <TableCell className="text-right text-muted-foreground items-center">
        {formattedDate(todo.createdAt.toString())}
      </TableCell>
      <TableCell className="text-right items-center w-8">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical size={18} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              // onClick={() => handleEditTaskDialog(todo)}
            >
              <Edit />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              //   onClick={() => handleDelete(todo.id)}
            >
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
