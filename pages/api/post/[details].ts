import prisma from "../../../prisma/client";


export default async function handler(req, res) {
  
  if (req.method == "GET") {
    try {
        // console.log(req.query);
        const {details} = req.query;
        const data = await prisma.post.findUnique({
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
