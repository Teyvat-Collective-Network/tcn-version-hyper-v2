import api from "../api.js";
import client from "../bot.js";
import { snowflake } from "../schemas.js";
import { proc } from "../trpc.js";

export default {
    userGet: proc.input(snowflake).query(async ({ input: id }) => {
        const user = await client.users.fetch(id).catch(() => null);
        if (!user) return null;

        const admin = id === process.env.OWNER;
        const apiUser = admin ? null : await api.getUser.query(id);

        const observer = admin || apiUser!.observer;
        const owner = observer || apiUser!.owner;
        const council = observer || apiUser!.council;
        const staff = council || apiUser!.staff;

        return {
            id,
            name: user.displayName,
            image: user.displayAvatarURL({ forceStatic: true, size: 64 }),
            admin,
            observer,
            owner,
            council,
            staff,
        };
    }),
    getTag: proc.input(snowflake).query(async ({ input: id }) => {
        const user = await client.users.fetch(id).catch(() => null);
        if (!user) return `Unknown User: ${id}`;

        return user.tag;
    }),
} as const;
