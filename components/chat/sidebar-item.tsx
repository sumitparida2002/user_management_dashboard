"use client";

import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";

function SidebarItem() {
  const { onOpen } = useModal();
  function createConversation() {
    onOpen("createConversation");
  }

  return (
    <Link
      href=""
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "h-9 w-9"
      )}
    >
      <SquarePen size={20} onClick={createConversation} />
    </Link>
  );
}

export default SidebarItem;
