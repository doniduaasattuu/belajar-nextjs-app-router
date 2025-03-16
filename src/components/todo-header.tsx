"use client";

import React from "react";
import SearchBar from "./search-bar";
import { Button } from "./ui/button";
import { Plus, Settings2 } from "lucide-react";
import TodoNewDialog from "./todo-new-dialog";

export default function TodoHeader() {
  const [isCreateTodo, setIsCreateTodo] = React.useState<boolean>(false);

  const handleCreateDialog = () => {
    setIsCreateTodo(true);
  };

  const handleCloseDialog = () => {
    setIsCreateTodo(false);
  };

  return (
    <div className="flex justify-between items-center space-x-2">
      <SearchBar />
      <div className="space-x-2 flex items-center">
        <Button className="cursor-pointer" variant="outline">
          <Settings2 />
        </Button>
        <Button
          onClick={handleCreateDialog}
          className="cursor-pointer"
          variant="outline"
        >
          <Plus />
          New
        </Button>
      </div>

      <TodoNewDialog isOpen={isCreateTodo} onOpenChange={handleCloseDialog} />
    </div>
  );
}
