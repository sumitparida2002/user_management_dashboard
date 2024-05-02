import { NextApiRequest } from "next";

import { NextApiResponseServerIo } from "@/types";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/current-user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  console.log(req.query);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // const profile = await currentUser();
    const { text } = req.body;
    const { conversationId, senderId, recieverId } = req.query;

    // if (!profile) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }

    const sender = await db.user.findUnique({
      where: {
        id: senderId,
      },
    });
    const receiver = await db.user.findUnique({
      where: {
        id: recieverId,
      },
    });

    const conversation = await db.user.findUnique({
      where: {
        id: conversationId,
      },
    });
    const message = await db.message.create({
      data: {
        text,

        senderId: senderId as string,
        receiverId: recieverId as string,
        conversationId: conversationId as string,
      },
    });

    const channelKey = `chat:${conversationId}:messages`;

    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json(message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
