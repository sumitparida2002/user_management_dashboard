// "use client";

import { userData } from "@/app/data";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

// import { Chat } from "./chat";
import { Sidebar } from "./chat-sidebar";

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
}: ChatLayoutProps) {
  // const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  // const [selectedUser, setSelectedUser] = React.useState(userData[0]);
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const checkScreenWidth = () => {
  //     setIsMobile(window.innerWidth <= 768);
  //   };

  //   // Initial check
  //   checkScreenWidth();

  //   // Event listener for screen width changes
  //   window.addEventListener("resize", checkScreenWidth);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", checkScreenWidth);
  //   };
  // }, []);

  return (
    <>
      <Sidebar />

      {/* <Chat /> */}
    </>
  );
}

import { redirect } from "next/navigation";

import { currentUser } from "@/lib/current-user";
// import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-message";

import { db } from "@/lib/db";
import ChatTopbar from "./chat-topbar";

interface ChannelIdPageProps {
  params: {
    userId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentUser();

  // if (!profile) {
  //   return redirectToSignIn();
  // }

  const conversation = await db.user.findFirst({
    where: {
      mem: params.serverId,
      profileId: profile.id,
    },
  });

  // if (!channel || !member) {
  //   redirect("/");
  // }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <>
        <ChatMessages
          name={channel.name}
          chatId={conversation.id}
          type="channel"
          apiUrl="/api/messages"
          socketUrl="/api/socket/messages"
          socketQuery={{
            channelId: channel.id,
            serverId: channel.serverId,
          }}
          paramKey="channelId"
          paramValue={channel.id}
        />
        <ChatInput
          name={channel.name}
          type="channel"
          apiUrl="/api/socket/messages"
          query={{
            channelId: channel.id,
            serverId: channel.serverId,
          }}
        />
      </>
    </div>
  );
};

export default ChannelIdPage;
