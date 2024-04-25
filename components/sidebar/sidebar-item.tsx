import Link from "next/link";

import { twMerge } from "tailwind-merge";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  logo: LucideIcon;
  label: string;
  active?: boolean;
  href: string;
}

export default function SidebarItem({
  logo: Icon,
  label,
  active,
  href,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={twMerge(
        `
   
  
        w-full 
        p-2 
        rounded-md
        hover:bg-slate-400/10

    `,
        !active && "bg-slate-400/10 text-black"
      )}
    >
      <div
        className="     
        flex 
        items-center
        gap-x-3 
        cursor-pointer 
          rounded-md 
          min-h-[40px] 
          min-w-[128px] 
          overflow-hidden"
      >
        <Icon size={20} />
        <p className="truncate w-100">{label}</p>
      </div>
    </Link>
  );
}
