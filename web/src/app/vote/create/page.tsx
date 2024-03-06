import getUser from "@/lib/get-user";
import { redirect } from "next/navigation";
import VoteCreateBody from "./page-body";

export default async function VoteCreate() {
    const user = await getUser();
    if (!user) return redirect("/auth/login?redirect=/vote/create");
    if (!user.observer) return redirect("/");

    return <VoteCreateBody></VoteCreateBody>;
}
