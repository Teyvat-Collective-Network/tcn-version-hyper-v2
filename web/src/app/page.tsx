"use server";

import trpc from "../lib/trpc";
import HomeBody from "./page-body";

export default async function Home() {
    const count = await trpc.getGuildCount.query().catch((error) => {
        console.error(error);
        return "[error loading count]";
    });

    return <HomeBody count={count}></HomeBody>;
}
