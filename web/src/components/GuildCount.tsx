"use server";

import trpc from "../lib/trpc";

export default async function GuildCount() {
    const count = await trpc.getGuildCount.query();
    return <>{count}</>;
}
