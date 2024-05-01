import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const currentUser = async () => {
  const { userId: id } = auth();

  if (!id) {
    return null;
  }

  const profile = await db.user.findUnique({
    where: {
      id,
    },
  });

  return profile;
};
