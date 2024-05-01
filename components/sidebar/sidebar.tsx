"use client";

import { BarChart, Group, Home, MessageCircle, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebar-item";

export default function Sidebar() {
  const pathname = usePathname();

  const items = [
    {
      logo: Home,
      label: "Home",
      href: "/",
      active: pathname !== "/",
    },
    {
      logo: MessageCircle,
      label: "Message",
      href: "/message",
      active: pathname !== "/message",
    },
    {
      logo: BarChart,
      label: "Analytics",
      href: "/analytics",
      active: pathname !== "/analytics",
    },
    {
      logo: Settings,
      label: "Settings",
      href: "/setting",
      active: pathname !== "/settings",
    },
  ];
  return (
    <aside className=" py-4 gap-y-2  border-r border-1 shadow-sm">
      <div className="flex flex-col gap-y-4 px-5 py-4">
        {items.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </div>
    </aside>
  );
}
