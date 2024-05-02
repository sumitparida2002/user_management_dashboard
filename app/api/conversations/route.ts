import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import { NextApiResponseServerIo } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    const { name } = await req.json();

    console.log(name);

    const conversation = await db.conversation.findFirst({
      where: {
        AND: [
          {
            users: {
              some: {
                id: user.id,
              },
            },
          },
          {
            users: {
              some: {
                email: name,
              },
            },
          },
        ],
      },
    });

    if (!conversation) {
      const newConversation = await db.conversation.create({
        data: {
          name: `Conversation between ${user.name} and ${name}`,
        },
      });

      // Connect the current user to the new conversation
      await db.user.update({
        where: { id: user.id },
        data: {
          conversations: {
            connect: {
              id: newConversation.id,
            },
          },
        },
      });

      const otherUser = await db.user.findUnique({
        where: {
          email: name,
        },
      });

      if (otherUser) {
        await db.user.update({
          where: { id: otherUser.id },
          data: {
            conversations: {
              connect: {
                id: newConversation.id,
              },
            },
          },
        });
      }
      return NextResponse.json(newConversation);
    }

    return NextResponse.json(conversation);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
