import prisma from "../../../prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ message: "Please signin to create a post." })
  }
  if (req.method === "POST") {
    const postId = req.body.data
    console.log(postId)

    const prismaUser = await prisma.User.findUnique({
        where:{
            email: session?.user?.email
        }})

      console.log(prismaUser)

    try {
        const {title , postId} = req.body.data
         if (!title || !postId) {
            return res.status(400).json({ message: "Please fill all the fields." })
        }
        const result = await prisma.comment.create({
            data:{
                content:title,
                userId: prismaUser.id,
                postId
            }
        })
        

      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({ err: "Error has occured while deleting a post" })
    }
  }
}