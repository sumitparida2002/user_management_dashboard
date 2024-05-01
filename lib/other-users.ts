import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const otherUsers = async () => {
  const { userId: id } = auth();

  if (!id) {
    return null;
  }

  const users = await db.user.findMany({
    where: {
      id: { not: id },
    },
  });
  console.log(users);

  return users;
};
