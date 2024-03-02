import api from "../api.js";
import { channels } from "../bot.js";

async function cycle() {
    const overdue = await api.processOverdueBanshares.mutate();
    if (!overdue) return;

    await channels.execManagement.send({
        content: `<@&${process.env.ROLE_OBSERVER}> One or more banshares has exceeded the allowed pending time. Please check the list of pending banshares in ${channels.banshareDashboard}.`,
        allowedMentions: { roles: [process.env.ROLE_OBSERVER!] },
    });
}

setTimeout(() => {
    cycle();
    setInterval(cycle, 1000);
}, 1000 - (Date.now() % 1000));
