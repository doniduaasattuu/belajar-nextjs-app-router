import { getServerSession } from "next-auth";
import { getAllTodos } from "../actions/todolist-action";
import AuthLayout from "../layouts/auth-layout";
import { Todo } from "../types/todo";
import { redirect } from "next/navigation";
import Todolists from "@/components/todolists";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Plus, Settings2 } from "lucide-react";
import EmptyImage from "@/components/empty-image";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { query } = (await searchParams) || "";

  const user = session?.user;
  const userId: string = user.id;
  const todolists: Todo[] | null = await getAllTodos({ userId, query });

  return (
    <AuthLayout>
      <section className="space-y-8">
        <div className="flex justify-between items-center space-x-2">
          <SearchBar />
          <div className="space-x-2 flex items-center">
            <Button className="cursor-pointer" variant="outline">
              <Settings2 />
            </Button>
            <Button className="cursor-pointer" variant="outline">
              <Plus />
              New
            </Button>
          </div>
        </div>
        {/* <Todolists todolists={todolists} /> */}

        {todolists && todolists?.length >= 1 ? (
          <Todolists todolists={todolists} />
        ) : (
          <EmptyImage className="mt-16" />
        )}
      </section>
    </AuthLayout>
  );
}
