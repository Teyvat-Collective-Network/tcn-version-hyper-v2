import { AuthUser } from "@teyvat-collective-network/shared-hyper-v2";
import { t } from "elysia";
import { App } from "../app.js";
import bot from "../bot.js";
import { isObserver } from "../db.js";
import schemas from "../schemas.js";

export default (app: App) =>
    app.group("/auth", (app) =>
        app
            .post(
                "/login",
                async ({ body, jwt }) => {
                    const token_request = await fetch(`${Bun.env.DISCORD_API}/oauth2/token`, {
                        method: "POST",
                        body: new URLSearchParams({
                            client_id: Bun.env.DISCORD_ID!,
                            client_secret: Bun.env.DISCORD_SECRET!,
                            code: body,
                            redirect_uri: `${Bun.env.SITE_DOMAIN}/auth/callback`,
                            grant_type: "authorization_code",
                        }),
                    });

                    if (!token_request.ok) return { error: "Invalid code." };

                    const tokens = await token_request.json();
                    if (!tokens) return { error: "Invalid code." };

                    const user_request = await fetch(`${Bun.env.DISCORD_API}/users/@me`, { headers: { Authorization: `Bearer ${tokens.access_token}` } });
                    if (!user_request.ok) return { error: "Invalid token." };

                    const user = await user_request.json();
                    const now = Date.now();
                    return { token: await jwt.sign({ id: user.id, created: now, expires: now + 30 * 24 * 60 * 60 * 1000, scopes: "all" }) };
                },
                {
                    body: t.String(),
                    response: t.Object({ token: t.Optional(t.String()), error: t.Optional(t.String()) }),
                },
            )
            .get(
                "/user",
                async ({ user }): Promise<AuthUser | null> => {
                    if (!user) return null;

                    try {
                        const discordUser = await bot.users.fetch(user.id);

                        return {
                            id: discordUser.id,
                            username: discordUser.displayName,
                            observer: await isObserver(user.id),
                            owner: user.id === Bun.env.OWNER,
                        };
                    } catch {
                        return null;
                    }
                },
                {
                    response: schemas.getUserResponse,
                },
            ),
    );
