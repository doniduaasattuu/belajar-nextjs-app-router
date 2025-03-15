import React, { useState } from "react";
import { Edit, MoreVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Todo } from "@/types/todo";
import TodoDialog from "./todo-dialog";

type TodoActionsProps = {
  todo: Todo;
};

export default function TodoActions({ todo }: TodoActionsProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEditTaskDialog = () => {
    setIsEdit(true);
  };

  const handleCloseDialog = () => {
    setIsEdit(false);
  };

  const handleDelete = (todoId: string) => {
    console.log("Delete ", todoId);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical size={18} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleEditTaskDialog}
        >
          <Edit />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleDelete(todo.id)}
        >
          <Trash />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>

      <TodoDialog
        todo={todo}
        isOpen={isEdit}
        onOpenChange={handleCloseDialog}
      />
    </DropdownMenu>
  );
}
