import prisma from "../../../prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ message: "Please signin to create a post." })
  }
  if (req.method === "POST") {
    const postId = req.body.data
    console.log(postId)

    const prismaUser = await prisma.user.findUnique({
        where:{
            email: session?.user?.email
        }})

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