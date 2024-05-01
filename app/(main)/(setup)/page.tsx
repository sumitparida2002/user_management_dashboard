import { db } from "@/lib/db";
import { initialUser } from "@/lib/intialize-user";
import { redirect } from "next/navigation";
import React from "react";

export default async function Setup() {
  const user = await initialUser();

  return redirect("/dashboard");
}
