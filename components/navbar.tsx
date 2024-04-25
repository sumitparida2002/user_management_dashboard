import { SignOutButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="p-4 border-b border-1 flex justify-between items-center">
      <h1 className="text-lg font-bold"> Brightspace</h1>
      <span>
        <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          <SignOutButton />
        </div>
      </span>
    </nav>
  );
}
