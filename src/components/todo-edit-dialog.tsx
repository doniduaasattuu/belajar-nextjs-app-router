import React, { useEffect, useState } from "react";
import { FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Todo } from "@/types/todo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { toast } from "sonner";
import { updateTodoText } from "@/actions/todolist-action";

type TodoDialogProps = {
  todo: Todo | undefined;
  isOpen: boolean;
  onOpenChange: () => void;
};

export default function TodoEditDialog({
  todo,
  isOpen,
  onOpenChange,
}: TodoDialogProps) {
  const [todoText, setTodoText] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    if (todo) {
      setTodoText(todo.todo);
    }
  }, [todo]);

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTodoText(e.target.value);
  };

  const onUpdateTodo = () => {
    setIsUpdating(true);
    const update = async (todoId: string, text: string) => {
      const response = await updateTodoText({ todoId, text });

      if (response.success) {
        toast.success("Success", {
          description: response.message,
        });
        onOpenChange();
        setIsUpdating(false);
      } else {
        toast.error("Error", {
          description: response.message,
        });
      }

      setIsUpdating(false);
    };

    const data = {
      todoId: todo?.id as string,
      text: todoText,
    };

    update(data.todoId, data.text);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] top-0 translate-y-[50%] sm:top-[50%] sm:translate-y-[-50%] bg-card text-primary">
        <DialogHeader>
          <DialogTitle>Edit todo</DialogTitle>
          <DialogDescription>
            Update the details of your task below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 my-5">
          <FormItem>
            <Input
              defaultValue={todoText}
              className="col-span-3"
              onChange={(e) => handleTextChange(e)}
              onKeyDown={(e) =>
                e.key === "Enter" ? onUpdateTodo() : undefined
              }
            />
          </FormItem>
        </div>
        <DialogFooter>
          <Button
            disabled={isUpdating}
            className="cursor-pointer"
            onClick={onUpdateTodo}
          >
            {isUpdating ? "Loading.." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
