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
import TodoEditDialog from "./todo-edit-dialog";
import { deleteTodo } from "@/actions/todolist-action";
import { toast } from "sonner";
import { AlertDeleteDialog } from "./alert-delete-todo";

type TodoActionsProps = {
  todo: Todo;
};

export default function TodoActions({ todo }: TodoActionsProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDialogDeleteShow, setIsDialogDeleteShow] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<string | null>("");

  const handleEditDialog = () => {
    setIsEdit(true);
  };

  const handleCloseDialog = () => {
    setIsEdit(false);
    setIsDialogDeleteShow(false);
    setSelectedTodo(null);
  };

  const handleDeleteDialog = (todoId: string) => {
    setSelectedTodo(todoId);
    setIsDialogDeleteShow(true);
  };

  const handleDelete = async () => {
    if (!selectedTodo) return;

    const todoId = selectedTodo;
    const response = await deleteTodo({ todoId });

    if (response.success) {
      toast.success("Success", {
        description: response.message,
      });

      handleCloseDialog();
    } else {
      toast.error("Error", {
        description: response.message,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical size={18} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleEditDialog}>
          <Edit />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleDeleteDialog(todo.id)}
        >
          <Trash />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>

      <TodoEditDialog
        todo={todo}
        isOpen={isEdit}
        onOpenChange={handleCloseDialog}
      />

      <AlertDeleteDialog
        isOpen={isDialogDeleteShow}
        onOpenChange={handleCloseDialog}
        onDelete={handleDelete}
      />
    </DropdownMenu>
  );
}
