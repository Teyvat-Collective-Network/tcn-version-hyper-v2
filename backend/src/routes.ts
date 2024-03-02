import banshares from "./routes/banshares.js";
import global from "./routes/global.js";
import guilds from "./routes/guilds.js";
import testing from "./routes/testing.js";
import users from "./routes/users.js";

export default {
    ...banshares,
    ...global,
    ...guilds,
    ...testing,
    ...users,
} as const;
