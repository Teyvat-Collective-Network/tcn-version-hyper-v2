import banshares from "./routes/banshares.js";
import guilds from "./routes/guilds.js";
import users from "./routes/users.js";

export default {
    ...banshares,
    ...guilds,
    ...users,
} as const;
