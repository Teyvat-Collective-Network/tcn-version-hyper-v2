import { t } from "elysia";

const snowflake = t.String({ pattern: "^[1-9][0-9]{16,19}$" });

export default {
    getUserResponse: t.Nullable(
        t.Object({
            id: snowflake,
            username: t.String(),
            observer: t.Boolean(),
            owner: t.Boolean(),
        }),
    ),
};
