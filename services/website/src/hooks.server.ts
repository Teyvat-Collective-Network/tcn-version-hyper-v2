import api from "$lib/api.js";
import type { Handle } from "@sveltejs/kit";

process.on("uncaughtException", console.error);

export const handle: Handle = async ({ event, resolve }) => {
    const { locals, cookies } = event;
    locals.token = cookies.get("token") ?? null;

    if (locals.token) {
        const request = await api(locals.token, `!GET /user`);
        if (request.ok) locals.user = await request.json();
    }

    locals.darkMode = cookies.get("mode") !== "light";
    return await resolve(event);
};
