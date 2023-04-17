import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  
  if (req.method == "GET") {
    try {
        // console.log(req.query);
        const {details} = req.query;
        const data = await prisma.Post.findUnique({
          where: {
            id: details,
          },
          include: {
            user: true,
            comment: {
              orderBy: {
                createdAt: "desc",
              },
              include: {
                user: true,
              },
            },
          },
        })
        // console.log(post);
        res.status(200).json(data);

      
    } catch (error) {
      console.log(error);

      res.status(500).json({ error: "error while getting posts" });
    }
  }
}
