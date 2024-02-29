import banshares from "./routes/banshares.js";
import global from "./routes/global.js";
import guilds from "./routes/guilds.js";
import users from "./routes/users.js";

export default {
    ...banshares,
    ...global,
    ...guilds,
    ...users,
} as const;
