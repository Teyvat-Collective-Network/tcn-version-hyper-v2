"use server";

import bot from "./bot";
import getUser from "./get-user";

export async function getTag(id: string) {
    return await bot.getTag.query(id);
}

export async function submitBanshare(
    mode: "normal" | "without-validation" | "without-checks",
    ids: string,
    reason: string,
    evidence: string,
    server: string,
    severity: "P0" | "P1" | "P2" | "DM",
    urgent: boolean,
) {
    const user = await getUser();
    if (!user) return "You seem to have been signed out. Please sign in and try again.";

    return await bot.submitBanshare.mutate({ author: user.id, mode, ids, reason, evidence, server, severity, urgent });
}
