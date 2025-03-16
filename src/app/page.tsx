import { getServerSession } from "next-auth";
import { getAllTodos } from "../actions/todolist-action";
import AuthLayout from "../layouts/auth-layout";
import { Todo } from "../types/todo";
import { redirect } from "next/navigation";
import Todolists from "@/components/todolists";
import { authOptions } from "./api/auth/[...nextauth]/route";
import EmptyImage from "@/components/empty-image";
import TodoHeader from "@/components/todo-header";

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
      <section className="space-y-6">
        <TodoHeader />

        {todolists && todolists?.length >= 1 ? (
          <Todolists todolists={todolists} />
        ) : (
          <EmptyImage className="mt-16" />
        )}
      </section>
    </AuthLayout>
  );
}
