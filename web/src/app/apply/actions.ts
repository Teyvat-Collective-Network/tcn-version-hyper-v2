"use server";

import bot from "../../lib/bot";
import { getId } from "../../lib/get-user";

export async function fetchInvite(invite: string) {
    return await bot.fetchInvite.query(invite);
}

export async function submitApplication(
    invite: string,
    character: string,
    role: "owner" | "admin" | "mod" | "other",
    experience: string,
    goals: string,
    history: string,
    additional: string,
) {
    return await bot.submitApplication.mutate({ user: await getId(), invite, character, role, experience, goals, history, additional });
}
