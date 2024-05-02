import { currentUser } from "./current-user";
import { db } from "./db";

export const sidebarConversations = async () => {
  const profile = await currentUser();
  const conversations = await db.conversation.findMany({
    where: {
      users: {
        some: {
          id: profile.id,
        },
      },
    },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
      messages: {
        select: {
          id: true,
          text: true,
          sender: true,
        },
      },
    },
  });

  const filteredConversations = conversations.map((conversation) => ({
    ...conversation,
    users: conversation.users.filter((user) => user.id !== profile.id),
  }));

  return filteredConversations;
};
