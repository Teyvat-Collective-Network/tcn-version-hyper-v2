"use server";

import { redirect } from "next/navigation";
import getUser from "../../lib/get-user";
import trpc from "../../lib/trpc";
import BanshareFormBody from "./page-body";

export default async function BanshareForm() {
    const user = await getUser();
    if (!user) return redirect("/auth/login?redirect=/banshare");

    const guilds = await trpc.getBanshareGuilds.query(user.id);
    return <BanshareFormBody user={user} guilds={guilds}></BanshareFormBody>;
}
