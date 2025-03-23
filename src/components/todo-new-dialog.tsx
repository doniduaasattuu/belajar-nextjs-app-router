import React, { SetStateAction, useEffect, useState } from "react";
import { FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";
import { useSession } from "next-auth/react";
import { createTodo } from "@/actions/todolist-action";
import { toast } from "sonner";
import { CheckedState } from "@radix-ui/react-checkbox";

type TodoDialogProps = {
  isOpen: boolean;
  onOpenChange: () => void;
};

type SessionUser = { id: string } & {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

export default function TodoNewDialog({
  isOpen,
  onOpenChange,
}: TodoDialogProps) {
  const session = useSession();
  const [user, setUser] = useState<SessionUser>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (session.data?.user) {
      setUser(session.data.user);
    }
  }, [session.data?.user]);

  const [todoText, setTodoText] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);

  const handleChangeTodo: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTodoText(e.target.value);
  };

  const handleStatusChange = (e: CheckedState) => {
    setStatus(e as SetStateAction<boolean>);
  };

  const onCreateTodo = () => {
    setIsSubmitting(true);
    const create = async (
      userId: string | undefined,
      text: string,
      status: boolean
    ) => {
      const response = await createTodo({ userId, text, status });

      if (response.success) {
        toast.success("Success", {
          description: response.message,
        });

        onOpenChange();
        setStatus(false);
      } else {
        toast.error("Error", {
          description: response.message,
        });
      }

      setIsSubmitting(false);
    };

    const data = {
      userId: user?.id,
      text: todoText,
      status: status,
    };

    create(data.userId, data.text, data.status);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] top-0 translate-y-[50%] sm:top-[50%] sm:translate-y-[-50%] bg-card text-primary">
        <DialogHeader>
          <DialogTitle>New todo</DialogTitle>
          <DialogDescription>
            Create the details of your task below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 my-5">
          <FormItem>
            <Input
              onChange={(e) => handleChangeTodo(e)}
              className="col-span-3"
              onKeyDown={(e) =>
                e.key === "Enter" ? onCreateTodo() : undefined
              }
            />
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                checked={status}
                onCheckedChange={(e) => handleStatusChange(e)}
                id="status"
              />
              <label
                htmlFor="status"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mark as completed
              </label>
            </div>
          </FormItem>
        </div>
        <DialogFooter>
          <Button
            disabled={isSubmitting}
            className="cursor-pointer"
            onClick={onCreateTodo}
          >
            {isSubmitting ? "Loading.." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
