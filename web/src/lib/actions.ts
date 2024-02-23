"use server";

import bot from "./bot";

export async function getTag(id: string) {
    return await bot.getTag.query(id);
}
