import Link from "next/link";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { Avatar, AvatarImage } from "../ui/avatar";
import { Message } from "@/app/data";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { useModal } from "@/hooks/use-modal-store";
import { sidebarConversations } from "@/lib/sidebar-conversations";
import SidebarItem from "./sidebar-item";

export async function Sidebar() {
  const filteredConversations = await sidebarConversations();
  return (
    <div
      data-collapsed=""
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      <div className="flex gap-4 p-2 items-center">
        <div className="flex gap-2 items-center text-2xl">
          <p className="font-medium">Chats</p>
        </div>

        <div>
          <SidebarItem />
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
              <div className="flex items-center gap-2 hover:bg-slate-400/10 py-2 px-4">
                <Avatar className="flex justify-center items-center">
                  <AvatarImage
                    src={conversation.users[0].imageUrl} // Assuming the first user's image represents the conversation
                    alt={conversation.name}
                    width={2}
                    height={2}
                    className="w-10 h-10"
                  />
                </Avatar>

                <div className="flex flex-col max-w-28">
                  <span>{conversation.users[0].name}</span>
                  {conversation.messages.length > 0 && (
                    <span className="text-zinc-300 text-xs truncate ">
                      <p className="text-lg text-gray-700 m-0">
                        {
                          conversation.messages[
                            conversation.messages.length - 1
                          ].sender.name.split(" ")[0]
                        }
                      </p>
                      <p className="text-gray-600 text-sm">
                        {
                          conversation.messages[
                            conversation.messages.length - 1
                          ].text
                        }
                      </p>
                    </span>
                  )}
                </div>
              </div>
            </Link>
          )
          //   )
        )}
      </nav>
    </div>
  );
}
