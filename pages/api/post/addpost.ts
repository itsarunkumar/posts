// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // console.log(session.user);

    const prismUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    console.log(prismUser);

    type Post = {
      title: string;
    };
    const { title }: Post = req.body;

    // if (title.length > 300) {
    //   return res.status(400).json({ error: "Title is too long" });
    // }
    // if (title.length < 1) {
    //   return res.status(400).json({ error: "Title is too short" });
    // }

    try {
      const post = await prisma.Post.create({
        data: {
          title: title,
          userId: prismUser.id,
        },
      });
      console.log(post);
      return res.status(200).json({ post });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
