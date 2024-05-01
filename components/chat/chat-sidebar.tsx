import Link from "next/link";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { Avatar, AvatarImage } from "../ui/avatar";
import { Message } from "@/app/data";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/current-user";
import { use } from "react";
import { otherUsers } from "@/lib/other-users";

export async function Sidebar() {
  const users = await otherUsers();

  return (
    <div className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 ">
      {/* {!isCollapsed && ( */}
      <div className="flex justify-between p-2 items-center">
        <div className="flex gap-2 items-center text-2xl">
          <p className="font-medium">Chats</p>
          <span className="text-zinc-300">({users!.length})</span>
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
      {/* )} */}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {users!.map((user, index) => (
          <Link
            href={`/message/${user.id}`}
            className="flex items-center gap-2 hover:bg-slate-500/10 rounded-sm p-2 px-4"
          >
            <Avatar className="flex justify-center items-center">
              <AvatarImage
                src={user.imageUrl}
                alt={user.imageUrl}
                width={2}
                height={2}
                className="w-10 h-10 "
              />
            </Avatar>
            <span className="tex-bold">{user.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
