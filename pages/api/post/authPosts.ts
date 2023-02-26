import prisma from "../../../prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Please signin to create a post." });
  }
  if (req.method == "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email,
        },
        include: {
          Post: {
            include: {
              comment: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      
      res.status(200).json(user);
    } catch (error) {
      console.log(error);

      res.status(500).json({ error: "error while getting posts" });
    }
  }
}
