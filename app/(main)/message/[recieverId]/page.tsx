import { redirect } from "next/navigation";

import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-message";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/current-user";

interface MessageIdPageProps {
  params: {
    recieverId: string;
  };
}

const ChannelIdPage = async ({ params }: MessageIdPageProps) => {
  // const profile = await currentUser();

  const reciever = await db.user.findUnique({
    where: {
      id: params.recieverId,
    },
  });

  const profile = await db.user.findUnique({
    where: {
      id: "user_2fbhGpSmE4uCVtZEDfEh94c1Aow",
    },
  });

  const conversation = await db.conversation.findUnique({
    where: {
      id: "clvo6jul50000ikka4fy6peff",
    },
    include: {
      users: true,
    },
  });

  //hardcode
  const conversationId = "clvo6jul50000ikka4fy6peff";

  if (!conversation) {
    redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader name={reciever.name} type="channel" />

      <>
        <ChatMessages
          sender={profile!}
          paramKey="conversationId"
          chatId={conversation.id}
          paramValue={conversation.id}
          reciever={reciever}
          apiUrl="/api/messages"
          socketUrl="/api/socket/messages"
          query={{
            receiverId: params.recieverId,
          }}
        />
        <ChatInput
          apiUrl="/api/socket/messages"
          user={profile!}
          query={{
            conversationId: conversationId,
            senderId: profile?.id,
            recieverId: reciever?.id,
          }}
        />
      </>
    </div>
  );
};

export default ChannelIdPage;
