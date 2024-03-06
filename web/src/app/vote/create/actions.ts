"use server";

import bot from "../../../lib/bot";

export async function createPoll(poll: {
    mode: "induction" | "proposal" | "election" | "selection";
    duration: number;
    live: boolean;
    min: number;
    max: number;
    preinduct: boolean;
    question: string;
    quorum: number;
    restricted: boolean;
    seats: number;
    server: string;
    wave: number;
    candidates: string[];
    options: string[];
}) {
    return await bot.createPoll.mutate(poll);
}
