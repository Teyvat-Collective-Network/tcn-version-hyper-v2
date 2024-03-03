import banshares from "./routes/banshares.js";
import global from "./routes/global.js";
import guilds from "./routes/guilds.js";
import polls from "./routes/polls.js";
import testing from "./routes/testing.js";
import users from "./routes/users.js";

export default {
    ...banshares,
    ...global,
    ...guilds,
    ...polls,
    ...testing,
    ...users,
} as const;
