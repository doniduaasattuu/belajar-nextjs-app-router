import { getServerSession } from "next-auth";
import { getAllTodos } from "../actions/todolist-action";
import AuthLayout from "../layouts/auth-layout";
import { Todo } from "../types/todo";
import { redirect } from "next/navigation";
import Todolists from "@/components/todolists";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = session?.user;
  const userId: string = user.id;
  const todolists: Todo[] | null = await getAllTodos({ userId });

  return (
    <AuthLayout>
      <Todolists todolists={todolists} />
    </AuthLayout>
  );
}
