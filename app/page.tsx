import { initialUser } from "@/server/intial-user";

export default async function Home() {
  const profile = await initialUser();
  console.log(profile);
  return <main></main>;
}
