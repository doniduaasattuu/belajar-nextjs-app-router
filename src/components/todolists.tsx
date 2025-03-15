import { Todo } from "@/types/todo";
import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import TodoItem from "./todo-item";
import EmptyImage from "./empty-image";

type TodolistsProps = {
  todolists: Todo[] | null;
};

export default function Todolists({ todolists }: TodolistsProps) {
  return (
    <Table>
      <TableBody>
        {todolists && todolists?.length >= 1 ? (
          todolists?.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <EmptyImage />
        )}
      </TableBody>
    </Table>
  );
}
