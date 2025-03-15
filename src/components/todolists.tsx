import { Todo } from "@/app/types/todo";
import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import TodoItem from "./todo-item";

type TodolistsProps = {
  todolists: Todo[] | null;
};

export default function Todolists({ todolists }: TodolistsProps) {
  return (
    <Table>
      <TableBody>
        {todolists?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </TableBody>
    </Table>
  );
}
