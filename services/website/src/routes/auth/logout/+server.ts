import { PUBLIC_COOKIE_DOMAIN } from "$env/static/public";
import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ cookies, url }) => {
    cookies.delete("token", { domain: PUBLIC_COOKIE_DOMAIN, path: "/", sameSite: "lax" });
    throw redirect(303, url.searchParams.get("redirect") ?? "/");
};
