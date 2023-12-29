import { PUBLIC_COOKIE_DOMAIN } from "$env/static/public";
import api from "$lib/api.js";
import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ cookies, url }) => {
    const state = cookies.get("state");
    const target = cookies.get("redirect") ?? "/";

    if (!state || state !== url.searchParams.get("state")) return new Response("Invalid or missing state.", { status: 401 });

    const { error, token }: { error?: string; token?: string } = await api(null, `POST /token`, url.searchParams.get("code"));

    if (!token) return new Response(error ?? "Unknown error.", { status: 401 });

    cookies.set("token", token, { domain: PUBLIC_COOKIE_DOMAIN, maxAge: 30 * 24 * 60 * 60 * 1000, path: "/", sameSite: "lax" });
    throw redirect(303, target);
};
