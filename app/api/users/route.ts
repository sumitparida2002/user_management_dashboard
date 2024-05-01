import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

const Users = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const users = await db.user.findMany({
        include: {
          conversations: {
            include: {
              messages: {
                include: {
                  sender: true,
                  receiver: true,
                },
                orderBy: {
                  createdAt: "asc",
                },
              },
              users: true,
            },
          },
        },
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(405).send("Method not allowed");
  }
};

export default Users;
