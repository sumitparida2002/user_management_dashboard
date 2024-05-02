import Link from "next/link";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { Avatar, AvatarImage } from "../ui/avatar";
import { Message } from "@/app/data";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function Sidebar() {
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

  console.log(filteredConversations[0].users);
  return (
    <div
      data-collapsed=""
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      <div className="flex justify-between p-2 items-center">
        <div className="flex gap-2 items-center text-2xl">
          <p className="font-medium">Chats</p>
        </div>

        <div>
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9"
            )}
          >
            <MoreHorizontal size={20} />
          </Link>

          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9"
            )}
          >
            <SquarePen size={20} />
          </Link>
        </div>
      </div>

      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {filteredConversations.map(
          (conversation, index) => (
            //   isCollapsed ? (
            //     <Link
            //       key={index}
            //       href={`/conversations/${conversation.id}`}
            //       className={cn(
            //         buttonVariants({ size: "icon" }),
            //         "h-11 w-11 md:h-16 md:w-16",
            //         conversation.variant === "grey" &&
            //           "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
            //       )}
            //     >
            //       <Avatar className="flex justify-center items-center">
            //         <AvatarImage
            //           src={conversation.users[0].imageUrl} // Assuming the first user's image represents the conversation
            //           alt={conversation.name}
            //           width={6}
            //           height={6}
            //           className="w-10 h-10"
            //         />
            //       </Avatar>{" "}
            //       <span className="sr-only">{conversation.name}</span>
            //     </Link>
            //   ) : (
            <Link key={index} href={`/message/${conversation.users[0].id}`}>
              <Avatar className="flex justify-center items-center">
                <AvatarImage
                  src={conversation.users[0].imageUrl} // Assuming the first user's image represents the conversation
                  alt={conversation.name}
                  width={6}
                  height={6}
                  className="w-10 h-10"
                />
              </Avatar>
              <div className="flex flex-col max-w-28">
                <span>{conversation.name}</span>
                {conversation.messages.length > 0 && (
                  <span className="text-zinc-300 text-xs truncate ">
                    {
                      conversation.messages[
                        conversation.messages.length - 1
                      ].sender.name.split(" ")[0]
                    }
                    :{" "}
                    {
                      conversation.messages[conversation.messages.length - 1]
                        .text
                    }
                  </span>
                )}
              </div>
            </Link>
          )
          //   )
        )}
      </nav>
    </div>
  );
}
