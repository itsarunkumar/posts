import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import MyPosts from "./MyPosts";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return (
    <div>
      <h1 className="text-2xl text-center ">
        welcome back
        <span className="text-blue-700 px-4">{session?.user?.name}</span>
        <MyPosts />
      </h1>
    </div>
  );
}
