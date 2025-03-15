import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
