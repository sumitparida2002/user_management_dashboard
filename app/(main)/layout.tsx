import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full ">
      <Navbar />
      <div className="flex h-full  w-full ">
        <Sidebar />

        <div className="overflow-scroll w-full">{children}</div>
      </div>
    </div>
  );
}
