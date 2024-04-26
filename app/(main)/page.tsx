import { db } from "@/lib/db";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<User[]> {
  const users = await db.user.findMany();

  return users;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
