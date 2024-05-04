import { db } from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";

import React from "react";

interface pageParams {
  id: String;
}

async function page({ params }: { params: { studentId: string } }) {
  const student = await db.user.findUnique({
    where: {
      id: params.studentId,
    },
  });

  if (!student) {
    redirect("/dashboard");
  }

  return (
    <div className="">
      <div className="flex gap-4 border-b bottom-1 p-4">
        <Image
          src={
            student.imageUrl
              ? student.imageUrl
              : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser-avatar_6596121&psig=AOvVaw2oOFlRQCAVIAMXYZRFB_-U&ust=1714776073030000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPiL6eeE8IUDFQAAAAAdAAAAABAE"
          }
          alt={student.name ? student.name : "sample"}
          width={60}
          height={40}
          className=""
        />
        <div>
          <h1 className="text-3xl">{student.name}</h1>
          <p className="class">Enrolled in placeholder</p>
        </div>
      </div>
      <div className="container">Container</div>
    </div>
  );
}

export default page;
