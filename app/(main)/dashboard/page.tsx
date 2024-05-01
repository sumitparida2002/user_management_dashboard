import { db } from "@/lib/db";
import { User, columns } from "../columns";
import { DataTable } from "../data-table";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/current-user";

async function getData(): Promise<User[]> {
  const users = await db.user.findMany();

  return users;
}

export default async function DemoPage() {
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
