// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../../prisma/client";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method == "GET") {
//     try {
//       const post = await prisma.post.findMany({
//         include: {
//           User: true,
//           comment: {
//             include: {
//               User: true,
//             },
//             orderBy: {
//               createdAt: "desc",
//             },
//           },
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//       });
//       console.log(post);
//       return res.status(200).json(post);
//     } catch (error) {
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") {
        try {
            console.log("getPosts.ts request send")
            // const post = await prisma.post.findMany({
            //     include:{
            //     User:true,
            //     comment:{
            //         include:{
            //         User:true
            //         },
            //         orderBy:{
            //         createdAt:"desc"
            //         }
            //     }
            //     },
            //     orderBy:{
            //     createdAt:"desc"
            //     }
            // })

            const post = await prisma.Post.findMany({
                include: {
                    user: true,
                    comment: {
                        include: {
                            user: true,

                        },
                        orderBy: {
                            createdAt: "desc",
                        }
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            })
            console.log(post)
            return res.status(200).json(post)
        } catch (error) {
            return res.status(500).json({error: "Internal Server Error"})
        }
    }
}