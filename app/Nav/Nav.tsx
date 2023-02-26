import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Login from "./Login";
import Logged from "./Logged";
import Link from "next/link";

export default async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center py-8 ">
      <Link href={"/"}>
        <h1 className="font-bold text-lg">Posts✌️</h1>
      </Link>
      <ul className="flex items-center gap-6">
        {!session?.user && <Login />}
        {session?.user && <Logged image={session.user.image || ""} />}
      </ul>
    </nav>
  );
}
