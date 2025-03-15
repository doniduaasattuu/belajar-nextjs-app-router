import { getServerSession } from "next-auth";
import { getAllTodos } from "./actions/todolist-action";
import AuthLayout from "./layouts/auth-layout";
import { Todo } from "./types/todo";
import { redirect } from "next/navigation";
import Todolists from "@/components/todolists";

export default async function HomePage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const userId: string = session?.user.id;
  const todolists: Todo[] | null = await getAllTodos({ userId });

  return (
    <AuthLayout>
      <Todolists todolists={todolists} />
    </AuthLayout>
  );
}
