import bearer from "@elysiajs/bearer";
import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import { rateLimit } from "elysia-rate-limit";

export const app = new Elysia()
    .use(cors())
    .use(bearer())
    .use(jwt({ secret: Bun.env.JWT_SECRET! }))
    .use(rateLimit({ duration: 1000, max: 50, generator: ({ headers }) => headers.get("Authorization") ?? JSON.stringify([...headers.entries()]) }))
    .derive(async ({ bearer, jwt }) => {
        if (!bearer) return { user: null };

        const payload = await jwt.verify(bearer);
        if (!payload || !payload.created || +payload.expires <= Date.now()) return { user: null };

        return { user: { id: payload.id.toString() } };
    });

export type App = typeof app;
