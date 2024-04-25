import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const initialUser = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const profile = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.user.create({
    data: {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
